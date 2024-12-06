const Schedule=require('../models/Schedule')
const Request=require("../models/Request")
const { findUserById, findPatientById }=require('./utilities')

const createSchedule=(args)=>{
    const d=new Date()
    console.log(d.getDate())
    const { user,patient,date,time }=args.scheduleInput
    if(!user || !patient || !date || !time){
        return new Error("Please fill out all fields")
    }
    return Schedule.findOne({user,date,time})
         .then(schedule=>{
             console.log("SCHEDULE", schedule)
            if(schedule) {
                return new Error("You already have schedule for this date and time")
            } 
            const newSchedule=new Schedule({
                user,
                patient,
                date,
                time
            })
           return newSchedule.save()
            .then(schedule=>{
                return { ...schedule._doc, user:findUserById(schedule.user),patient:findPatientById(schedule.patient)}
            })
            .catch(err=>console.log(err))

         })  
         .catch(err=>console.log(err))
}

const schedules=({ user})=>{
    console.log(user)
    return Schedule.find({ user, date:{$gte:new Date().toISOString().slice(0,10) } })
    .sort({ date:1, time:1})
    .then(shedules=>{
      return  shedules.map(schedule=>{
        return { ...schedule._doc, user:findUserById(schedule.user),patient:findPatientById(schedule.patient)}
    })
})
}

const schedulesByDate=({ user,date })=>{
  //  const d=new Date(date).toISOString()
  //  console.log(new Date(d).getDay())
  
    
    return Schedule.find( { user,date})
    
    .then(schedules=>{
        return schedules.map(schedule=>{
           
             return  { ...schedule._doc,user:findUserById(schedule.user), patient:findPatientById(schedule.patient)}
        })
    })
    
}

const requestSchedule=args=>{
    console.log(args)
    const { user,patient,date,time }=args.scheduleInput
    if(!user || !patient || !date || !time){
        return new Error("Please fill out all fields")
    }
    return Request.findOne({patient,requestDate:new Date().toISOString().slice(0,10) })
 
    .then( req=>{
        console.log("REQ",req)
        if(req){
            return new Error("You already have requested appointment today!")
        }
        return Schedule.findOne({user,date,time})
         .then(schedule=>{
            if(schedule) {
                return new Error("You already have schedule for this date and time")
            } 
            const newSchedule=new Request({
                user,
                patient,
                date,
                time
            })
           return newSchedule.save()
            .then(schedule=>{
                return { ...schedule._doc, user:findUserById(schedule.user),patient:findPatientById(schedule.patient)}
            })
            .catch(err=>console.log(err))

         })  
         .catch(err=>console.log(err))

    })
    .catch(err=> new Error(err))
    
}

const requestsByUser=({id})=>{
    return Request.find({user:id})
    .then(requests=>{
        return requests.map(request=>{
            return { ...request._doc, user:findUserById(request.user), patient:findPatientById(request.patient)}
        })
    })
    .catch(err=>new Error(err))
}

const deleteRequestSchedule=({ id })=>{
    return Request.findByIdAndDelete({_id:id})
    .then(request=>{
        return{ ...request._doc, user:findUserById(request.user), patient:findPatientById(request.patient)}
    })
    .catch(err=>new Error(err))
}

const deleteScheduleById=({id})=>{
    console.log(id)
    return Schedule.findByIdAndDelete({_id:id})
    .then( schedule=>{
        return { ...schedule._doc,user:findUserById(schedule.user), patient:findPatientById(schedule.patient) }
    })
    .catch(err=>console.log("ERROR"))
}

module.exports={
    createSchedule,
    schedules,
    schedulesByDate,
    requestSchedule,
    requestsByUser,
    deleteRequestSchedule,
    deleteScheduleById
}