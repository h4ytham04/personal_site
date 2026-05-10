//home page for resume site

import React from 'react';
import Navbar from '../components/navbar';
import { useState } from 'react';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
  const birthYear = 2004;
  const birthMonth = 6; // June
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) {
    age--;
  }
  

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
    <title>Haytham's Site</title>
      <Navbar/>
      <div className="hero">
          <div className=" home_text" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <h1>Haytham Zaami</h1>
              <p className='subtext'> Machine Learning & Software Dev Enthusiast</p>
          </div>
      <img src={require('../assets/haytham_sitting.jpg')} alt="home" className="home_image"/>
    </div>
    <h1 className = 'about_text'> {age} year old Computer Science Graduate from Pennsylvania State University. I've worked on fullstack applications, trained machine learning models, worked on research, and 
have experience with a variety of programming languages and frameworks. I'm passionate about learning new technologies and applying them to solve real-world problems.
    </h1>

    <h1 className='experience_text'>Experience</h1>
  </div>



  );
}

export default Home;