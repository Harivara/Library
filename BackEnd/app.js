const express= require("express")
const errorMiddleware=require("./middleware/error")
const app=express()

const cookieParser =require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

const userroute=require("./routes/userRoute")
app.use("/api/v1",userroute)

app.use(errorMiddleware)

module.exports =app