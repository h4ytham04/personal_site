//home page for resume site

import React from 'react';
import Navbar from '../components/navbar';
import { useState } from 'react';

const Home = () => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <Navbar/>
      <div className="hero">
          <div className=" home_text" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <h1>Haytham Zaami</h1>
              <p className='subtext'> Machine Learning & Software Dev Enthusiast</p>
          </div>
      <img src={require('../assets/haytham_sitting.jpg')} alt="home" className="home_image"/>
    </div>
  </div>



  );
}

export default Home;