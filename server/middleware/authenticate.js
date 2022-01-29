
const jwt=require('jsonwebtoken')
const mongoose = require('mongoose')
const User=require('../model/user')
const Authenticate=async(req,res,next)=>{
    
    try{
       
        const token= req.cookies.jwttoken
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
       
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser){
            throw new Error("User not Found")
        }
        req.token=token
        req.rootUser=rootUser
        req.userId=rootUser._id
        
        next()
    }catch(err){
        return res.status(401).send("Unothorised user")
        console.log(err)

    }
}

module.exports=Authenticate