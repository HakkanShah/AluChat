
"use client";

import { useEffect, useState } from 'react';

interface LoveEasterEggProps {
  isActive: boolean;
}

const emojis = ['💋', '♥️', '❣️', '😘', '🥰', '😍', '💞', '💓'];

export function LoveEasterEgg({ isActive }: LoveEasterEggProps) {
  const [elements, setElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      setElements([]); 
      
      let key = 0;
      intervalId = setInterval(() => {
        const style = {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `1s`,
          transform: `scale(${Math.random() * 0.8 + 0.8})`, // 0.8x to 1.6x size
          fontSize: `${Math.random() * 2 + 1.5}rem`, // 1.5rem to 3.5rem
        };

        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        const newElement = (
          <span
            key={key}
            className="absolute opacity-0 animate-emoji-pop pointer-events-none"
            style={style}
          >
            {emoji}
          </span>
        );
        
        setElements(prev => [...prev, newElement]);
        key++;

      }, 150);

      setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
      }, 4800);

    } else {
        const timer = setTimeout(() => setElements([]), 1000);
        return () => clearTimeout(timer);
    }
    
    return () => {
        if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);


  if (elements.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {elements}
    </div>
  );
}

    