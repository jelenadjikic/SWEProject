const mongoose=require("mongoose")

const AnswerSchema=new mongoose.Schema({
    question:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:Question,
        required:true
    } ,  
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:User,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    answerDate:{
        type:String,
        required:true
    }

})

module.exports=Answer=mongoose.model("Answer", AnswerSchema)