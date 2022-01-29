import React from 'react';
import './Header.css'

const Header = () => {
  return <div className='header-container'>
    <div className='header-logo'>LAUNDRY</div>
    <div className='header-navs'>
      <ul>
        <li>Home</li>
        <li>Pricing</li>
        <li>Career</li>
        <li className='header-signin'>Sign In</li>
      </ul>
    </div>
  </div>;
};

export default Header;
