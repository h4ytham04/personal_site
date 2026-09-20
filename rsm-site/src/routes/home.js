import React, { useRef, useState } from 'react';
// Home page

import bg from '../assets/bg.mp4';
import jsr_hz from '../assets/jsr_hz.png';
import haytham_sitting from '../assets/haytham_sitting.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHoveringPixel, setIsHoveringPixel] = useState(false);

  // draws the png once so we can sample per-pixel alpha instead of the whole bounding box
  const handleImageLoad = () => {
    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    canvasRef.current = canvas;
  };

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const rect = img.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);
    const alpha = canvas.getContext('2d').getImageData(x, y, 1, 1).data[3];
    setIsHoveringPixel(alpha > 10);
  };

  const handleMouseLeave = () => setIsHoveringPixel(false);

  return (
    <>
    <div className="home-container">
      <video autoPlay loop muted playsInline>
        <source src={bg} type="video/mp4" />
      </video>
      <img
        ref={imgRef}
        src={jsr_hz}
        alt="jsr_hz"
        className={`home-image${isHoveringPixel ? ' home-image--hover' : ''}`}
        onLoad={handleImageLoad}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate('/')}
      />

      <div className="home-overlay">

        <div className="home-buttons">
            <button>career</button>
            <button>projects</button>
            <button>contact</button>
            <button>extras</button>
        </div>


      </div>


    </div>

    <section className="about-section">
      <img src={haytham_sitting} alt="Haytham sitting on a cliff at sunset" className="sitting-image" />
    </section>
    </>

  );
}

export default Home;