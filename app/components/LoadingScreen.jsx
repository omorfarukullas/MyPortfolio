"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
    const [loadingStage, setLoadingStage] = useState('particles'); // particles, name, subtitle, loading, complete
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Set window size and generate particles on client side
        if (typeof window !== 'undefined') {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });

            // Generate particle positions
            const newParticles = [...Array(50)].map(() => ({
                startX: Math.random() * window.innerWidth,
                startY: Math.random() * window.innerHeight,
                endX: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                endY: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
            }));
            setParticles(newParticles);
        }
    }, []);

    useEffect(() => {
        // Check if user has visited before
        const hasVisited = localStorage.getItem('hasVisitedPortfolio');
        if (hasVisited) {
            // Skip loading screen if already visited
            setIsVisible(false);
            onComplete();
            return;
        }

        // Stage 1: Particles (300ms)
        const particlesTimer = setTimeout(() => {
            setLoadingStage('name');
        }, 300);

        // Stage 2: Name (100ms after particles)
        const nameTimer = setTimeout(() => {
            setLoadingStage('subtitle');
        }, 400);

        // Stage 3: Subtitle (50ms after name)
        const subtitleTimer = setTimeout(() => {
            setLoadingStage('loading');
        }, 450);

        // Stage 4: Loading bar (Fast progress)
        const loadingTimer = setTimeout(() => {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10; // Much faster steps
                });
            }, 16); // ~60fps interval

            return () => clearInterval(interval);
        }, 450);

        return () => {
            clearTimeout(particlesTimer);
            clearTimeout(nameTimer);
            clearTimeout(subtitleTimer);
            clearTimeout(loadingTimer);
        };
    }, [onComplete]);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                setLoadingStage('complete');
                setIsVisible(false);
                localStorage.setItem('hasVisitedPortfolio', 'true');
                onComplete();
            }, 100); // Fast exit
        }
    }, [progress, onComplete]);

    const handleSkip = () => {
        setIsVisible(false);
        localStorage.setItem('hasVisitedPortfolio', 'true');
        onComplete();
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                onClick={handleSkip}
                className="fixed inset-0 z-[9999] bg-[#0F172A] flex items-center justify-center cursor-pointer overflow-hidden"
            >
                {/* Particle Background */}
                <div className="absolute inset-0">
                    {particles.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyber-purple rounded-full"
                            initial={{
                                x: particle.startX,
                                y: particle.startY,
                                opacity: 0,
                            }}
                            animate={
                                loadingStage === 'particles'
                                    ? {
                                        x: [particle.startX, particle.endX],
                                        y: [particle.startY, particle.endY],
                                        opacity: [0, 1, 1],
                                        scale: [0, 1, 1],
                                    }
                                    : {
                                        opacity: 0,
                                        scale: 0,
                                    }
                            }
                            transition={{
                                duration: 0.18,
                                delay: i * 0.005,
                                ease: 'easeOut',
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center px-4">
                    {/* Name Assembly */}
                    {(loadingStage === 'name' || loadingStage === 'subtitle' || loadingStage === 'loading') && (
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-[family-name:var(--font-orbitron)]"
                        >
                            <span className="inline-block">
                                {'OMOR FARUK ULLAS'.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 50, rotateX: 90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{
                                            duration: 0.18,
                                            delay: index * 0.01,
                                            ease: 'easeOut',
                                        }}
                                        className="inline-block bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent"
                                        style={{
                                            backgroundSize: '200% auto',
                                        }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </span>
                        </motion.h1>
                    )}

                    {/* Subtitle */}
                    {(loadingStage === 'subtitle' || loadingStage === 'loading') && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, delay: 0.05, ease: 'easeOut' }}
                            className="text-lg sm:text-xl md:text-2xl text-neon-cyan mb-8"
                        >
                            Full Stack Developer
                        </motion.p>
                    )}

                    {/* Loading Bar */}
                    {loadingStage === 'loading' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, delay: 0.1, ease: 'easeOut' }}
                            className="w-full max-w-md mx-auto"
                        >
                            {/* Progress Bar */}
                            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                                <motion.div
                                    className="absolute inset-y-0 left-0"
                                    style={{
                                        background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                                    }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                />

                                {/* Glow effect at progress point */}
                                <motion.div
                                    className="absolute top-0 h-full w-20 blur-xl"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                                        left: `${progress}%`,
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            </div>

                            {/* Percentage */}
                            <div className="text-center">
                                <motion.span
                                    className="text-2xl font-bold bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent font-mono"
                                    key={progress}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.1, ease: 'easeOut' }}
                                >
                                    {progress}%
                                </motion.span>
                            </div>
                        </motion.div>
                    )}

                    {/* Skip Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.1, duration: 0.18, ease: 'easeOut' }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/40"
                    >
                        Click anywhere to skip
                    </motion.p>
                </div>

                {/* Ambient glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
        </AnimatePresence>
    );
}
