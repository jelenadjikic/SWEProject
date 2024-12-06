const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config")

const register=(args,req)=>{
   if(!req.isAuth || req.role!=="admin"){
        return new Error("You can not add user! Please login again!")
    }
    const {name,username,password}=args.userInput
    if(!name||!username||!password)
      { return new Error("All fields required!")}
    return User.findOne({username})
    .then(user=>{
        if(user)
            return new Error("User with this username already exsists")
        return bcrypt.genSalt(10)
            .then(salt=>{
               return bcrypt.hash(password,salt)
                        .then(hash=>{
                            const newUser=new User({
                                name,
                                username,
                                password:hash,
                                role: "user"
                            })
                           return newUser.save()
                                    .then(newuser=>{
                                        return {...newuser._doc}
                                    })
                                    .catch(err=>console.log(err))
                        })
                        .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

const users=(args,req)=>{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("You can not get users! Please login again!")
    }
    return User.find({})
        .then(users=>{
            return users.map(user=>{
                return {...user._doc}
            })
        })
        .catch(err=>console.log(err))
}

const ordinaryUsers=(args,req)=>{
    if(!req.isAuth){
        return new Error("You can not get users! Please login again!")
    }
    return User.find({role:"user"})
        .then(users=>{
            return users.map(user=>{
                return {...user._doc}
        })
    })
    .catch(err=>console.log(err))
}

const findUser=(args,req)=>
{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("You can not get users! Please login again!")
    }
    return User.findOne({_id:args.id})
    .then(user=>{
        return{...user._doc}
    })
    .catch(err=>new Error(err))
}

const deleteUser=(args,req)=>{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("You can not get users! Please login again!")
    }
    const{id}=args
    return User.findByIdAndDelete({_id:id})
                .then(user=>{
                    return {...user._doc}
                })
                .catch(err=>console.log(err))           
}

const updateUser=(args,req)=>{
    if(!req.isAuth || req.role!=="admin"){
        return new Error("You can not get users! Please login again!")
    }
    const{id,name,username}=args
    if(!name || !username){
        return new Error("Please fill out all required fields!")
    }
    return User.findByIdAndUpdate({_id:id},{$set:{name,username}},{new:true})
                .then(user=>{
                    return {...user._doc}
                })
                .catch(err=>console.log(err))

}

const login=(args)=>{
    const{username,password}=args.loginInput
    if(!username || !password){
        return new Error("Please fill out all required fields!")
    }
    return User.findOne({username})
                .then(user=>{
                    if(!user){ 
                        return new Error("User not found!")
                    }
                    return bcrypt.compare(password,user.password)
                            .then(isMatch=>{
                                if(!isMatch){
                                    return new Error("Password inncorect")
                                }
                                const token=jwt.sign({role:user.role,expiresIn:60*60},config.get("secretKey") ,{expiresIn:60*60}  )
                                return{
                                    id:user._id,
                                    token,
                                    name:user.name,
                                    tokenExpiration: 60*60 +Math.floor(new Date().getTime()/1000),
                                    role:user.role
                                }                             
                            })
                            .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
}
const changePassword=(args,req)=>{
    if(!req.isAuth || (req.role!=="admin" && req.role!=="user")){
        return new Error("You can not change password! Please login again!")
    }
    const {id,password,newPassword,confirmation}=args
    if(!password || !newPassword || !confirmation) {
        return new Error("Please fill out all required fields!")
    } 
    if(newPassword!==confirmation){
        return new Error("New password and confirm password do not match!")
    }
    return User.findById({_id:id})
                .then(user=>{
                    if(!user){
                        return new Error("User not found!")
                    }
                    return bcrypt.compare(password,user.password)
                                .then(isMatch=>{
                                    if(!isMatch){
                                        return new Error("Password is inncorect!")
                                    }
                                    return bcrypt.genSalt(10)
                                                    .then(salt=>{
                                                        return bcrypt.hash(newPassword,salt)
                                                                    .then(hash=>{
                                                                       return User.findByIdAndUpdate({_id:id},{password:hash},{new:true})
                                                                            .then(result=>{
                                                                                return {...result._doc}
                                                                            })
                                                                            .catch(err=>console.log(err))
                                                                    })
                                                                    .catch(err=>console.log(err))
                                                    })
                                                    .catch(err=>console.log(err))
                                })
                                .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
}

module.exports={
    register,
    users,
    ordinaryUsers,
    findUser,
    deleteUser,
    updateUser,
    login,
    changePassword
}