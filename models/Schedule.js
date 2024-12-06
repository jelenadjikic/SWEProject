const mongoose =require("mongoose")

const ScheduleSchema=new mongoose.Schema({
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
        type:Number,
        required:true
    }
})

module.exports=Schedule=mongoose.model("Schedule", ScheduleSchema)