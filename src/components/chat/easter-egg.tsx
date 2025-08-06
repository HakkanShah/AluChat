
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EasterEggProps {
  isActive: boolean;
}

export function EasterEgg({ isActive }: EasterEggProps) {
  const [logos, setLogos] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      // Clear any existing logos before starting a new animation
      setLogos([]); 
      
      let key = 0;
      intervalId = setInterval(() => {
        const style = {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `1s`, // Quick pop animation
          transform: `scale(${Math.random() * 0.5 + 0.5})`, // 0.5x to 1x size
        };

        const newLogo = (
          <Image
            key={key}
            src="/images/aluchat_icon.png"
            alt="AluChat Logo"
            width={80}
            height={80}
            className="absolute rounded-full opacity-0 animate-logo-pop pointer-events-none"
            style={style}
          />
        );
        
        setLogos(prev => [...prev, newLogo]);
        key++;

      }, 150); // Add a new logo every 150ms

      // Stop creating logos after ~4.8 seconds
      setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
      }, 4800);

    } else {
        // When not active, clear out the logos after the animation finishes
        const timer = setTimeout(() => setLogos([]), 1000);
        return () => clearTimeout(timer);
    }
    
    return () => {
        if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);


  if (logos.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {logos}
    </div>
  );
}
