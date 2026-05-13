import React, { useState, useRef, useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Extras = () => {

  const [mangaIndex, setMangaIndex] = useState(0);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const intervalRef = useRef(null);
  const blogRef = useRef(null);
  const artworkRef = useRef(null);
  const mangaRef = useRef(null);
  const steamRef = useRef(null);
  const pcRef = useRef(null);
  const deskRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (blogRef.current) observer.observe(blogRef.current);
    if (artworkRef.current) observer.observe(artworkRef.current);
    if (mangaRef.current) observer.observe(mangaRef.current);
    if (steamRef.current) observer.observe(steamRef.current);
    if (pcRef.current) observer.observe(pcRef.current);
    if (deskRef.current) observer.observe(deskRef.current);
    return () => observer.disconnect();
  }, []);

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setMangaIndex(i => (i + 1) % manga.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setMangaIndex(i => (i + 1) % manga.length);
      else setMangaIndex(i => (i - 1 + manga.length) % manga.length);
      startAutoPlay();
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  const manga = [
    {
      name: 'Real',
      read: "Current Read",
      Author: 'Takehiko Inoue',
      type: 'Manga',
      thoughts: 'Inspiring story about a group of wheelchair basketball players. Beautifully drawn and emotionally impactful.',
      rating : 8,
      img : require('../assets/real.jpg')
    },
    {
      name: 'The Climber',
      Author: 'Jiro Nitta',
      type: 'Manga',
      thoughts: 'My personal favorite. Greatest Manga of all time',
      rating : 10,
      img : require('../assets/climber.jpg')
    },
    {
      name: 'Berserk',
      Author: 'Kentaro Miura',
      type: 'Manga',
      thoughts: 'My first and was my favorite manga for a long time. The art is incredible and the story is dark and captivating.',
      rating : 9,
      img : require('../assets/berserk.jpg')
    },
    {
      name: 'Full Metal Alchemist',
      Author: 'Hiromu Arakawa',
      type: 'Manga',
      thoughts: 'Read while overseas. One of the best conclusions to a manga.',
      rating : 9,
      img : require('../assets/fma.jpg')
    },
    {
      name: 'Tokyo Ghoul',
      Author: 'Sui Ishida',
      type: 'Manga',
      thoughts: 'CRAZYYYYYYYYYY ARIMA MY GOAT',
      rating : 8,
      img : require('../assets/tokyo_ghoul.jpg')
    },
  ];

  const steamInfo = {
    name: 'h4ytham',
    profileUrl: 'https://steamcommunity.com/id/h4ytham/',
    pfp: require('../assets/steam_pfp.jpg'),
  };

  const blogPosts = [
    {
      title: 'Rainy Day',
      excerpt: 'Although I didn\'t hear the rain, I smelt and saw it. Rainy days are good when they want to be. Today was not one of them. It felt grey and gloomy. I stayed inside and worked on this site as well ate some salmon. I don\'t mind the rain but I wish it would stop for a bit.',
      date: '2026-05-13',
    },
    {
      title: 'Launch',
      excerpt: '"Preoccupied with a single leaf, you won\'t see the tree. Preoccupied with a single tree, you\'ll miss the entire forest."',
      date: '2026-05-13',
    },
  ];

  const behanceUrl = 'https://www.behance.net/haythamzaami';

  return (
    <div className="extras">
      <title>Haytham's Extras</title>

      <Navbar/>

      <div className="four_col_row">

        <div ref={mangaRef} className="four_col_item fade_section">
          <h1 className="manga_section_title">Manga I Enjoy</h1>
          <div
            className="manga_carousel"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <div className="manga_card">
              <img src={manga[mangaIndex].img} alt={manga[mangaIndex].name} className="manga_image" />
              <h2>{manga[mangaIndex].name}</h2>
              <p><strong>Author:</strong> {manga[mangaIndex].Author}</p>
              {manga[mangaIndex].thoughts ? <p><em>"{manga[mangaIndex].thoughts}"</em></p> : null}
              <p className="manga_rating">{'★'.repeat(Math.round(manga[mangaIndex].rating))} {manga[mangaIndex].rating}/10</p>
              {manga[mangaIndex].read && <span className="manga_badge">{manga[mangaIndex].read}</span>}
            </div>
          </div>
          <div className="manga_dots">
            {manga.map((_, i) => (
              <span
                key={i}
                className={`manga_dot${i === mangaIndex ? ' active' : ''}`}
                onClick={() => setMangaIndex(i)}
              />
            ))}
          </div>
        </div>

        <div ref={steamRef} className="four_col_item fade_section">
          <h1 className="manga_section_title">My Steam Profile</h1>
          <a href={steamInfo.profileUrl} target="_blank" rel="noreferrer" className="steam_profile_link">
            <img src={steamInfo.pfp} alt="Steam Profile" className="steam_pfp" />
            <span className="steam_username">{steamInfo.name}</span>
          </a>
        </div>

        <div ref={pcRef} className="four_col_item fade_section">
          <h1 className="manga_section_title">What this site was built on</h1>
          <div className="pc_build_card">
            <img src={require('../assets/pc_pic.jpeg')} alt="PC Build" className="pc_pic" />
            <ul className="pc_build_list">
              <li><strong>CPU:</strong> AMD Ryzen 9 7900</li>
              <li><strong>GPU:</strong> NVIDIA GeForce RTX 3070</li>
              <li><strong>RAM:</strong> 32GB DDR5</li>
              <li><strong>Storage:</strong> 1TB NVMe SSD</li>
              <li><strong>Motherboard:</strong> MSI B650 Tomahawk</li>
            </ul>
          </div>
        </div>

        <div ref={deskRef} className="four_col_item fade_section">
          <h2 className="manga_section_title">Desk Setup</h2>
          <div className="desk_section">
            <ul className="desk_setup_list">
              <li><strong>Keyboard:</strong> royal kludge rk84</li>
              <li><strong>Mouse:</strong> razer basilisk x hyperspeed</li>
              <li><strong>Headset:</strong> skullcandy crusher anc 2</li>
              <li><strong>Monitors:</strong> 27" acer 1440p + secondary vertical</li>
              <li><strong>Desk:</strong> wooden desk I got off fb marketplace</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="extras_grid">
        <div ref={blogRef} className="blog_section fade_section">
          <h1 className="manga_section_title">Notes</h1>
          <p className="blog_intro">Short words whenever I feel like it</p>
          <div className="blog_posts">
            {blogPosts.map((post, i) => (
              <article key={i} className="blog_post">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <p>{post.date}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={artworkRef} className="artwork_section fade_section">
          <h1 className="manga_section_title">Artwork</h1>
          <div className="artwork_card">
            <img src={require('../assets/pic_for_extras.png')} alt="Artwork preview" className="artwork_preview" />
            <div className="artwork_meta">
              <p>Sports Graphics, Website UI Ideas, Brand Redesigns, and more on here!</p>
              <a href={behanceUrl} target="_blank" rel="noreferrer" className="behance_button">View my Behance</a>
            </div>
          </div>
        </div>
      </div>


      <div className= 'EndButtonContainer'>
    <button className= 'projects_button' onClick={() => window.location.href = '/contact'}>
      <span className="text">Contact</span>
    </button>

    <button className= 'ToTopButton' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="text">Back to Top</span>
    </button>
    </div>


      <Footer />
    </div>
  );
};

export default Extras;
