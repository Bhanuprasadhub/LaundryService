import React from 'react';
import { NavLink } from 'react-router-dom';
const MiddleLeft = () => {
  return <div className='middle-left'>
        <div className='big-logo'>
            <h1>Laundry</h1>
            <h1>Service</h1>
        </div>
        <p>Doorstep Wash & Dryclean Service</p>
        <div className='register-div'>
            <h4>Don't have an account?</h4>
            <NavLink to='/register'><button>Register</button></NavLink>
        </div>
    </div>;
};

export default MiddleLeft;
