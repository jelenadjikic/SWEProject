const mongoose=require('mongoose')

const InterventionSchema=new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    patient:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:Patient       
    },
    description:{
        type:String,
        required:true
    }
})

module.exports=Intervention=mongoose.model("Intervention", InterventionSchema)