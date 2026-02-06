"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Particle component for CSS-based background
function CSSParticles() {
    const [particles, setParticles] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Set mounted flag and generate particles only on the client side
        setIsMounted(true);
        setParticles(
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                size: Math.random() * 4 + 2,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 10 + 5,
                delay: Math.random() * 2,
                xOffset: Math.random() * 20 - 10,
                color: i % 2 === 0 ? '#8B5CF6' : '#06B6D4',
            }))
        );
    }, []);

    // Don't render particles until client-side mount to avoid hydration mismatch
    if (!isMounted) {
        return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, particle.xOffset, 0],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Main FloatingHero Component (Simplified 2D version)
export default function FloatingHeroSimple() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const controls = useAnimation();
    const [contentRef, isContentInView] = useScrollAnimation(0.2);

    useEffect(() => {
        setIsMounted(true);
        controls.start({ opacity: 1, y: 0 });

        let animationFrameId;

        const handleMouseMove = (e) => {
            if (animationFrameId) return;

            animationFrameId = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                setMousePosition({ x, y });
                animationFrameId = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [controls]);

    return (
        <div id="home" className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center">
            {/* Gradient Glow Effect */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 1, // Snappier pulse
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] bg-cyber-purple/30 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: 0.1,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-neon-cyan/30 rounded-full blur-[80px]"
                />
            </div>

            {/* Particle Background */}
            <CSSParticles />

            {/* Main Text Content with Scroll Animation */}
            <motion.div
                ref={contentRef}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isContentInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                className="relative z-10 text-center px-4"
            >
                {/* Name Text with Animation */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.18, delay: 0.02, ease: 'easeOut' }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative"
                    >
                        <span className="relative inline-block">
                            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyber-purple to-neon-cyan opacity-50" />
                            <span className="relative bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent animate-gradient">
                                OMOR FARUK
                            </span>
                        </span>
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.18, delay: 0.05, ease: 'easeOut' }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold relative"
                    >
                        <span className="relative inline-block">
                            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-neon-cyan to-cyber-purple opacity-50" />
                            <span className="relative bg-gradient-to-r from-neon-cyan via-cyber-purple to-neon-cyan bg-clip-text text-transparent animate-gradient">
                                ULLAS
                            </span>
                        </span>
                    </motion.h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.18, delay: 0.1, ease: 'easeOut' }}
                    className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light tracking-wider"
                >
                    Developer • Designer • Creator
                </motion.p>

                {/* Decorative Lines */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.18, delay: 0.15, ease: 'easeOut' }}
                    className="mt-8 flex items-center justify-center gap-4"
                >
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.18, ease: 'easeOut' }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-cyber-purple rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                </motion.div>
            </motion.div>

            {/* Add custom CSS for gradient animation */}
            <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </div>
    );
}
