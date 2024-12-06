const mongoose=require("mongoose")

const CartonModel= new mongoose.Schema({
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:Patient
    },
    teeth:{
        type:[String],
        required:true
    }
})

module.exports=Carton=mongoose.model("Carton", CartonModel)