//home page for resume site

import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

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

  useEffect(() => {
    const items = document.querySelectorAll('.experience_item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      {
        threshold: [0, 0.2],
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <title>Haytham's Site</title>
      <Navbar/>
      <div className="hero">
          <div className=" home_text" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <h1>Haytham Zaami</h1>
              <img src={require('../assets/asset.gif')} className="home_gif" />
          </div>
      <img src={require('../assets/haytham_sitting.jpg')} alt="home" className="home_image"/>
    </div>
    <p className = 'about_text'> {age} year old Computer Science Graduate from Pennsylvania State University. Based out of PA, I've worked on 
                                       fullstack applications, trained machine learning models, worked on research, and 
                                       have experience with a variety of programming languages and frameworks. I'm passionate about 
                                       learning new technologies and applying them to solve real-world problems.
    </p>

    <h1 className='experience_text'>Experience</h1>

    <div className='experience_container'>

      <div className='experience_item'>
        <h2>Applications Developer at Penn State Health</h2>
        <img src={require('../assets/psu.png')} alt="psh" className="psh_logo"/>
        <p>October 2025 - Present</p>

        <p>Developed Facial Paralysis Detection application. Clinicians and patients interact via messages, images are stored in a cloud database,
          and a machine learning model analyzes the images to detect signs of facial paralysis. The application provides valuable insights 
          for diagnosis and treatment planning.</p>

        <p className='workedWith'>Technologies used: TypeScript, React, AWS, Python, OpenCV</p>
      </div>
      
      <div className='experience_item'>
        <h2>Business Operations Associate at CarMax</h2>
        <img src={require('../assets/carmax.png')} alt="carmax" className="carmax_logo"/>
        <p>October 2024 - Present</p>
        <p>Assisted in various business operations tasks, including data analysis, process improvement, and project management. Collaborated with cross-functional teams to support business initiatives.</p>
        <p className='workedWith'>Technologies used: SalesForce, Excel, Power BI</p>
      </div>

      <div className='experience_item'>
        <h2>Code Instructor at Code Ninjas</h2>
        <img src={require('../assets/ninja.png')} alt="code ninjas" className="code_ninjas_logo"/>
        <p>January 2025 - August 2025</p>
        <p>Instructed students in coding and game development at Code Ninjas. Developed lesson plans, provided guidance and support, and fostered a positive learning environment.</p>
        <p className='workedWith'>Technologies used: Scratch, JavaScript, Python</p>
      
      </div>



    </div>

    <div className="spacer"></div>

    <div className='SkillsContainer'>

      <h2 className='skills_headers'>Languages</h2>
        <ul>
          <li>Python</li>
          <li>JavaScript/TypeScript</li>
          <li>Java</li>
          <li>C++</li>
          <li>SQL</li>
        </ul>

      <h2 className='skills_headers'>Frameworks</h2>
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Expo</li>
          <li>Flask</li>
          <li>Django</li>
        </ul>

      <h2 className='skills_headers'>Cloud & DevOps</h2>
        <ul>
          <li>AWS (EC2, S3, Lambda)</li>
          <li>Docker</li>
          <li>Git/GitHub</li>
        </ul>

      <h2 className = 'skills_headers'>Data Science</h2>
        <ul>
          <li>Pandas</li>
          <li>Pytorch</li>
          <li>TensorFlow</li>
          <li>Apache Spark</li>
          <li>NumPy</li>
          <li>Scikit-learn</li>
          <li>Matplotlib</li>
          <li>Seaborn</li>
        </ul>
    </div>

    <div className='CurrentLearningContainer'></div>

  </div>

  );
}

export default Home;