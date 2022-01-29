import React, { useState } from 'react';
import './RegisterNew.css'
import './Modal.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { Modal } from 'react-responsive-modal';

const RegisterNew = () => {
  const history =useNavigate()
  const [open,setOpend] =useState(false)
  const [user, setUser] = useState({
    name: "", email: "", phone: "", password: "", cpassword: "", pincode: "", state: "", district: "", address: ""
  })
  let name
  let value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const PostData = async (e) => {
    try {
      e.preventDefault()
      console.log(user)
      const { name, email, phone, password,  pincode, state, district, address } = user
      const response = await fetch("/registers", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email, phone, password,  pincode, state, district, address
        })
      })
      console.log(response.status)
      if (response.status === 200) {
        //history.push("/")
        setOpend(true)

        console.log("sucessfully register")
      }
    }
    catch (e) {
      alert("failed", e)
    }
  }
  return <div className='register-container'>
    <h1>REGISTER</h1>
    <form action="">
      <div className='register-box'>
        <div className='left-register'>
          <input  placeholder='Name' onChange={handleInputs} type='text' name="name" value={user.name}/>
          <input  placeholder='Phone'  onChange={handleInputs} type="number" name="phone" value={user.phone} />
          <input  placeholder='District' onChange={handleInputs} type="text" name="district" value={user.district} />
          <input  placeholder='Pincode' onChange={handleInputs} type="number" value={user.pincode} name="pincode"/>
        </div>
        <div className='right-register'>
          <input  placeholder='Email' onChange={handleInputs} type='text' name="email" value={user.email} />
          <input  placeholder='State' onChange={handleInputs} type='text' name="state" value={user.state} />
          <input  placeholder='Address'  onChange={handleInputs} type='text' name="address" value={user.address}  />
          
          <input  placeholder='Password'  onChange={handleInputs} type='text' name="password" value={user.password}  />
        </div>
      </div>
      <div className='term-condition'>
        <input type="checkbox" />
        <h4>I agree to Terms & Condition receiving marketing and promotional materials</h4>
      </div>
      <button onClick={PostData} >Register</button>
    </form>
    <Modal  classNames={{
      
      modal: 'modal-register',
     
    }} open={open} onOverlayClick={()=>setOpend(false)} center >
    <h1>Details has been submitted now move to login page</h1>
    <NavLink to="/"><button onClick={()=>{setOpend(false)}}>login</button></NavLink>
    </Modal>
  </div>;
};

export default RegisterNew;
