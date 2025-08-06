
"use client";

// This file uses the Web Audio API to generate sounds programmatically,
// so we don't need to store and serve any audio files.

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window !== 'undefined') {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser");
                return null;
            }
        }
        return audioContext;
    }
    return null;
}


// Function to play the "message sent" sound - a short, high-pitched "tick"
export const playSendSound = () => {
    const context = getAudioContext();
    if (!context) return;

    // Resume context if it's in a suspended state (required by modern browsers)
    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'triangle'; 
    oscillator.frequency.setValueAtTime(880, context.currentTime); // Higher pitch for sending (A5)
    gainNode.gain.setValueAtTime(0.08, context.currentTime); // Start with a low volume

    // Fade out very quickly
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.15);
};

// Function to play the "message received" sound - a softer, lower-pitched "bloop"
export const playReceiveSound = () => {
    const context = getAudioContext();
    if (!context) return;
    
    // Resume context if it's in a suspended state
    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine'; // A softer, cleaner tone
    oscillator.frequency.setValueAtTime(523.25, context.currentTime); // C5 pitch for receiving
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    // A slightly longer fade-out curve
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.25);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.25);
};


// Function to play the easter egg "pop" sound continuously
export const playAluChopSound = () => {
    const context = getAudioContext();
    if (!context) return;

    if (context.state === 'suspended') {
        context.resume();
    }
    
    const playPop = () => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const now = context.currentTime;

        oscillator.type = 'sine';
        const randomPitch = 200 + Math.random() * 300; // Pitch between 200Hz and 500Hz
        oscillator.frequency.setValueAtTime(randomPitch, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    };

    const intervalId = setInterval(playPop, 120 + Math.random() * 80);

    // Stop the sounds after 5 seconds
    setTimeout(() => {
        clearInterval(intervalId);
    }, 4800); // Stop slightly before the visual animation ends
};

