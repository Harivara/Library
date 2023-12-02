module.exports= asyncErrorHandlers=>(req,res,next)=>{
    Promise
    .resolve(asyncErrorHandlers(req,res,next))
    .catch(next)
}

