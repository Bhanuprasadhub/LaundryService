const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Users = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique:true},
    phone:{type: Number, required: true, unique:true},
    password:{type: String,},
    
    state:{type: String, required: true},
    district:{type: String, required: true},
    address:{type: String, required: true},
    pincode:{type: Number, required: true},
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

Users.methods.generateAuthToken= async function () {
    try{
         let token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
         this.tokens=this.tokens.concat({token:token})
         await this.save()
         return token
    }catch(err){
        console.log(err)
    }
}
const User = mongoose.model("Userin", Users);
module.exports = User;