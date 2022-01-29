import React from 'react';
import { NavLink } from 'react-router-dom';
import "./noorder.css"
const Noorder = () => {
  return (<div className='orders-class'>
    <div className='header-order'>
      <div className='orders '>Orders<span>| 0</span></div>
      <div className='search-bar'><i class="fas fa-search"></i><input type="text" /> </div>
    </div>
    <div className='middle-of-orders'>
      <h3>No order Available</h3>
      <NavLink to='/homeji/store'><button className='btn-1'>Create</button></NavLink>
    </div>
  </div>)
};

export default Noorder;
