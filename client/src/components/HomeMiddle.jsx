import React from 'react';
import './HomeMiddle.css';
import MiddleRight from './MiddleRight';
import MiddleLeft from './MiddleLeft';

const HomeMiddle = () => {
  return <div className='home-middle'>
      <MiddleLeft />
      <MiddleRight />
  </div>
};

export default HomeMiddle;
