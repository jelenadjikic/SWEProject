const Intervention=require('../models/Intervention')
const User=require('../models/User')
const Patient=require('../models/Patient')
const { findPatientById }=require('./utilities')

const createIntervention =(args)=>{
    const { date,description,patient }=args
    console.log("Args",args)
    if(!date || !description || !patient) {
        return new Error("Please fill out all required data")
    }
    const newIntervention=new Intervention({
        date,
        description,
        patient
    })
    return newIntervention.save()
    .then(intervention=>{
        return { ...intervention._doc, user:findPatientById(intervention.patient) }
    })
}

const interventions=({id})=>{
    console.log("IDDDD", id)
    return Intervention.find({ patient:id })
    .then( interventions=>{
        console.log("INTERV",interventions)
        return interventions.map(intervention=>{
            return {...intervention._doc,patient:findPatientById(intervention.patient)}
        })

    })
    .catch(err=>console.log(err))
}
const interv=()=>{
    return Intervention.find({  })
    .then( interventions=>{
        return interventions.map(intervention=>{
            return {...intervention._doc,patient:findPatientById(intervention.patient)}
        })

    })
    .catch(err=>console.log(err))
}

const updateIntervention=args=>{
    console.log("UPDATE PATIENT", args)
    const { id, date,description }=args.updateInterventionInput
    if(!date || !description ){
        return new Error("Please fill out all required fields")
    }
    return Intervention.findByIdAndUpdate({_id:id }, {$set:{date,description}}, { new:true})
    .then(intervention=>{
        return { ...intervention._doc}
    })
    .catch(err=>new Error(err))

}

const deleteIntervention=({id})=>{
    return Intervention.findByIdAndDelete({_id:id})
    .then( intervention=>{
        return {...intervention._doc, patient:findPatientById(intervention.patient)}
    })
    .catch(err=>console.log(err))
}

module.exports={
    createIntervention,
    interventions,
    deleteIntervention,
    interv,
    updateIntervention
}