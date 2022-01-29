const express=require('express')
const app=express()
const bodypaser=require('body-parser')
app.use(bodypaser())
app.use(express.urlencoded({ extended: true }))
const  cookie_parser=require('cookie-parser')
app.use(cookie_parser('1234'))

const dotenv=require('dotenv')
const userRoutes=require("./routers/User");
const dataRoutes=require('./routers/order')
dotenv.config({path:'./config.env'})
var cors = require('cors');
app.use(cors());
app.use(userRoutes);
app.use(dataRoutes)


require("./database/connectionwithdb")
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port no ${process.env.PORT}`)
})