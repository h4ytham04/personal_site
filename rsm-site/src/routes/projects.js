//projects page for resume site

import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useEffect } from 'react';

const projects = [
  {
    title: 'Facial Paralysis Detection App',
    subtitle: 'TypeScript · React Native · AWS · Python · OpenCV',
    description:
      'Full-stack clinical application built at Penn State Health. Clinicians send images through a real-time validation pipeline powered by OpenCV and NumPy; a machine learning model analyzes each image for signs of facial paralysis and surfaces results through a secure AWS-backed interface.',
    highlights: ['Real-time image analysis pipeline', 'AWS Amplify + DynamoDB cloud infra', 'Deployed in active clinical workflows']
  },
  {
    title: 'ProxyNCA Metric Learning',
    subtitle: 'Python · PyTorch · NumPy · Matplotlib · Colab',
    description:
      'Implemented contrastive ProxyNCA loss on the CUB-200-2011 bird dataset to learn compact visual embeddings for fine-grained recognition. Fine-tuned a ResNet-50 backbone with proxy-based anchor loss.',
    highlights: ['91% Recall@10 on test set', 'ResNet-50 backbone fine-tuning', 'Proxy-based contrastive learning'],
    link: 'https://github.com/h4ytham04/comp597-computer-vision-final',
  },
  {
    title: 'RAG Chatbot',
    subtitle: 'Python · LangChain · Vector Databases · Tkinter',
    description:
      'Designed a multi-step retrieval-augmented generation pipeline using LangChain and vector databases to answer questions over scraped Penn State web content. Implemented document chunking, semantic embeddings, and structured prompt engineering.',
    highlights: ['Semantic chunking + embeddings', 'LLM API integration', 'Context-aware Q&A over live web content'],
    link: 'https://github.com/h4ytham04/441PROJ',
  },
  {
    title: 'AI Agriculture Management Platform',
    subtitle: 'Python · React · Firebase · TypeScript · HTML · CSS',
    description:
      'End-to-end ML platform for product ranking and profit margin prediction in agriculture. Deployed a Random Forest pipeline achieving 95% accuracy, fine-tuned an LLM on categorical features, and integrated live weather data for dynamic forecasting.',
    highlights: ['95% accuracy on agricultural samples', 'Fine-tuned LLM for profit prediction', 'Real-time OpenWeatherMap API integration'],
    link: 'https://github.com/bakardd/hackthon',
  },
  {
    title: 'GroEL Normal Mode Analysis',
    subtitle: 'Python · ProDy · Biopython · NumPy · Research',
    description:
      'Research project analyzing normal mode analysis (NMA) on chaperone proteins GroEL and GroES found in E. coli. Worked on a paper exploring protein flexibility and biological function through computational structural biology.',
    highlights: ['Published research paper', 'Protein structure computational analysis', 'E. coli chaperone protein modeling'],
    link: 'https://github.com/h4ytham04/groel-normal-mode-analysis',
  },
];

const Projects = () => {

  useEffect(() => {
      const items = document.querySelectorAll('.project_card');
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
      <title>Haytham's Projects</title>
      <Navbar />

      <div className='projectsIntro fade_section'>
            <img src={require('../assets/jsr_hz.png')} alt="" className="projects_image"/>
            <p className='projectsIntro_text'>A selection of projects showcasing my experience with full-stack development, machine learning, and research.
            These projects demonstrate my ability to apply technical skills to solve real-world problems across various domains.</p>
      </div>
      

      <h1 className='experience_text fade_section'>Projects</h1>
      <div className='projects_container'>
        {projects.map((proj, i) => (
          <div className='project_card' key={i}>
            <div className='project_card_header'>
              <h2>{proj.title}</h2>
              <span className='project_subtitle'>{proj.subtitle}</span>
            </div>
            <p className='project_description'>{proj.description}</p>
            <ul className='project_highlights'>
              {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
            {proj.link && <a className='project_link' href={proj.link} target='_blank' rel='noreferrer'>View on GitHub</a>}
          </div>
        ))}
      </div>

      <div className= 'EndButtonContainer'>
    <button className= 'projects_button' onClick={() => window.location.href = '/extras'}>
      <span className="text">View Extras</span>
    </button>

    <button className= 'ToTopButton' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="text">Back to Top</span>
    </button>
    </div>

      <Footer />
    </div>
  );
}

export default Projects;