import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./career.css";

import bg from '../assets/bg.mp4';
import haytham_sitting from '../assets/haytham_sitting.jpg';
import psu from '../assets/psu.png';
import ship from '../assets/ship.png';

// --- EDIT ME: one card per career category, shown in the left-hand list ---
const CAREER_ITEMS = [
  { id: 'education', badge: '', title: 'EDUCATION', subtitle: 'Pennsylvania State University', rank: 1 },
  { id: 'experience', badge: '', title: 'EXPERIENCE', subtitle: 'CarMax · Penn State Health', rank: 2 },
  { id: 'skills', badge: '', title: 'SKILLS', subtitle: 'Languages, Tools & Specializations', rank: 3 },
  { id: 'projects', badge: '', title: 'PROJECTS', subtitle: 'Retail Transaction Analysis', rank: 4 },
];

// --- EDIT ME: detail panel content shown on the right for whichever card is selected ---
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
      { index: '01', title: 'Business Operations Associate — CarMax', status: 'Nov 2024 – Present' },
      { index: '02', title: 'Healthcare Application Developer — Penn State Health', status: 'Oct 2025 – May 2026' },
      { index: '03', title: 'Sales Consultant — CarMax', status: 'Jul 2024 – Nov 2024' },
    ],
    bullets: [
      'Architected AWS backend (Amplify, DynamoDB, Lambda) with role-based access for clinician/patient workflows.',
      'Used Power BI to identify workflow bottlenecks, resolving 5-10 incomplete cases weekly.',
      'Guided customers through full purchasing journeys including financing and documentation.',
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
  projects: {
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

  // arrow keys move the selection, escape/backspace returns to the hero (or closes the zoomed portrait first)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowDown') setActive((i) => Math.min(CAREER_ITEMS.length - 1, i + 1));
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (isSittingExpanded) toggleSittingExpand();
        else navigate('/');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, isSittingExpanded]);

  const detail = CAREER_DETAILS[CAREER_ITEMS[active].id];
  const isEducationActive = CAREER_ITEMS[active].id === 'education';

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
