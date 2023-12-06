const ErrorHandler = require("../utils/errorhandler");
const catchasyncerrors = require("./catchasyncerrors");
const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.isAuthenticatedUser = catchasyncerrors(
    async (req,res,next)=>{
        const {token} =req.cookies
       

       if(!token){
           console.log('error ra puka 1234')
        return next(new ErrorHandler("Please Login to access",401))
       }
       const decodedData = jwt.verify(token,process.env.JWT_SECRET)
       req.user = await User.findById(decodedData.id)
       console.log('no error 123')
       next()
    }
)

exports.authorizedRoles = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            console.log("error ra puka 1324324")
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not access to this resource`,403
            ))
        }
        console.log(" no error")
        next()
    }
}