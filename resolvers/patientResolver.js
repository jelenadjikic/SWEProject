const Patient=require("../models/Patient")
const Carton=require('../models/Carton')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config")


const registerPatient=args=>{
    const { name,city,address, phone,email,password}=args.patientInput
    if(!name || !city || !address || !phone || !email || !password){
        return new Error("Please fill out all required fields")
    }
   return  Patient.findOne({email})
    .then(patient=>{
        if(patient){
            return new Error("Email name allready exists. Try another email")
        }
        return bcrypt.genSalt(10)
        .then(salt=>{
            return bcrypt.hash(password,salt)
            .then(hash=>{
                const newPatient=new Patient({
                    name,
                    city,
                    address,
                    phone,
                    email,
                    password:hash,
                    role:"patient"
                })
                return newPatient.save()
                .then(patient=>{
                    let teeth=[]
                    for(let i=0;i<32;i++){
                       teeth[i]="healthy"   
                    }
                    console.log("TEETH", teeth)
                    const newCarton=new Carton({
                        patient:patient._id,
                        teeth
                    })
                 

                    return newCarton.save()
                    .then(carton=>{
                       return { ...patient._doc}
                    }) 
                    
                })
                .catch(err=>new Error(err))
            })
            .catch(err=>new Error(err))
        })
        .catch(err=>new Error("Error generating salt"))

    })
    .catch(err=>  new Error("Can not get data grom DB...") )

}

const findCarton=(id)=>{
    console.log("ID", id)
   return Carton.findOne({patient:id})
    .then(carton=>{
        console.log("CARTON",carton)
        return { ...carton._doc }
    })
    .catch(err=> new Error(err))
}


const loginPatient=(args)=>{
    const { email, password }=args.loginPatientInput
    if(!email || !password ){
        return new Error("Please fill out all required fields")
    }
    return Patient.findOne({email})
    .then( patient=>{
       
        if(!patient){
            return new Error("Patient does not exists")
        }
        return bcrypt.compare(password, patient.password)
                .then( isMatch=>{
                    if(!isMatch){
                        return new Error("Password is incorect")
                    }

                    const token=jwt.sign( {role:patient.role}, config.get("secretKey"), { expiresIn:60*60 } )
                    return {id:patient._id,token,name:patient.name,tokenExpiration:60*60+Math.floor( new Date().getTime()/1000), role:patient.role }
                })
                .catch(err=>new Error("Error comparing password"))
    })
    .catch(err=>new Error(err))
}

const patients=()=>{
    return Patient.find({})
    .then(patients=>{
        return patients.map(patient=>{
            return { ...patient._doc }
        })
    })
    .catch(err=> new Error("Error getting data from the DB..."))
}


const findPatient=args=>{
    return Patient.findById({_id:args.id})
    .then(patient=>{
        return { ...patient._doc ,carton:findCarton(patient._doc)}
    })
    .catch(err=>new Error(err))
    }

    const findPatients=(args,req)=>{
        if(!req.isAuth || req.role!=="user"){
            return new Error("You can not get patients! Please login again")
        }
        const { name }=args
        return Patient.find({name:{ $regex: new RegExp(name), $options: 'i'}})
    
        .then(patients=>{
            return patients.map(patient=>{
                return { ...patient._doc, carton:findCarton(patient._doc)}
            })
        })
    }
       
  
const changePatientPassword=args=>{
    const { id,password,newPassword, confirmation}=args
    if(!password || !newPassword || !confirmation){
        return new Error("Please fill out all required fioelds")
    }
   return Patient.findById({_id:id})
        .then(patient=>{
            if(!patient){ 
                return new Error("Patient does not exists")
            }

            return bcrypt.compare(password, patient.password)
                .then(isEqual=>{
                    if(!isEqual){
                        return new Error("Password is incorect")
                    }
                    if(newPassword!==confirmation){ 
                        return new Error("Incorect new password")
                    }
                    return bcrypt.genSalt(10)
                    .then(salt=>{
                        return bcrypt.hash(newPassword,salt)
                        .then( hash=>{
                          return  Patient.findByIdAndUpdate({_id:id},{ password:hash}, {new:true})
                            .then( result=>{
                                return { ...result._doc}
                            })
                            .catch(err=>new Error("Error updating patient"))
                        })
                        .catch(err=>new Error(err))
                    })
                    .catch(err=>new Error("Error generating salt"))
                })
                .catch(err=>new Error("Error getting password from the DB..."))


        })
     .catch(err=>new Error(err))
}

const updatePatient=args=>{
    console.log("UPDATE PATIENT", args)
    const { id, newname,newcity,newaddress,newphone, newemail }=args.updatePatientInput
    if(!newname || !newcity || !newaddress || !newphone || !newemail ){
        return new Error("Please fill out all required fields")
    }
    return Patient.findByIdAndUpdate({_id:id }, {$set:{name:newname,city:newcity,address:newaddress,phone:newphone, email:newemail}}, { new:true})
    .then(patient=>{
        return { ...patient._doc}
    })
    .catch(err=>new Error(err))

}

const deletePatient=(args,req)=>{
    if(!req.isAuth || req.role!=="user"){
        return new Error("You can not delete patient! Please login again")
    }
    console.log("ARGS DELETE",args)
    return Patient.findByIdAndDelete({_id:args.id})
    .then (patient=>{
        return { ...patient._doc}
    })
    .catch(err=>new Error("Can not delete patient from the DB..."))
}    

module.exports={
  
    registerPatient,
    patients,
    findPatient,
    findPatients,
    deletePatient,
    loginPatient,
    changePatientPassword,
    updatePatient
}