import HeaderLogin from "./HeaderLogin";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
//import HomeMiddle from './HomeMiddle';
//import Refferal from './Refferal';
//import Footer from './Footer';
import OrdersSidebar from "./Ordersidebar";
import { Route } from 'react-router-dom'
import Order from "./noorder";
import Rehna from "./CreateOrder";
import FooterCopy from "./FooterCopy";
import Store from "./Store";


const Homeji = ({ props }) => {
    console.log(props)
    const [name,setName]=useState()
    const history = useNavigate()
    const callHome = async () => {
        try {

            const res = await fetch("/Homehere", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include"
            })
            let some=(res.status)
            console.log(some,"rjana")
            let data=0
            res.json().then((ele)=>{
                setName(ele.data.name)
            }).catch((err)=>{
                console.log(err,"yha to hu")
                history("/")
            })
            //console.log(data,"rajan")
            //setName(data.data.name)
            console.log(some,"idhar bhi");
            if (!some === 200) {
                //console.log("idhar to hu")
                history('/')
                const error = new Error(res.error)
                throw error
            } else if (some == 401) {
                //console.log("idhar bhi hu")
                history("/")

            }

        } catch (err) {
            console.log(err)



        }
    }
    useEffect(() => {
        callHome()

    }, [])

    return (<>
        <HeaderLogin name={name}/>
        <OrdersSidebar />
        <Outlet />
        <FooterCopy />


    </>)
}

export default Homeji