const Question=require('../models/Question')
const User=require('../models/User')
const Patient=require('../models/Patient')

exports.findQuestionById=id=>{
    return Question.findById({_id:id})
    .then(question=>{
        return { ...question._doc }
    })
}

exports.findUserById=id=>{
    return User.findById({_id:id})
    .then(user=>{
        return { ...user._doc }
    })
}


exports.findAnswersByQuestionId=id=>{
    return Answer.find({ question:id})
    .then(answers=>{
        console.log(answers)
        return answers.map(answer=>{
            return { ...answer._doc, user:exports.findUserById(answer.user) }
        })
    })
}

exports.findPatientById=id=>{
    return Patient.findById({_id:id})
    .then(patient=>{
        return { ...patient._doc}
    })
    .catch(err=>console.log(err))
}