const jwt = require("jsonwebtoken");
const express = require('express')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser());
const router = express.Router()
// console.log("create")
const User = require('../model/user');
const e = require("cors");
const res = require("express/lib/response");
router.post('/registers', async (req, res) => {
    console.log(req.body)
    const { name, email, phone, password, pincode, state, district, address } = req.body

    try {
        if (!name || !email || !phone || !password || !pincode || !state || !district || !address) {
            return res.status(304).json({ status: "failed", message: "invalid" })
        }
        const userExist = await User.findOne({ email: email })
        console.log(userExist)
        if (userExist) {
            return res.status(300).json({ message: "User Exist" })
        }
        console.log(name, email, phone, password, pincode, state, district, address)
        const hash = await bcrypt.hash(password, 10)

        // console.log(hash)
        const user = new User({ name, email, phone, password: hash, state, district, address, pincode })
        console.log(user, 'uuu')
        user.save().then((data) => {
            return res.status(200).json({ status: 'success', message: "sign up success", user: data })
            //console.log(data)
        }).catch((err) => {
            return res.status(405).json({ status: "failed", message: "invalid credentials" })
            //console.log(err)
        })
        // console.log(userRegister)


    }
    catch (err) {
        return res.status(300).json({ status: "failed", message: "err.message" })
    }
})
router.post("/login", async (req, res) => {
    let { email, password } = req.body
    
    console.log(req.body)
    try {

        ////console.log(req.body)
        console.log(email, password)
        if (!email || !password) {
            return res.status(309).json({ message: "empty" })
        }

        const userLogin = await User.findOne({ email: email })
        console.log(userLogin)
        console.log("userlogin")
        if (userLogin) {
            const isCheck = await bcrypt.compare(password, userLogin.password)

            if (!isCheck) {

                res.status(400).json({ message: "Invalid password" })
            } else {
                token = await userLogin.generateAuthToken()





                console.log(token)
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 2589200000000),
                    httpOnly: true
                })
                return res.status(200).json("Login Successful")
            }
        } else {
            return res.status(300).json({ message: "Invalid Email" })
        }
    } catch (err) {
        console.log(err)

        return res.status(300).json(({ message: "server error" }))

    }
})


const Authenticate = require("../middleware/authenticate")

router.get("/Homehere", Authenticate, async (req, res) => {
    //console.log(`Hello i am verfied `)

    res.json({ data: req.rootUser })

})
router.get("/removeToken",Authenticate,async(req,res)=>{
    res.clearCookie('jwttoken')
    return res.status(202).send("cookie cleared")
})


module.exports = router;