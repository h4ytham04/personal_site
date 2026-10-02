import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaBehance, FaPaintBrush } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import "./projects.css";
import "./contact.css";

import bg from '../assets/bg.mp4';
import useTypewriter from '../components/useTypewriter';
import useSwipe, { isCompactScreen, revealActive } from '../components/useSwipe';
import logo from '../assets/jsr_hz.png';

// shares the card/panel styles from projects.css; contact.css only holds overrides
const CONTACTS = [
  {
    id: 'email',
    badge: <FaEnvelope />,
    title: 'EMAIL',
    handle: 'haythamzaami12@gmail.com',
    heading: 'EMAIL',
    category: 'DIRECT',
    description: 'Got a question or an opportunity? Shoot me an email. I read everything!',
    url: 'mailto:haythamzaami12@gmail.com',
    display: 'haythamzaami12@gmail.com',
    action: 'SEND EMAIL',
  },
  {
    id: 'linkedin',
    badge: <FaLinkedin />,
    title: 'LINKEDIN',
    handle: 'haythamzaami',
    heading: 'LINKEDIN',
    category: 'PROFESSIONAL',
    description: 'Let\'s connect! My experience and background are all here.',
    url: 'https://www.linkedin.com/in/haythamzaami/',
    display: 'linkedin.com/in/haythamzaami',
    action: 'OPEN LINKEDIN',
  },
  {
    id: 'github',
    badge: <FaGithub />,
    title: 'GITHUB',
    handle: 'h4ytham04',
    heading: 'GITHUB',
    category: 'CODE',
    description: 'Want to see how I build things? My code and research live here.',
    url: 'https://github.com/h4ytham04',
    display: 'github.com/h4ytham04',
    action: 'OPEN GITHUB',
  },
  {
    id: 'leetcode',
    badge: <SiLeetcode />,
    title: 'LEETCODE',
    handle: 'h4ytham',
    heading: 'LEETCODE',
    category: 'CODE',
    description: 'Come watch me grind through some problems.',
    url: 'https://leetcode.com/u/h4ytham/',
    display: 'leetcode.com/u/h4ytham',
    action: 'OPEN LEETCODE',
  },
  {
    id: 'instagram',
    badge: <FaInstagram />,
    title: 'INSTAGRAM',
    handle: '@h4ytham',
    heading: 'INSTAGRAM',
    category: 'SOCIAL',
    description: 'Photos and everyday updates. Come say hi!',
    url: 'https://www.instagram.com/h4ytham/',
    display: 'instagram.com/h4ytham',
    action: 'OPEN INSTAGRAM',
  },
  {
    id: 'behance',
    badge: <FaBehance />,
    title: 'BEHANCE',
    handle: 'haythamzaami',
    heading: 'BEHANCE',
    category: 'DESIGN',
    description: 'My design portfolio. Take a look around.',
    url: 'https://www.behance.net/haythamzaami',
    display: 'behance.net/haythamzaami',
    action: 'OPEN BEHANCE',
  },
  {
    id: 'design-instagram',
    badge: <FaPaintBrush />,
    title: 'DESIGN INSTAGRAM',
    handle: '@haythamdepos',
    heading: 'DESIGN INSTAGRAM',
    category: 'DESIGN',
    description: 'More graphic design work and posts over here.',
    url: 'https://www.instagram.com/haythamdepos/',
    display: 'instagram.com/haythamdepos',
    action: 'OPEN INSTAGRAM',
  },
];

const openContact = (c) => {
  if (c.url.startsWith('mailto:')) window.location.href = c.url;
  else window.open(c.url, '_blank', 'noopener,noreferrer');
};

const copyText = (c) => (c.url.startsWith('mailto:') ? c.url.slice(7) : c.url);

function Contact() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState(null);
  const [allOut, setAllOut] = useState(false);
  const typedKeys = useRef('');

  // entrance animation kicks in one tick after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const contact = CONTACTS[active];
  const typed = useTypewriter(contact.description);

  const copyContact = () => {
    navigator.clipboard?.writeText(copyText(contact)).then(
      () => setToast(Date.now()),
      () => {}
    );
  };

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!allOut) return undefined;
    const t = setTimeout(() => setAllOut(false), 2200);
    return () => clearTimeout(t);
  }, [allOut]);

  useEffect(() => {
    const handleNavigation = (e) => {
      // touch devices scroll the page instead of stepping through the list
      if (e.type === 'wheel' && isCompactScreen()) return;
      if (e.key === 'ArrowUp' || e.deltaY < 0) {
        setActive((i) => Math.max(0, i - 1));
      }
      if (e.key === 'ArrowDown' || e.deltaY > 0) {
        setActive((i) => Math.min(CONTACTS.length - 1, i + 1));
      }
      if (e.key === 'Enter') openContact(contact);
      if (e.key === 'Escape' || e.key === 'Backspace') navigate('/');

      if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        if (e.key.toLowerCase() === 'c') copyContact();
        typedKeys.current = (typedKeys.current + e.key.toLowerCase()).slice(-6);
        if (typedKeys.current === 'allout') {
          typedKeys.current = '';
          setAllOut(true);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    window.addEventListener('wheel', handleNavigation);
    return () => {
      window.removeEventListener('keydown', handleNavigation);
      window.removeEventListener('wheel', handleNavigation);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, contact]);

  useSwipe(
    () => setActive((i) => Math.max(0, i - 1)),
    () => setActive((i) => Math.min(CONTACTS.length - 1, i + 1)),
  );
  useEffect(() => revealActive('.projects-card-wrap.active'), [active]);

  return (
    <div className="projects-page">
      <video className="projects-video" src={bg} autoPlay loop muted playsInline />

      <div className="projects-overlay">
        <img src={logo} alt="Haytham Zaami logo" className="contact-logo" />

        <div
          className="contact-emblem"
          key={contact.id}
          onClick={() => openContact(contact)}
          title={contact.action}
        >
          {contact.badge}
          <div className="contact-emblem-hint">{contact.action}</div>
        </div>

        <div className="projects-stack contact-stack" data-noswipe>
          <div className={`projects-list-tag${mounted ? ' mounted' : ''}`}>CONTACT</div>

          {CONTACTS.map((item, index) => (
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
                  <div className="projects-subtitle">{item.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`projects-detail-panel${mounted ? ' mounted' : ''}`}>
          <div key={contact.id} className="projects-detail-top">
            <div className="projects-detail-banner-icon">{contact.badge}</div>
            <div className="projects-detail-top-index">{contact.badge}</div>
            <div className="projects-detail-top-title">{contact.heading}</div>
            <div className="projects-detail-top-progress">{active + 1}/{CONTACTS.length}</div>
          </div>

          <div className="projects-detail-tags">
            <div className="projects-detail-tag">{contact.category}</div>
          </div>

          <div className="projects-detail-list">
            {[
              { label: 'HANDLE', value: contact.handle },
              { label: 'LINK', value: contact.display },
            ].map((row, i) => (
              <div
                className="projects-detail-row"
                key={`${contact.id}-${row.label}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="projects-detail-row-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="projects-detail-row-title">{row.label}: {row.value}</div>
              </div>
            ))}
          </div>

          <div className="contact-actions">
            <a
              className="projects-detail-link"
              href={contact.url}
              {...(contact.url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {contact.action}
            </a>
            <button type="button" className="projects-detail-link contact-copy" onClick={copyContact}>
              COPY
            </button>
          </div>
        </div>

        <div className="projects-dialog">
          <div className="projects-dialog-name">HAYTHAM</div>
          <div className="projects-dialog-box">
            <div className="projects-dialog-text">{typed}</div>
            {typed.length === contact.description.length && <div className="projects-dialog-next">▼</div>}
          </div>
        </div>

        {toast && <div className="contact-toast" key={toast}>COPIED TO CLIPBOARD</div>}

        {allOut && (
          <div className="contact-allout">
            <div className="contact-allout-band">ALL-OUT ATTACK!</div>
          </div>
        )}

        <div className={`projects-hints${mounted ? ' mounted' : ''}`}>
          <span><b>↑↓</b> SELECT</span>
          <span><b>ENTER</b> OPEN</span>
          <span><b>C</b> COPY</span>
          <span><b>ESC</b> BACK</span>
        </div>
      </div>
    </div>
  );
}

export default Contact;
