import React, { useState } from "react";

const Rehna = () => {
    const [data,setData]=useState()
    const callHome = async () => {
        try {
           
            const res = await fetch("/getOrder", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include"
            })

            const data =await res.json()
            console.log(data[0].status)
            setData(data[0].status)
            //console.log(data)
            console.log(res.status);
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            } else if (res.status === 401) {
                //history.push("/")

            }

        } catch (err) {
            console.log(err, "he bhai he ")



        }
    }

    const PostData = async (e) => {
        try {
            
            
           
            const response = await fetch("/addOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id:"5",
                   
                    details:"deatails is good",
                    total_quantity:5,
                    total_price: 500,
                    status: "fine",
                
                   
                })
            })
            console.log(response.status)
            if (response.status === 200) {
                //history.push("/")

                console.log("sucessfully register")
            }
        }
        catch (e) {
            alert("failed", e)
        }
    }



    return(

        <>
        <h1>Rajan is here</h1>
        <p>{data}</p>
        <button onClick={PostData}>Click me</button>
        <button onClick={callHome}>Click me</button>
        
        </>
    )
}

export default Rehna