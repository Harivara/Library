const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    Status:{
        type:String,
        required:true,
        default:"Available"
    },
    Author:{
        type: String,
        required: true
    },
    Publication:{
        type: String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    ReservedBy:[{
        name:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        }
    }]
   
})
module.exports = mongoose.model("Book",bookSchema)