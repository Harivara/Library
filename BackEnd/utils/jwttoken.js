//Creating token and saving in cookie
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken() // method created in user Model

    //options for cookie
    const options={
        expires:new Date(
            Date.now() +process.env.COOKIE_EXPIRE*24*60*60*1000 
            ),
        httpOnly:true,
    }
    // It defines options for setting a cookie that will store the JWT token.  
    // These options include an expiration time (expires) and httpOnly set to true, 
    // which means the cookie cannot be accessed via client-side JavaScript for security reasons.

res.status(statusCode).cookie("token",token,options).json({
    // Sets a cookie named "token" with the generated JWT token and applies the 
    // options defined earlier (options).
    success:true,
    user,
    token,
})
}
module.exports =sendToken