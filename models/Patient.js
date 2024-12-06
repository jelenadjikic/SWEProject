const mongoose=require("mongoose")

const PatientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true
    }
})

module.exports=Patient=mongoose.model("Patient",PatientSchema)