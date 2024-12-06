const mongoose =require("mongoose")

const RequestSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:User,
        required:true
    },
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:Patient,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
    ,
    requestDate:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    }
})

module.exports=Request=mongoose.model("Request", RequestSchema)