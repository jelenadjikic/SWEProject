const Answer=require('../models/Answer')

const { findQuestionById, findUserById }=require('./utilities')

const createAnswer=(args,req)=>{
    if(!req.isAuth || req.role!=="user"){
        return new Error("You can not add answer! Please login again")
    }
    const { question,user,answer  }=args.answerInput

    if(!answer){
        return new Error("Please answer the question")
    }
    const newAnswer=new Answer({
        question,
        user,
        answer,
        answerDate:new Date().toISOString()
    })

    return newAnswer.save()
    .then(result=>{
        return { ...result._doc, question:findQuestionById(result.question),user:findUserById(result.user) }
    })
    .catch(err=>new Error(err))
}

const updateAnswer=(args,req)=>{
    if(!req.isAuth || req.role!=="user"){
        return new Error("You can not update answer! Please login again")
    }
    const { id, answer }=args
    if(!answer) {
        return new Error("Please answer the question")
    }
   return Answer.findByIdAndUpdate({_id:id}, {$set:{answer }}, {new:true} )
    .then(answer=>{
        return { ...answer._doc}
    })
}

const deleteAnswer=(args,req)=>{
    if(!req.isAuth || req.role!=="user"){
        return new Error("You can not delete answer! Please login again")
    }
    const { id }=args
    return Answer.findByIdAndDelete({_id:id})
    .then(answer=>{
        return { ...answer._doc}
    })
}

module.exports={
    createAnswer,
    updateAnswer,
    deleteAnswer
}