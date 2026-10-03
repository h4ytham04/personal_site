import React, { useEffect, useState } from 'react';
import "./extras.css";
import { useNavigate } from "react-router-dom";
import extras_vid from '../assets/extras_vid.mp4';
import haytham_sitting from '../assets/haytham_sitting.jpg';
import { FaSteam, FaDiscord, FaGamepad, FaTv, FaHeadphones, FaBook } from 'react-icons/fa';
import { IoStarSharp } from "react-icons/io5";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

// edit the text in these lists to update the page
const NOW = [
  { icon: <FaGamepad />, label: 'PLAYING', title: 'Add a game', note: 'what you can\'t stop playing' },
  { icon: <FaTv />, label: 'WATCHING', title: 'Add a show', note: 'what you\'re binging' },
  { icon: <FaHeadphones />, label: 'LISTENING', title: 'Add an album', note: 'on repeat lately' },
  { icon: <FaBook />, label: 'READING', title: 'Add a book', note: 'what\'s on the nightstand' },
];

const FAVORITES = [
  { category: 'GAMES', picks: ['Pick #1', 'Pick #2', 'Pick #3', 'Pick #4', 'Pick #5'] },
  { category: 'ANIME / SHOWS', picks: ['Pick #1', 'Pick #2', 'Pick #3', 'Pick #4', 'Pick #5'] },
  { category: 'MUSIC', picks: ['Pick #1', 'Pick #2', 'Pick #3', 'Pick #4', 'Pick #5'] },
  { category: 'FOOD', picks: ['Pick #1', 'Pick #2', 'Pick #3', 'Pick #4', 'Pick #5'] },
];

// every image dropped into src/assets/gallery shows up here automatically
const galleryContext = require.context('../assets/gallery', false, /\.(png|jpe?g|webp|gif)$/i);
const PHOTOS = [
  { src: haytham_sitting, caption: 'sunset overlook' },
  ...galleryContext.keys().map((key) => ({
    src: galleryContext(key),
    caption: key.replace('./', '').replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
  })),
];

function Extras() {
  const navigate = useNavigate();
  const [openPhoto, setOpenPhoto] = useState(null);

  useEffect(() => {
    if (openPhoto === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenPhoto(null);
      if (e.key === 'ArrowRight') setOpenPhoto((i) => (i + 1) % PHOTOS.length);
      if (e.key === 'ArrowLeft') setOpenPhoto((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openPhoto]);

  return (
    <>
      <div className="extras-container">
        <video className="extras-video" autoPlay loop muted playsInline>
          <source src={extras_vid} type="video/mp4" />
        </video>
        <div className="extras-overlay">
            <button className="steam_button" onClick={() => openInNewTab("https://steamcommunity.com/id/h4ytham")}><FaSteam /> h4ytham</button>
            <button className="steam_button" onClick={() => openInNewTab("https://passportdex.com/h4ytham")}><IoStarSharp /> h4ytham (passportdex)</button>
            <button className="steam_button" onClick={() => openInNewTab("https://discord.com/users/h4ytham")}><FaDiscord /> h4ytham</button>
        </div>
      </div>

      <section className="extras-content">
        <h2 className="extras-section-title">CURRENTLY</h2>
        <div className="extras-now">
          {NOW.map((item) => (
            <div className="extras-now-card" key={item.label}>
              <div className="extras-now-label">{item.icon}<span>{item.label}</span></div>
              <div className="extras-now-title">{item.title}</div>
              <div className="extras-now-note">{item.note}</div>
            </div>
          ))}
        </div>

        <h2 className="extras-section-title">TOP 5</h2>
        <div className="extras-favorites">
          {FAVORITES.map((list) => (
            <div className="extras-fav-card" key={list.category}>
              <div className="extras-fav-heading">{list.category}</div>
              <ol>
                {list.picks.map((pick, i) => (
                  <li key={pick + i}><span className="extras-fav-rank">{i + 1}</span>{pick}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <h2 className="extras-section-title">GALLERY</h2>
        <div className="extras-gallery">
          {PHOTOS.map((photo, i) => (
            <button
              type="button"
              className="extras-polaroid"
              key={photo.caption + i}
              style={{ '--tilt': `${(i % 2 ? 1 : -1) * (1.5 + (i % 3))}deg` }}
              onClick={() => setOpenPhoto(i)}
            >
              <img src={photo.src} alt={photo.caption} />
              <span>{photo.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {openPhoto !== null && (
        <div className="extras-lightbox" onClick={() => setOpenPhoto(null)}>
          <img src={PHOTOS[openPhoto].src} alt={PHOTOS[openPhoto].caption} />
          <div className="extras-lightbox-hint">? ? BROWSE · ESC CLOSE</div>
        </div>
      )}
    </>
  );
}

export default Extras;
