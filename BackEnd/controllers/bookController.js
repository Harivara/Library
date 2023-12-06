const ErrorHandler = require("../utils/errorhandler")
const catchasyncErrorHandler = require("../middleware/catchasyncerrors")

const Book=require("../models/bookModel")
const User= require("../models/userModel")
const ApiFeatures = require("../utils/apifeatures");

exports.createbook = catchasyncErrorHandler(
    async (req,res,next)=>{
        const {title,Author,Publication}= req.body
        const book=await Book.create({
            title,
            Author,
            Publication,
            quantity:5,
            
        })
        
        res.status(200).json({
            success:true,
            book
        })
    }
)

exports.getbookdetails = catchasyncErrorHandler(
    async (req,res,next)=>{
        const book=await Book.findById(req.params.id)

        if(!book){
            return next(new ErrorHandler("Book not Avaible",401))
        }
        res.json({
            success:true,
            book
        })
    }
)

exports.getAllBooks=catchasyncErrorHandler(
    async (req,res,next)=>{

        const books = await Book.find()
        
        res.status(200).json({
            success:true,
            books
        })
    }
)
// exports.getAllBooks = catchasyncErrorHandler(
//     async(req,res)=>{
//           const apifeatures= new ApiFeatures(User.find(),req.query)
//       .search()
//       .filter()
//           const books = await apifeatures.query;
//       // const products = await Product.find(); // we cannot use the same Product.find() again as we have passed it to the apifeatures and changes have occured
//       res.status(200).json({
//       success:true,
//       books
//       })
//   }
//   )


exports.updatebook = catchasyncErrorHandler(
    async (req,res,next)=>{
        const book =await Book.findById(req.params.id)

        if(!book){
            return next(new ErrorHandler("Book not Avaible",401))
        }
        const updatedbook = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            updatedbook
        })
    }
)

exports.deletebook = catchasyncErrorHandler(
    async (req,res,next)=>{
        const book =await Book.findByIdAndDelete(req.params.id)
        if(!book){
            return next(new ErrorHandler("Book not Avaible",401))
        }
        res.status(200).json({
            success:true,
            message:"Book deleted successfully"
        })
    }
)



    exports.user_reserved = catchasyncErrorHandler(
        async (req,res,next)=>{
            const user =await User.findById(req.user.id)
            if(!user){
                return next(new ErrorHandler("No user found"))
            }
            res.status(200).json({
                success:true,
                user
            })
        }
    )





   