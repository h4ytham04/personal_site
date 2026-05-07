//home page for resume site

import React from 'react';
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="hero">
      
      <div className="home_text">
        <h1>Haytham Zaami</h1>
        <p className='subtext'> Machine Learning & Software Dev Enthusiast</p>
      </div>
      

      <img src={require('../assets/haytham_sitting.jpg')} alt="home" className="home_image"/>
      </div>
    </div>



  );
}

export default Home;