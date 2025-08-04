
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


// Function to play the "message sent" sound
export const playSendSound = () => {
    const context = getAudioContext();
    if (!context) return;

    // Resume context if it's in a suspended state (required by modern browsers)
    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine'; // A simple, clean tone
    oscillator.frequency.setValueAtTime(600, context.currentTime); // Higher pitch for sending
    gainNode.gain.setValueAtTime(0.1, context.currentTime); // Start with a low volume

    // Fade out quickly
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
};

// Function to play the "message received" sound
export const playReceiveSound = () => {
    const context = getAudioContext();
    if (!context) return;
    
    // Resume context if it's in a suspended state
    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'triangle'; // A slightly softer tone
    oscillator.frequency.setValueAtTime(440, context.currentTime); // Standard A4 pitch for receiving
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    // A slightly different fade-out curve
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
};
