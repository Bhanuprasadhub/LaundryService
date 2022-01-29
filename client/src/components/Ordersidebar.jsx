import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../assets/home.svg'
import list from '../assets/list.svg'
import more from '../assets/more.svg'

import './OrderSideBar.css'
function OrderSidebar() {
  return <div className='side-bar'>
  <div className='side-items'>
        <div className='img1'><NavLink to="/homeji/store"><img src={home}></img></NavLink></div>
        <div className='img9'><NavLink to="/homeji/order"><img src={more}></img></NavLink></div>
        <div className='img3'><NavLink to="/homeji/order"><img src={list}></img></NavLink></div>
        </div>
      </div>
 
}
export default OrderSidebar;