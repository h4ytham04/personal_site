import { useEffect, useState } from 'react';

// reveals text one character at a time, finishing a long line in about 2s
export default function useTypewriter(text) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let n = 0;
    setTyped('');
    const step = Math.max(6, Math.min(24, 2000 / text.length));
    const timer = setInterval(() => {
      n += 1;
      setTyped(text.slice(0, n));
      if (n >= text.length) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [text]);

  return typed;
}
