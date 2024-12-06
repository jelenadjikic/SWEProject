const mongoose=require("mongoose")
const QuestionModel= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    questionDate:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:new Date()
    }

})

module.exports=Question=mongoose.model("Question", QuestionModel)