const ErrorHandler = require("../utils/errorhandler")
const catchasyncErrorHandler = require("../middleware/catchasyncerrors")

const Book=require("../models/bookModel")

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

exports.reservebook =catchasyncErrorHandler(
    async (req,res,next)=>{
        const book= await Book.findById(req.params.id)

        if(!book){
            return next(new ErrorHandler("Book not Avaible",401))
        }
        
        const user=req.user.id
        const reservation ={
            name:user.name,
            user:user
        }
        const noofbooks=book.Numberofbooks
        if(book.ReservedBy.length>=noofbooks){
            await Book.findByIdAndUpdate(req.params.id,)
        }

    })