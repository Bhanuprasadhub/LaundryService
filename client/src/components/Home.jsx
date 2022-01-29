import React from 'react';

import HomeMiddle from './HomeMiddle';
import Refferal from './Refferal';
import Footer from './Footer';
import HeaderLogin from './HeaderLogin';
import Header from './Header';
import FooterCopy from './FooterCopy';
import "./Home.css"

const Home = () => {
  return <div className='home'>
  <Header />
    <HomeMiddle />
    <Refferal/>
    <Footer />
    <FooterCopy />
    
  </div>;
};

export default Home;
