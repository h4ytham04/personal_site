import React from 'react';
import "./extras.css";
import { useNavigate } from "react-router-dom";
import extras_vid from '../assets/extras_vid.mp4';
import { FaSteam, FaDiscord } from 'react-icons/fa';
import { IoStarSharp } from "react-icons/io5";


  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };


function Extras() {
  const navigate = useNavigate();
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
        <h1 className="extras-content__title">more coming soon</h1>
      </section>
    </>
  );
}

export default Extras;

