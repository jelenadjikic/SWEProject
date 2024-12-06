const Message=require("../models/Message")
const { findUserById, findPatientById }=require ('./utilities')

const createMessage=args=>{
    console.log(args)
    const { user,patient,message, sender, read}=args.messageInput

    if(!message) {
        return new Error("Please add message")
    }
    newMessage=new Message({
        user,
        patient,
        message,
        sender,
        date:new Date().toISOString(),
        read
    })

   return newMessage.save()
    .then(message=>{
        return { ...message._doc, user:findUserById(message.user), patient:findPatientById(message.patient) }
    })
    .catch(err=>console.log(err))
}

const messages=args=>{
    const{ user,patient }=args
    return Message.find({user,patient})
   
    .then(messages=>{
       
        return messages.map(message=>{
            return {...message._doc,user:findUserById(message.user),patient:findPatientById(message.patient)}
        })
    })
}

const findUnreadMessagesByUser=({ id })=>{
    return Message.find({user:id,read:false})
    .then(messages=>{
        return messages.length
    })
}

const findUnreadMessagesByUserAndPatient=args=>{
    const { user,patient}=args
    return Message.find({user, patient,read:false})
    .then(messages=>{
        return messages.length
    })
}

const updateMessages=args=>{
    const { user, patient }=args
    return Message.find({user, patient,read:false})
    .then(messages=>{
        return messages.map(message=>{
            return Message.findByIdAndUpdate({_id:message._id}, {read:true}, { new:true})
            .then(result=>{
                return { ...result._doc}
            })
            .catch(err=>console.log(err))
        })
    })
}

const deleteMessage=args=>{
    return Message.findByIdAndDelete(args.id)
    .then(message=>{
        return { ...message._doc, user:findUserById(message.user),patient:findPatientById(message.patient) }
    })
    .catch(err=>console.log(err))
}

module.exports={
    createMessage,
    messages,
    deleteMessage,
    findUnreadMessagesByUser,
    findUnreadMessagesByUserAndPatient,
    updateMessages
}