"use client";

import { useState, useCallback, useRef, useEffect, createContext, useContext } from 'react';

// Sound Context
const SoundContext = createContext({
    isEnabled: false,
    toggleSound: () => { },
    playSound: (type) => { },
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const audioContextRef = useRef(null);

    // Initialize Audio Context on demand
    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    // Load preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('soundEnabled');
        if (saved === 'true') {
            setIsEnabled(true);
            initAudioContext();
        }
    }, [initAudioContext]);

    // Toggle logic
    const toggleSound = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        localStorage.setItem('soundEnabled', newState);
        if (newState) initAudioContext();
    };

    // Synthetic Sound Generators
    const playSound = useCallback((type) => {
        if (!isEnabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                // Soft whoosh (filtered noise or soft sine sweep)
                // Using sine sweep for simplicity
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'click':
                // Pop sound
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'success':
                // Major arpeggio
                const frequencies = [440, 554, 659]; // A4, C#5, E5
                frequencies.forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'sine';
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0.05, now + i * 0.05);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
                    o.start(now + i * 0.05);
                    o.stop(now + i * 0.05 + 0.3);
                });
                break;

            case 'error':
                // Low buzz
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'swoosh':
                // Noise burst for transition (simulated)
                // Web Audio noise is complex, simulating with fast frequency sweep
                osc.type = 'square';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
                gainNode.gain.setValueAtTime(0.03, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            default:
                break;
        }
    }, [isEnabled]);

    return (
        <SoundContext.Provider value={{ isEnabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

// Hook usage: const { playSound } = useSound();
