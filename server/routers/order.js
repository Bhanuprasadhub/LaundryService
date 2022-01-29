const express=require('express')

const router= new express.Router()
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")


const mongose=require('mongoose')
const Authenticate=require("../middleware/authenticate")
const app=express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

console.log("coonection is there")
const User=require('../model/user');
const Order=require('../model/Order');
const e = require('cors')


//Middleware is here 
const authenticateToken = (req, res, next) => {
    

    console.log(req.headers)

    const Authorization= req.headers["authorization"]
    console.log(Authorization)
    const Access_Token_Secret=process.env.SECRET_KEY
    console.log(Access_Token_Secret)
    const token = Authorization && Authorization.split(' ')[1]
    console.log(token)
    if (token == null) {
        return res.status(403).send("Not authorized")
    }
    else {
      
        jwt.verify(token, Access_Token_Secret, (err, userDet) => {
            console.log(token,Access_Token_Secret)
            if (err) {
                return res.status(403).send(err.message)
            }
            else {

                User.find({ _id: userDet.userID}).then(result => {
                    req.user = userDet

                    console.log("i am in inside")
                    
                    next()
                }).catch(err => {
                    res.status(404).send("User not found")
                })
                
            }
        })
    }
}


router.post("/addOrder",Authenticate,async(req,res)=>{
    console.log(req.body)
    console.log(res.req.rootUser)
    
    try{
        const addingnewOrder=new Order({
            order_id:req.body.order_id,
            user_id:res.req.rootUser._id,
            details:req.body.details,
            total_quantity:req.body.total_quantity,
            total_price: req.body.total_price,
            status: req.body.status,
            address: res.req.rootUser.address,
            timestamps: true 
            
        })
        
        console.log(addingnewOrder,"yha hu")

        addingnewOrder.save().then((data)=>{console.log(data)}).catch((err)=>{
            console.log(err)})
        
        res.status(200).json({
            
            data:"saved"
        })

    }catch(err){
        res.send("server error hi he ")
        
    }
})

router.get("/getOrder",Authenticate,async(req,res)=>{
    try{
        console.log("i am here")
        const result = await Order.find({user_id:res.req.rootUser._id})
        console.log(result)
        res.status(200).json(result);

    }catch(err){
        res.status(500).send("server error")

    }
})

router.post("/uppdateorder",Authenticate,async(req,res)=>{
    console.log(req.body.status,"yha aa gya")
    try{
        Order.findOneAndUpdate({"_id":req.body.id},{"status":req.body.status},{new:true}).then((data)=>{
            return res.status(200).json({"data":data})
            console.log("are rehne do")
        }).catch((err)=>{
            return res.send("some error ji")
        })
        

    }catch(err){
        res.send("server error")

    }

})

router.get("/getOrderAlone/:product_key",authenticateToken,(req,res)=>{
    try{
        Order.findOne({$and:[{_id:req.params.product_key}]}).then((data)=>{
            res.json({data:data})
        }).catch((err)=>{
            res.send("some error ji")
        })

    }catch(err){
        res.send("server error")

    }

})

module.exports=router