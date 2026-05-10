//projects page for resume site

import React from 'react';
import Navbar from '../components/navbar';
import { useState } from 'react';

const Projects = () => {

  
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div>
      <title>Haytham's Site</title>
      <Navbar/>
      <h1>This is the projects page</h1>
      <img src={require('../assets/jsr_hz.png')} alt="project" className="project_image"/>
    </div>
  );
}

export default Projects;