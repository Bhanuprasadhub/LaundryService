import React from 'react';
import './HeaderLogin.css'
import { useNavigate } from 'react-router-dom';

const HeaderLogin = (props) => {
    const hi=useNavigate()
    const logout=async()=>{
        try{
            const res = await fetch("/removeToken", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include"
            })
            hi("/")

        }catch(err){
            alert("invalid request")
        }

        

        

    }
    console.log(props)
    return <div className='headerlogin-container'>
        <div className='headerlogin-logo'>LAUNDRY</div>
        <div className='headerlogin-navs'>
            <ul>
                <li className='pricing'>Pricing</li>
                <li className='career'>Career</li>
                <div className='profile'>
                    <img id='profile-pic' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU" alt="" />
                    <li className='headerlogin-signin' data-bs-toggle="modal" data-bs-target="#exampleModalCenter" type="button">{props.name}</li>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                <h1>Click On Logout..!</h1> 
                        
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={logout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </div>;
};

export default HeaderLogin;
