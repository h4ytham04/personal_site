//home page for resume site

import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
  const birthYear = 2004;
  const birthMonth = 6; // June
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) {
    age--;
  }
  

  const handleMouseMove = (e) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    hero.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

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

  useEffect(() => {
    const fadeItems = document.querySelectorAll('.fade_section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <title>Haytham's Site</title>
      <Navbar/>
      <div className="hero" onMouseMove={handleMouseMove}>
          <div className="hero-spotlight" />
          <div className="home_text fade_section">
              <h1>Haytham Zaami</h1>
              <img src={require('../assets/asset.gif')} alt="" className="home_gif" />
          </div>
      <img src={require('../assets/haytham_sitting.jpg')} alt="home" className="home_image fade_section"/>
    </div>
    <p className='about_text fade_section'> {age} year old Computer Science Graduate from Pennsylvania State University. Based out of PA, I've worked on 
                                       fullstack applications, trained machine learning models, worked on research, and 
                                       have experience with a variety of programming languages and frameworks. I'm passionate about 
                                       learning new technologies and applying them to solve real-world problems.
    </p>

    <h1 className='experience_text fade_section'>Experience</h1>

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

  <div className='skills_container'>

    <div className="card fade_section">
      <h1>Languages</h1>
  <div className="card__content">
    <p className="card__title">Languages </p>
      <ul>
          <li>Python</li>
          <li>JavaScript/TypeScript</li>
          <li>Java</li>
          <li>C++</li>
          <li>SQL</li>
        </ul>
    </div>
    </div>

    <div className="card fade_section">
      <h1>Frameworks</h1>
  <div className="card__content">
    <p className="card__title">Frameworks </p>
      <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Expo</li>
          <li>Flask</li>
          <li>Django</li>
        </ul>
    </div>
    </div>

    <div className="card fade_section">
      <h1>Cloud & DevOps</h1>
  <div className="card__content">
    <p className="card__title">Cloud & DevOps </p>
      <ul>
          <li>AWS (EC2, S3, Lambda)</li>
          <li>Docker</li>
          <li>Git/GitHub</li>
        </ul>
    </div>
    </div>

    <div className="card fade_section">
      <h1>Data Science</h1>
  <div className="card__content">
    <p className="card__title">Data Science </p>
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
    </div>

  </div>

    <h1 className='experience_text fade_section'>Currently Learning</h1>
    <div className='CurrentLearningContainer'>

      <div className='learning_item fade_section'>
        <h2>LLMs &amp; AI Agents</h2>
        <p>Exploring how large language models work, from transformer architecture and attention mechanisms to fine-tuning, RAG pipelines, and building autonomous AI agents that can reason and act.</p>
        <p className='workedWith'>Tools: LangChain, OpenAI API, Hugging Face, vector databases</p>
      </div>

      <div className='learning_item fade_section'>
        <h2>System Design</h2>
        <p>Studying how to architect large-scale distributed systems. Things like covering load balancing, caching strategies, database sharding, message queues, and designing for high availability and fault tolerance.</p>
        <p className='workedWith'>Focus: scalability, reliability, real-world trade-offs</p>
      </div>

    </div>

    <div className= 'EndButtonContainer'>
    <button className= 'projects_button' onClick={() => window.location.href = '/projects'}>
      <span className="text">View Projects</span>
    </button>

    <button className= 'ToTopButton' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="text">Back to Top</span>
    </button>
    </div>
    

    <Footer />

  </div>

  );
}

export default Home;