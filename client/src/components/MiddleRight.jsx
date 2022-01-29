
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MiddleRight = () => {
  const history = useNavigate()
  
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const detailsSubmit=async(e)=>{
    try{
      e.preventDefault()
      
      const response= await fetch('/login',{
        method:'POST',
        headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              email,password
              
          })

      }

      )
       console.log(response.status)
      if(response.status===200){
        history("/homeji")

    }else if(response.status===400){
      alert("Invalid details")
    }else if(response.status===300){
      alert("Invalid Details ")
    }else if(response.status===500){
      alert("Server Error Sry for inconvience")
    }

    }catch(err){
      alert(err)

    }
    


  }

  return <div className='sign-in'>
    <h2>SIGN IN</h2>
    <div className='input-field'>
    <form method='POST' className='login-form'>
    <input type="text" placeholder='Mobile / Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
   
      
    
    <a href="https://" id='forgot'>Forgot Password?</a>
    <button onClick={detailsSubmit}>Sign In</button>
    
    </form>
    </div>
  </div>;
};

export default MiddleRight;
