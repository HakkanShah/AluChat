
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EasterEggProps {
  isActive: boolean;
}

const LOGO_COUNT = 30; // Number of logos to display

export function EasterEgg({ isActive }: EasterEggProps) {
  const [logos, setLogos] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (isActive) {
      const newLogos = Array.from({ length: LOGO_COUNT }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `${Math.random() * 3 + 4}s`, // 4-7 seconds
          animationDelay: `${Math.random() * 2}s`, // 0-2 seconds delay
          transform: `scale(${Math.random() * 0.5 + 0.5})`, // 0.5x to 1x size
        };
        return (
          <Image
            key={i}
            src="/images/aluchat_icon.png"
            alt="AluChat Logo"
            width={80}
            height={80}
            className="absolute rounded-full opacity-0 animate-logo-rain pointer-events-none"
            style={style}
          />
        );
      });
      setLogos(newLogos);
    } else {
      // Clear logos when not active
      const timer = setTimeout(() => setLogos([]), 500); // Allow fade-out animation
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive && logos.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {logos}
    </div>
  );
}
