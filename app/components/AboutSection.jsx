"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useMobile } from '../hooks/useMobile';

// Card data
const cards = [
    {
        id: 1,
        title: "Who I Am",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        ),
        points: [
            "Student at United International University",
            "CSE undergraduate passionate about innovation",
            "Building solutions for real-world problems"
        ],
        floatDelay: 0,
        floatDuration: 6,
        direction: "left"
    },
    {
        id: 2,
        title: "What I Do",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        points: [
            "Full Stack Developer (React, Node.js, TypeScript)",
            "Currently building MediconnectBD - smart healthcare system",
            "Love open source and healthcare tech"
        ],
        floatDelay: 0.8,
        floatDuration: 7,
        direction: "bottom"
    },
    {
        id: 3,
        title: "Beyond Code",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C12 2 14.5 5 14.5 12S12 22 12 22M12 2C12 2 9.5 5 9.5 12S12 22 12 22M2 12h20" />
            </svg>
        ),
        points: [
            "Passionate football analyst ⚽",
            "Love playing football",
            "Looking to collaborate on innovative projects"
        ],
        floatDelay: 1.6,
        floatDuration: 6.5,
        direction: "right"
    }
];

// Floating particles for background
function FloatingParticles() {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        setMounted(true);
        setParticles(
            Array.from({ length: 30 }, (_, i) => ({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 15 + 15,
                delay: Math.random() * 2,
                opacity: Math.random() * 0.3 + 0.1,
            }))
        );
    }, []);

    if (!mounted) return null;

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
                        background: particle.id % 2 === 0
                            ? 'rgba(139, 92, 246, 0.6)'
                            : 'rgba(6, 182, 212, 0.6)',
                        boxShadow: particle.id % 2 === 0
                            ? '0 0 10px rgba(139, 92, 246, 0.4)'
                            : '0 0 10px rgba(6, 182, 212, 0.4)',
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    );
}

// Floating Card Component
function FloatingCard({ card, index, mousePosition, isMobile }) {
    const [cardRef, isInView] = useScrollAnimation(0.2);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth magnetic effect with gentler springs
    const magneticX = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
    const magneticY = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });

    useEffect(() => {
        if (isMobile) return; // Disable magnetic effect on mobile

        if (cardRef.current && mousePosition.x !== 0) {
            const rect = cardRef.current.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const distanceX = mousePosition.x - cardCenterX;
            const distanceY = mousePosition.y - cardCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < 400) {
                const strength = (400 - distance) / 400;
                magneticX.set(distanceX * strength * 0.08);
                magneticY.set(distanceY * strength * 0.08);
            } else {
                magneticX.set(0);
                magneticY.set(0);
            }
        }
    }, [mousePosition, magneticX, magneticY, isMobile]);

    // Smoother entry animation variants
    const entryVariants = {
        hidden: {
            opacity: 0,
            x: card.direction === "left" && !isMobile ? -80 : card.direction === "right" && !isMobile ? 80 : 0,
            y: card.direction === "bottom" || isMobile ? 80 : 0,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 20,
                mass: 1,
                delay: index * 0.15
            }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={entryVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
                x: magneticX,
                y: magneticY,
                willChange: 'transform',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            {/* Smooth floating animation wrapper */}
            <motion.div
                animate={{
                    y: isMobile ? [0, -6, 0] : [0, -12, 0], // Reduced float amplitude on mobile
                    rotate: isMobile ? 0 : [-0.5, 0.5, -0.5], // No rotation on mobile
                }}
                transition={{
                    duration: card.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.floatDelay,
                }}
            >
                {/* Card with glassmorphism */}
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                    tabIndex={0}
                    animate={{
                        y: isHovered && !isMobile ? -15 : 0,
                        scale: isHovered && !isMobile ? 1.03 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 0.8
                    }}
                    className={`
                        relative p-6 rounded-2xl
                        backdrop-blur-xl bg-white/[0.03]
                        border border-white/10
                        shadow-2xl
                        overflow-hidden
                        cursor-pointer
                        outline-none ring-2 ring-transparent focus-visible:ring-neon-cyan
                    `}
                    style={{
                        boxShadow: isHovered
                            ? '0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 40px rgba(6, 182, 212, 0.15)'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        borderColor: isHovered ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                        willChange: 'transform',
                    }}
                >
                    {/* Glow effect on hover */}
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 via-transparent to-neon-cyan/10 pointer-events-none"
                    />

                    {/* Animated corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-purple/30 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/30 rounded-br-2xl" />

                    {/* Card content */}
                    <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                            animate={{
                                rotate: isHovered ? [0, 5, -5, 0] : 0,
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-purple to-neon-cyan p-3 mb-4 text-white shadow-lg"
                            style={{
                                boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.5)',
                            }}
                        >
                            {card.icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent">
                            {card.title}
                        </h3>

                        {/* Points */}
                        <ul className="space-y-3">
                            {card.points.map((point, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{
                                        delay: index * 0.15 + i * 0.1 + 0.3,
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"
                                >
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyber-purple to-neon-cyan flex-shrink-0"
                                    />
                                    {point}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Main AboutSection Component
export default function AboutSection() {
    const isMobile = useMobile();
    const [sectionRef, isInView] = useScrollAnimation(0.1);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isMobile) return; // Skip mouse listener on mobile
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f]"
        >
            {/* Futuristic Background */}
            <div className="absolute inset-0 z-0">
                {/* Deep space gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1a] to-[#0a0f1a]" />

                {/* Animated grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Perspective grid floor */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30"
                    style={{
                        background: `
                            linear-gradient(to top, 
                                rgba(6, 182, 212, 0.1) 0%,
                                transparent 100%
                            )
                        `,
                        maskImage: 'linear-gradient(to top, black, transparent)',
                        WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
                    }}
                />

                {/* Glowing orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyber-purple/20 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-cyan/15 rounded-full blur-[120px]"
                />

                {/* Scanning line effect */}
                <motion.div
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
                />

                {/* Floating particles */}
                <FloatingParticles />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]"
                    >
                        <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            About Me
                        </span>
                    </motion.h2>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center justify-center gap-4 mt-6"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyber-purple" />
                        <motion.div
                            animate={{
                                boxShadow: ['0 0 10px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(6, 182, 212, 0.8)', '0 0 10px rgba(6, 182, 212, 0.5)']
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-3 h-3 rounded-full bg-neon-cyan"
                        />
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-neon-cyan" />
                    </motion.div>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {cards.map((card, index) => (
                        <FloatingCard
                            key={card.id}
                            card={card}
                            index={index}
                            mousePosition={mousePosition}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>

            {/* CSS for gradient animation */}
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 4s ease infinite;
                }
            `}</style>
        </section>
    );
}
