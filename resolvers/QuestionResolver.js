
const Question=require('../models/Question')
const Answer=require('../models/Answer')
const { findAnswersByQuestionId}=require('./utilities')



const createQuestion=args=>{
    const { name,question}=args.questionInput
    if(!name || !question){
        return new Error("Please fill out all required fields")
    }
    const newQuestion=new Question({
        name,
        question,
        questionDate:new Date().toISOString()
    })

    return newQuestion.save()
    .then(question=>{
        return { ...question._doc}
    })
    .catch(err=>new Error(err))

}

const questions=()=>{
    return Question.find({})
    .sort({date:-1})
    .then(questions=>{
       return questions.map(question=>{
        return {...question._doc, answers:findAnswersByQuestionId(question._id)}
    })})
    .catch(err=>new Error(err))
}

const deleteQuestion=(args,req)=>{
    if(!req.isAuth || req.role!=="user"){
        return new Error("You can not delete question! Please login again")
    }
    return Question.findByIdAndDelete(args.id)
    .then(question=>{
        return { ...question._doc }
    })
    .catch(err=>console.log(err))
}
module.exports={
    createQuestion,
    questions,
    deleteQuestion
}