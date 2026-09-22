import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaHammer, FaSuitcase, FaFile } from 'react-icons/fa';
import "./career.css";

import bg from '../assets/bg.mp4';
import haytham_sitting from '../assets/haytham_sitting.jpg';
import psu from '../assets/psu.png';
import ship from '../assets/ship.png';

import carmax from '../assets/carmax.png';
import uspto from '../assets/uspto.jpg';


const CAREER_ITEMS = [
  { id: 'education', badge: <FaGraduationCap />, title: 'EDUCATION', subtitle: 'Pennsylvania State University · Shippensburg University', rank: 1 },
  { id: 'experience', badge: <FaSuitcase />, title: 'EXPERIENCE', subtitle: 'USPTO · CarMax · Penn State Health', rank: 2 },
  { id: 'skills', badge: <FaHammer/>, title: 'SKILLS', subtitle: 'Languages, Tools & Specializations', rank: 3 },
  { id: 'research', badge: <FaFile />, title: 'RESEARCH', subtitle: 'Retail Transaction Analysis', rank: 4 },
];


const CAREER_DETAILS = {
  education: {
    heading: 'B.S. Computer Science',
    progress: '1/1',
    rows: [
      { index: '01', title: 'Penn State University', status: 'Aug 2023 – May 2026'},
      { index: '02', title: 'Shippensburg University', status: 'Aug 2022 – May 2023' }
    ],
    bullets: [
      '3.60 GPA, 5x Dean’s List',
      'Coursework: Databases, OOP Web Applications, Data Mining, Statistical Analysis, Machine Learning, Artificial Intelligence, Operating Systems, Computer Vision, Computational Biology',
      'IEEE Member, Hackathon Participant, Undergraduate Researcher, Newspaper Contributor, MSA Graphic Designer.',
    ],
  },
  experience: {
    heading: 'EXPERIENCE LOG',
    progress: '3/3',
    rows: [
      { index: '01', title: 'Patent Examiner (Computer Science)', status: 'Oct 2026 – Present' },
      { index: '02', title: 'Business Operations Associate — CarMax', status: 'Nov 2024 – Present' },
      { index: '03', title: 'Healthcare Application Developer — Penn State Health', status: 'Oct 2025 – May 2026' },
    ],
    bullets: [
      'Examined and evaluated patent applications in the field of computer science, ensuring compliance with legal and technical standards.',
      'Architected AWS backend (Amplify, DynamoDB, Lambda) with role-based access for clinician/patient workflows.',
      'Used Power BI to identify workflow bottlenecks, resolving 5-10 incomplete cases weekly.',
    ],
  },
  skills: {
    heading: 'SKILL TREE',
    progress: '3/3',
    rows: [
      { index: '01', title: 'Languages', status: 'Python · SQL · Java · TS · JS' },
      { index: '02', title: 'Tools & Platforms', status: 'Power BI · AWS · Git · DBeaver · Linux' },
      { index: '03', title: 'Specializations', status: 'Data Viz · REST APIs · Automation · SDLC' },
    ],
    bullets: [
      'Comfortable across the stack: backend APIs, data pipelines, and BI dashboards.',
      'Requirements gathering and stakeholder collaboration from healthcare to retail.',
    ],
  },
  research: {
    heading: 'PROJECT ARCHIVE',
    progress: '1/1',
    rows: [
      { index: '01', title: 'Retail Transaction Pattern Analysis', status: 'Mar 2026' },
    ],
    bullets: [
      'Mined 500,000+ retail transactions for high-demand product combos and regional trends (UK/Germany).',
      'Surfaced dynamic pricing and bundling recommendations from association rule mining.',
    ],
  },
};

function Career() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sittingRef = useRef(null);
  const [isSittingExpanded, setIsSittingExpanded] = useState(false);

  // entrance animation kicks in one tick after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // measures the portrait's current spot and computes the translate/scale needed to land it centered and large
  const toggleSittingExpand = () => {
    const el = sittingRef.current;
    if (!el) return;

    if (!isSittingExpanded) {
      const rect = el.getBoundingClientRect();
      const targetWidth = Math.min(window.innerWidth * 0.75, 650);
      const scale = targetWidth / rect.width;
      const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    } else {
      el.style.transform = '';
    }
    setIsSittingExpanded((v) => !v);
  };

  useEffect(() => {
     const handleNavigation = (e) => {
    // 1. Handle Scroll Up OR Arrow Up
    if (e.key === 'ArrowUp' || e.deltaY < 0) {
      setActive((i) => Math.max(0, i - 1));
    }
    
    // 2. Handle Scroll Down OR Arrow Down
    if (e.key === 'ArrowDown' || e.deltaY > 0) {
      setActive((i) => Math.min(CAREER_ITEMS.length - 1, i + 1));
    }
    
    // 3. Handle Back/Escape (Only applies to keyboard events)
    if (e.key === 'Escape' || e.key === 'Backspace') {
      if (isSittingExpanded) toggleSittingExpand();
      else navigate('/');
    }
  };

  // Attach to BOTH event types
  window.addEventListener('keydown', handleNavigation);
  window.addEventListener('wheel', handleNavigation);

  // Clean up listeners when component unmounts or dependencies change
  return () => {
    window.removeEventListener('keydown', handleNavigation);
    window.removeEventListener('wheel', handleNavigation);
  };
}, [isSittingExpanded, CAREER_ITEMS.length]); // Add your dependencies here;

  const detail = CAREER_DETAILS[CAREER_ITEMS[active].id];
  const isEducationActive = CAREER_ITEMS[active].id === 'education';
  const isExperienceActive = CAREER_ITEMS[active].id === 'experience';

  return (
    <div className="career-page">
      <video className="career-video" src={bg} autoPlay loop muted playsInline />

      <div className="career-overlay">
        <div className="career-stack">
          <div className={`career-list-tag${mounted ? ' mounted' : ''}`}>CAREER</div>

          {CAREER_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`career-card-wrap${active === index ? ' active' : ''}${mounted ? ' mounted' : ''}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="career-card">
                <div className="career-badge">
                  <div className="career-badge-text">{item.badge}</div>
                </div>
                <div className="career-card-inner">
                  <div className="career-title">{item.title}</div>
                  <div className="career-rank">
                    <div className="career-rank-label">RANK</div>
                    <div className="career-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="career-subtitle-bar">
                  <div className="career-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`career-detail-panel${mounted ? ' mounted' : ''}`}>
          <div className="career-detail-top">
            <div className="career-detail-top-index">{CAREER_ITEMS[active].badge}</div>
            <div className="career-detail-top-title">{detail.heading}</div>
            <div className="career-detail-top-progress">{detail.progress}</div>
          </div>

          <div className="career-detail-list">
            {detail.rows.map((row) => (
              <div className="career-detail-row" key={row.index}>
                <div className="career-detail-row-index">{row.index}</div>
                <div className="career-detail-row-title">{row.title}</div>
                <div className="career-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="career-detail-bottom">
            <div className="career-detail-bottom-title">DETAILS</div>
            <div className="career-detail-bullets">
              {detail.bullets.map((bullet) => (
                <div className="career-detail-bullet" key={bullet}>- {bullet}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={`career-edu-emblem${isEducationActive && mounted ? ' career-edu-emblem--visible' : ''}`}>
          <img src={psu} alt="Penn State University logo" className="career-edu-emblem-img" />
          <img src={ship} alt="Shippensburg University logo" className="career-edu-emblem-img" />
        </div>

        <div className={`career-edu-emblem${isExperienceActive && mounted ? ' career-edu-emblem--visible' : ''}`}>
          <img src={uspto} alt="United States Patent and Trademark Office logo" className="career-edu-emblem-img" />
          <img src={carmax} alt="CarMax logo" className="career-edu-emblem-img" />
          <img src={psu} alt="Penn State Health logo" className="career-edu-emblem-img" />

          {/* these are appearing too large to fit all three logos in the available space, have to scale them down using CSS */}
          
        </div>

        <div
          className={`career-dim-backdrop${isSittingExpanded ? ' active' : ''}`}
          onClick={toggleSittingExpand}
        />

        <img
          ref={sittingRef}
          src={haytham_sitting}
          alt="Haytham sitting on a cliff at sunset"
          className={`haytham_sitting${mounted ? ' haytham_sitting--visible' : ''}${isSittingExpanded ? ' haytham_sitting--expanded' : ''}`}
          onClick={toggleSittingExpand}
        />

      </div>
    </div>
  );
}

export default Career;
