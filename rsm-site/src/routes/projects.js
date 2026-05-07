//projects page for resume site

import React from 'react';
import Navbar from '../components/navbar';

const Projects = () => {
  return (
    <div>
      <Navbar/>
      <h1>This is the projects page</h1>
      <img src={require('../assets/jsr_hz.png')} alt="project" className="project_image"/>
    </div>
  );
}

export default Projects;