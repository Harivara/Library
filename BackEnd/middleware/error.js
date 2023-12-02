const ErrorHandeler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
       err.statusCode=err.statusCode || 500
       err.message=err.message || "Internal server Error"


       //wrong Mongodb ID error
       if(err.name==="CastError"){
          const message=`Resource not found. Invalid: ${err.path}`
          err= new ErrorHandeler(message,404)
       }

       // Mongoose dupilicate error
       if(err.code===11000){
         const message=`Dupilicate ${Object.keys(err.keyValue)} entered`
         err =new  ErrorHandeler(message,404)
       }

       // wrong JWT Token
       if(err.name==="JsonWebTokenError"){
         const message=`Json web token is invalid`
         err= new ErrorHandeler(message,404)
      }

      //JWT Expire error
       if(err.name==="JsonWebExpiredError"){
         const message=`Json web token is Expired`
         err= new ErrorHandeler(message,404)
      }

       res.status(err.statusCode).json({
            success:false,
          //   error:err.stack,
          err:err.message
       })
}