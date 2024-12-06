const mongoose=require('mongoose')

const MessageSchema=new mongoose.Schema({
    user: { 
    type:mongoose.SchemaTypes.ObjectId,
    ref:User
    },
    patient: { 
        type:mongoose.SchemaTypes.ObjectId,
        ref:Patient
        },
    message:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    sender:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        required:true
    }
})

module.exports=Message=mongoose.model("Message",MessageSchema)