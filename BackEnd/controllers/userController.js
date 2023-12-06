const catchasyncErrorHandler = require("../middleware/catchasyncerrors")
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler")
const sendToken = require("../utils/jwttoken")
const crypto =require("crypto");
const Book= require("../models/bookModel")


//register User
exports.createUser= catchasyncErrorHandler(
    async (req,res,next)=>{
        const {name,email,password}= req.body

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public:"sample id",
            url:"sample url"
        }
    })
    // const token=user.getJWTToken()
    //     res.status(201).json({
    //         success:true,
    //         user,
    //         token
    //     })
    sendToken(user,200,res)
    }
)

//loginuser
exports.loginUser =catchasyncErrorHandler(
    async (req,res,next)=>{
        const {email,password}=req.body
        //checking if user has given email and password
        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email and Password",400))
        }
        
        const user= await User.findOne({email}).select("+password")
        
        if(!user){
            return next(new ErrorHandler("Invalid Email and Password",401))
        }
        
        const isPasswordMatch = await user.comparePassword(password)
        
        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid Email and Password",401))
        }

        // const token=user.getJWTToken()
        // res.status(200).json({
        //     success:true,
        //     token,
        // })
        sendToken(user,200,res)
    }
)
//USER LOGOUT  
exports.logoutUser =catchasyncErrorHandler(
    async (req,res,next)=>{

        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        })

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
    }
)
// GET USER DETAILS
exports.getUserDetails = catchasyncErrorHandler (
    async (req,res,next)=>{
        const user = await User.findById(req.user.id)
        
        //After we have login req.user stores the user data as mentioned in auth.js
// we should also import isAuthenticatedUser fuction also in the userRoutes and before this.getUserDetails function
        res.status(200).json({
            success:true,
            user,
        })
    }
)


//Update user password

exports.updateUserPassword = catchasyncErrorHandler(
    async (req,res,next)=>{
        const user=await User.findById(req.user.id).select("+password")

        const isPasswordMatch = await user.comparePassword(req.body.oldpassword)

        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid Email and Password",401))
        }
        if(req.body.newpassword!==req.body.confirmpassword){
            return next(new ErrorHandler("Password doesnot match",400))
        }
        user.password=req.body.newpassword

        await user.save()
        sendToken(user,200,res)
    }
)

//Update Profile
exports.updateUserProfile = catchasyncErrorHandler(
    async (req,res,next)=>{
        const newUserData ={
            name:req.body.name,
            email:req.body.email,
        }
        // We will add Cloudinary later
        const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
            // new: true: This option specifies that the method should return the updated document 
            // after the update operation is performed. If set to true, it ensures that the returned 
            // user variable will contain the updated user data. If set to false or omitted, the 
            // returned user variable would contain the user data before the update operation.
            new:true,
            runValidators:true,
            // runValidators: true: When set to true, this option ensures that Mongoose runs the 
            // validators specified in the schema while performing the update operation. 
            // This means it will validate the newUserData against the defined schema before updating.
        
            useFindAndModify:false
            // useFindAndModify: false: This option is used to opt-out of using the deprecated 
            // findOneAndUpdate() method. Setting it to false ensures the usage of 
            // modern MongoDB driver functionality instead of the deprecated method.
        })
        res.status(200).json({
            success:true
        })
    }
)

//Get All users(admin)
exports.getAllUsers = catchasyncErrorHandler(
    async (req,res,next)=>{
        const users= await User.find()
        res.status(200).json({
            success:true,
            users
        })
    }
)

// Get Single user(admin)
exports.getSingleUser = catchasyncErrorHandler(
    async (req,res,next)=>{
        const user= await User.findById(req.params.id)

        if(!user){
            return next(new ErrorHandler(`USer doesnot exits with Id ${req.params.id}`))
        }
        res.status(200).json({
            success:true,
            user
        })
    }
)

//Update user Role
exports.upadateUserRole = catchasyncErrorHandler(
    async (req,res,next)=>{
    
        const roleupdate ={
            role:req.body.role
        }
        const user= await User.findByIdAndUpdate(req.params.id,roleupdate,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true
        })

    })

    //Delete User
    exports.deleteUser = catchasyncErrorHandler(
        async (req,res,next)=>{
            const user= await User.findByIdAndDelete(req.params.id)
    
            if(!user){
                return next(new ErrorHandler(`User doesnot exits with Id ${req.params.id}`))
            }
            
            res.status(200).json({
                success:true,
                message:"User deleted sucessfully"
            })
        }
    )

    exports.reservebook = catchasyncErrorHandler(
        async (req, res, next) => {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return next(new ErrorHandler("Book not found", 404));
            }
            
            if (book.ReservedBy.length === book.quantity) {
                return next(new ErrorHandler("Book not available", 404));
            }
            const user = await User.findById(req.user.id);
            if (!user) {
                return next(new ErrorHandler("User not found", 400));
            }
           if (book.ReservedBy.includes(user.id)) {
                return next(new ErrorHandler("You have already reserved this book"));
            }
    
        
        book.ReservedBy.push(user.id);
        
        const updatedBook = await book.save();
        console.log(updatedBook, "bef")
            if (!updatedBook) {
                return next(new ErrorHandler("Failed to update book", 500));
            }
        console.log(updatedBook._id," upd")
            // Update User's reserved books
            user.BooksReserved.push(updatedBook._id);
            console.log(user.BooksReserved," userbooks")
            const updatedUser = await user.save();
console.log(updatedUser, " hel")
        
            if (!updatedUser) {
                return next(new ErrorHandler("Failed to update user's reserved books", 500));
            }
        
            // Retrieve all books reserved by the user
            const userReservedBooks = await User.findById(req.user.id).populate('BooksReserved.book');
            console.log("240")
            res.status(200).json({
                book: {
                    ...updatedBook.toJSON(),
                    AvailabilityQuantity: updatedBook.quantity - updatedBook.ReservedBy.length,
                },
                userReservedBooks: userReservedBooks.BooksReserved.map((reservedBook) => reservedBook.book),
            });
        }
    );
    
