const express= require("express")
const errorMiddleware=require("./middleware/error")
const app=express()
const cors = require('cors')
const cookieParser =require("cookie-parser")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

const userroute=require("./routes/userRoute")
app.use("/api/v1",userroute)

const bookroute=require("./routes/bookRoute")
app.use("/api/v1",bookroute)

app.use(errorMiddleware)

module.exports =app