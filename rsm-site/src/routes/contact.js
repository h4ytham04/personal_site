//contact page for resume site

import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaInstagram, FaBehance } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {

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

  const links = [
    {
      name: 'Email',
      handle: 'haythamzaami12@gmail.com',
      url: 'mailto:haythamzaami12@gmail.com',
      color: '#f441a5',
      icon: <MdEmail size={22} />,
    },
    {
      name: 'LinkedIn',
      handle: 'haythamzaami',
      url: 'https://www.linkedin.com/in/haythamzaami/',
      color: '#0fafff',
      icon: <FaLinkedin size={22} />,
    },
    {
      name: 'GitHub',
      handle: 'h4ytham04',
      url: 'https://github.com/h4ytham04',
      color: '#a78bfa',
      icon: <FaGithub size={22} />,
    },
    {
      name: 'Instagram',
      handle: '@h4ytham',
      url: 'https://www.instagram.com/h4ytham/',
      color: '#f441a5',
      icon: <FaInstagram size={22} />,
    },
    {
      name: 'LeetCode',
      handle: 'h4ytham',
      url: 'https://leetcode.com/u/h4ytham/',
      color: '#fbbf24',
      icon: <SiLeetcode size={22} />,
    },
    {
      name: 'Behance',
      handle: 'haythamzaami',
      url: 'https://www.behance.net/haythamzaami',
      color: '#4741f4',
      icon: <FaBehance size={22} />,
    },
    {
      name: 'Design Instagram',
      handle: '@haythamdepos',
      url: 'https://www.instagram.com/haythamdepos/',
      color: '#f441a5',
      icon: <FaInstagram size={22} />,
    },
  ];

  return (
    <div className="contact">
      <Navbar />
      <div className="contact_page">
        <div className="contact_header fade_section">
          <div className="contact_header_inner">
            <div>
              <h1 className="experience_text">Get in Touch</h1>
              <p className="contact_subtitle">Feel free to reach out through any of the platforms below!</p>
            </div>
          </div>
        </div>
      
      <div className="contact_intro fade_section">
        <img src= {require('../assets/mew.png')} alt="mew" className="contact_mew" />
        <div className="contact_grid">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noreferrer"
              className="contact_card"
              style={{ '--accent': link.color }}
            >
              <div className="contact_card_left">
                <span className="contact_card_name">{link.name}</span>
                <span className="contact_card_handle">{link.handle}</span>
              </div>
              <span className="contact_card_arrow">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;