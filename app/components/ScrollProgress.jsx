"use client";

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Smooth spring animation for progress
    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.5,
    });

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // Calculate scroll percentage
            const maxScroll = documentHeight - windowHeight;
            const progress = (scrollTop / maxScroll) * 100;

            setScrollProgress(Math.min(progress, 100));

            // Show only when scrolled past 50px
            setIsVisible(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Transform progress to gradient position
    const gradientPosition = useTransform(smoothProgress, [0, 100], [0, 100]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background track */}
            <div className="absolute inset-0 bg-white/5" />

            {/* Progress bar with gradient */}
            <motion.div
                className="absolute top-0 left-0 h-full origin-left"
                style={{
                    width: useTransform(smoothProgress, (value) => `${value}%`),
                    background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 50%, #06b6d4 100%)',
                }}
            >
                {/* Glow effect */}
                <div
                    className={`absolute inset-0 ${isMobile ? 'blur-[2px]' : 'blur-[4px]'}`}
                    style={{
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 50%, #06b6d4 100%)',
                        opacity: 0.8,
                    }}
                />

                {/* Extra glow at the end point */}
                <motion.div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 ${isMobile ? 'w-6 h-6 blur-sm' : 'w-10 h-10 blur-md'
                        } rounded-full`}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
                    }}
                />
            </motion.div>

            {/* Percentage indicator circle */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                    left: useTransform(smoothProgress, (value) => `${value}%`),
                    x: '-50%',
                }}
            >
                {/* Outer glow ring */}
                <motion.div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'
                        } rounded-full`}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                    }}
                />

                {/* Main circle */}
                <motion.div
                    className={`relative ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} rounded-full`}
                    style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                        boxShadow: isMobile
                            ? '0 0 6px rgba(6, 182, 212, 0.8)'
                            : '0 0 10px rgba(6, 182, 212, 1), 0 0 20px rgba(139, 92, 246, 0.5)',
                    }}
                />

                {/* Particle trail effect */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-neon-cyan"
                    animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
