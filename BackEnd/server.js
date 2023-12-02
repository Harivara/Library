const app=require("./app")

const dotenv =require("dotenv")

const connectDatabase=require("./config/database")

//Handling unchaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to uncaughtException`)

})

//config
dotenv.config({path:"backend/config/config.env"})
// By specifying the path in this manner, you are telling 
// dotenv to look for the .env file in the "backend/config" directory

//connecting to database
connectDatabase()
const server=app.listen(process.env.PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


//unHandled Promise Rejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to unhandled Promise Rejection`)

    server.close( ()=>{
        process.exit(1)
    })
})