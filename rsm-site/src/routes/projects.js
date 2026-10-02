import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaCar, FaBrain, FaRobot, FaSeedling } from 'react-icons/fa';
import "./projects.css";

import bg from '../assets/bg.mp4';
import useTypewriter from '../components/useTypewriter';
import useSwipe, { isCompactScreen, revealActive } from '../components/useSwipe';
import facial_app from '../assets/facial_app.jpg';
import carmax from '../assets/carmax.png';
import ragbot from '../assets/ragbot.jpg';
import farmforward from '../assets/farmforward.png';
import paper from '../assets/2541988.png';
import PROXYNCA_RSRCH_PAPER from '../assets/PROXYNCA_RSRCH_PAPER.pdf';

// centerImage: optional screenshot or logo shown centered while the project is selected; centerLogo: true drops the frame
// centerLink + centerHint: makes the center image clickable
const PROJECTS = [
  {
    id: 'facial-paralysis',
    badge: <FaHeartbeat />,
    title: 'FACIAL PARALYSIS APP',
    subtitle: 'Penn State Health · Clinical Application',
    heading: 'FACIAL PARALYSIS DETECTION',
    stack: ['TypeScript', 'React Native', 'AWS', 'Python', 'OpenCV'],
    description:
      'Full-stack clinical application built at Penn State Health. Clinicians send images through a real-time validation pipeline powered by OpenCV and NumPy; a machine learning model analyzes each image for signs of facial paralysis and surfaces results through a secure AWS-backed interface.',
    highlights: [
      'Real-time image analysis pipeline',
      'AWS Amplify + DynamoDB cloud infra',
      'Deployed in active clinical workflows',
    ],
    link: null,
    centerImage: facial_app,
  },
  {
    id: 'carmax-scheduler',
    badge: <FaCar />,
    title: 'CARMAX SCHEDULER',
    subtitle: 'Next.js · Tailwind CSS · Gemini',
    heading: 'ASSOCIATE SCHEDULER',
    stack: ['Next.js', 'Tailwind CSS', 'Gemini'],
    description:
      'Scheduling application for CarMax associates to manage shifts and availability. Includes an AI assistant for scheduling via Gemini integration.',
    highlights: [
      'Gemini AI assistant integration',
      'Next.js and Tailwind CSS frontend',
      'Shift management and availability tracking',
    ],
    link: 'https://car-max-scheduler.vercel.app/',
    centerImage: carmax,
    centerLogo: true,
  },
  {
    id: 'proxynca',
    badge: <FaBrain />,
    title: 'PROXYNCA',
    subtitle: 'Python · PyTorch · Computer Vision',
    heading: 'PROXYNCA METRIC LEARNING',
    stack: ['Python', 'PyTorch', 'NumPy', 'Matplotlib', 'Colab'],
    description:
      'Implemented contrastive ProxyNCA loss on the CUB-200-2011 bird dataset to learn compact visual embeddings for fine-grained recognition. Fine-tuned a ResNet-50 backbone with proxy-based anchor loss.',
    highlights: [
      { text: '91% Recall@10 on test set', value: 91 },
      'ResNet-50 backbone fine-tuning',
      'Proxy-based contrastive learning',
    ],
    link: 'https://github.com/h4ytham04/comp597-computer-vision-final',
    centerImage: paper,
    centerLogo: true,
    centerLink: PROXYNCA_RSRCH_PAPER,
    centerHint: 'View ProxyNCA Paper',
  },
  {
    id: 'rag-chatbot',
    badge: <FaRobot />,
    title: 'RAG CHATBOT',
    subtitle: 'Python · LangChain · Vector Databases',
    heading: 'RAG CHATBOT',
    stack: ['Python', 'LangChain', 'Vector Databases', 'Tkinter'],
    description:
      'Multi-step retrieval-augmented generation pipeline using LangChain and vector databases to answer questions over scraped Penn State web content. Implemented document chunking, semantic embeddings, and structured prompt engineering.',
    highlights: [
      'Semantic chunking + embeddings',
      'LLM API integration',
      'Context-aware Q&A over live web content',
    ],
    link: 'https://github.com/h4ytham04/441PROJ',
    centerImage: ragbot,
  },
  {
    id: 'agriculture',
    badge: <FaSeedling />,
    title: 'AGRICULTURE PLATFORM',
    subtitle: 'Python · React · Firebase · TypeScript',
    heading: 'AI AGRICULTURE PLATFORM',
    stack: ['Python', 'React', 'Firebase', 'TypeScript', 'HTML', 'CSS'],
    description:
      'End-to-end ML platform for product ranking and profit margin prediction in agriculture. Deployed a Random Forest pipeline achieving 95% accuracy, fine-tuned an LLM on categorical features, and integrated live weather data for dynamic forecasting.',
    highlights: [
      { text: '95% accuracy on agricultural samples', value: 95 },
      'Fine-tuned LLM for profit prediction',
      'Real-time OpenWeatherMap API integration',
    ],
    link: 'https://github.com/bakardd/hackthon',
    centerImage: farmforward,
  },
];

// decorative bar length in 55-98, stable per row so it doesn't change between renders
const decorativeStat = (id, i) => {
  let h = 0;
  for (const c of `${id}-${i}`) h = (h * 31 + c.charCodeAt(0)) % 1000;
  return 55 + (h % 44);
};

function Projects() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  // entrance animation kicks in one tick after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const project = PROJECTS[active];
  const typed = useTypewriter(project.description);

  useEffect(() => {
    const handleNavigation = (e) => {
      // touch devices scroll the page instead of stepping through the list
      if (e.type === 'wheel' && isCompactScreen()) return;
      if (e.key === 'ArrowUp' || e.deltaY < 0) {
        setActive((i) => Math.max(0, i - 1));
      }
      if (e.key === 'ArrowDown' || e.deltaY > 0) {
        setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      }
      if (e.key === 'Enter' && project.link) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
      if (e.key === 'Escape' || e.key === 'Backspace') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleNavigation);
    window.addEventListener('wheel', handleNavigation);
    return () => {
      window.removeEventListener('keydown', handleNavigation);
      window.removeEventListener('wheel', handleNavigation);
    };
  }, [navigate, project]);

  useSwipe(
    () => setActive((i) => Math.max(0, i - 1)),
    () => setActive((i) => Math.min(PROJECTS.length - 1, i + 1)),
  );
  useEffect(() => revealActive('.projects-card-wrap.active'), [active]);

  return (
    <div className="projects-page">
      <video className="projects-video" src={bg} autoPlay loop muted playsInline />

      <div className="projects-overlay">
        {project.centerImage && (
          <div
            className={`projects-shot${project.centerLink ? ' projects-shot--link' : ''}`}
            key={project.id}
            onClick={project.centerLink ? () => window.open(project.centerLink, '_blank') : undefined}
            title={project.centerHint}
          >
            <img
              src={project.centerImage}
              alt={`${project.heading} ${project.centerLogo ? 'logo' : 'screenshot'}`}
              className={`projects-shot-img${project.centerLogo ? ' projects-shot-img--logo' : ''}`}
            />
            {project.centerHint && <div className="projects-shot-hint">{project.centerHint}</div>}
          </div>
        )}

        <div className="projects-stack" data-noswipe>
          <div className={`projects-list-tag${mounted ? ' mounted' : ''}`}>PROJECTS</div>

          {PROJECTS.map((item, index) => (
            <div
              key={item.id}
              className={`projects-card-wrap${active === index ? ' active' : ''}${mounted ? ' mounted' : ''}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="projects-card">
                <div className="projects-badge">
                  <div className="projects-badge-text">{item.badge}</div>
                </div>
                <div className="projects-card-inner">
                  <div className="projects-title">{item.title}</div>
                  <div className="projects-rank">
                    <div className="projects-rank-label">NO.</div>
                    <div className="projects-rank-number">{index + 1}</div>
                  </div>
                </div>
                <div className="projects-subtitle-bar">
                  <div className="projects-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`projects-detail-panel${mounted ? ' mounted' : ''}`}>
          <div
            key={project.id}
            className="projects-detail-top"
            style={project.image ? { backgroundImage: `linear-gradient(90deg, rgba(8, 10, 40, 0.95) 25%, rgba(8, 10, 40, 0.2)), url(${project.image})` } : undefined}
          >
            <div className="projects-detail-banner-icon">{project.badge}</div>
            <div className="projects-detail-top-index">{project.badge}</div>
            <div className="projects-detail-top-title">{project.heading}</div>
            <div className="projects-detail-top-progress">{active + 1}/{PROJECTS.length}</div>
          </div>

          <div className="projects-detail-tags">
            {project.stack.map((tech) => (
              <div className="projects-detail-tag" key={tech}>{tech}</div>
            ))}
          </div>

          <div className="projects-detail-list">
            {project.highlights.map((item, i) => {
              const { text, value = decorativeStat(project.id, i) } = typeof item === 'string' ? { text: item } : item;
              return (
                <div
                  className="projects-detail-row"
                  key={`${project.id}-${i}`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div
                    className="projects-detail-row-bar"
                    style={{ width: `${value}%`, animationDelay: `${300 + i * 90}ms` }}
                  />
                  <div className="projects-detail-row-index">{String(i + 1).padStart(2, '0')}</div>
                  <div className="projects-detail-row-title">{text}</div>
                </div>
              );
            })}
          </div>

          {project.link ? (
            <a
              className="projects-detail-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW PROJECT
            </a>
          ) : (
            <div className="projects-detail-link projects-detail-link--disabled">PRIVATE · CLINICAL USE</div>
          )}
        </div>

        <div className="projects-dialog projects-dialog--long">
          <div className="projects-dialog-name">HAYTHAM</div>
          <div className="projects-dialog-box">
            <div className="projects-dialog-text">{typed}</div>
            {typed.length === project.description.length && <div className="projects-dialog-next">▼</div>}
          </div>
        </div>

        <div className={`projects-hints${mounted ? ' mounted' : ''}`}>
          <span><b>↑↓</b> SELECT</span>
          {project.link && <span><b>ENTER</b> OPEN</span>}
          <span><b>ESC</b> BACK</span>
        </div>
      </div>
    </div>
  );
}

export default Projects;