import { useEffect, useRef } from 'react';

export const isCompactScreen = () => window.matchMedia('(max-width: 900px)').matches;

// on the stacked mobile layout the card list scrolls sideways, so keep the selected card in view
export const revealActive = (selector) => {
  if (!isCompactScreen()) return;
  document.querySelector(selector)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
};

// horizontal swipe anywhere on the page, except inside elements marked data-noswipe
export default function useSwipe(onPrev, onNext) {
  const handlers = useRef({});
  handlers.current = { onPrev, onNext };

  useEffect(() => {
    let sx = 0;
    let sy = 0;
    let ignore = false;

    const start = (e) => {
      ignore = !!e.target.closest?.('[data-noswipe]');
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const end = (e) => {
      if (ignore) return;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dy) < Math.abs(dx) * 0.6) {
        (dx < 0 ? handlers.current.onNext : handlers.current.onPrev)();
      }
    };

    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
    };
  }, []);
}
