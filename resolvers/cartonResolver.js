const Carton=require("../models/Carton")

const setCarton=args=>{
    
    const { id, number, value }=args
    console.log("ARGS",args)
    if(!id || (number<0 || number>31) || !value) {
        return new Error("Please select all required fields")
    }
    
   return  Carton.findByIdAndUpdate({_id:id}, {$set: { [`teeth.${number}`]: value} }, { new:true }   )
    .then(result=>{
        console.log(result)
        return { ... result._doc}
    })
    .catch(err=> new Error(err))
}

module.exports={
    setCarton
}