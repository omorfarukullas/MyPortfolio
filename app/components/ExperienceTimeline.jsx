"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Timeline data
const timelineData = [
    {
        id: 1,
        type: 'education',
        title: 'United International University',
        subtitle: 'Bachelor of Science in Computer Science & Engineering',
        date: '2022 - Present',
        status: 'Currently pursuing',
        description: 'Pursuing comprehensive education in computer science fundamentals, software engineering, and advanced programming concepts.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        color: '#3b82f6',
        glowColor: 'rgba(59, 130, 246, 0.5)'
    },
    {
        id: 2,
        type: 'project',
        title: 'MediconnectBD',
        subtitle: 'Full Stack Developer',
        date: '2024 - Present',
        status: 'In Development',
        description: 'Building unified healthcare system connecting patients, doctors, and hospitals across Bangladesh.',
        tech: ['TypeScript', 'React', 'Node.js', 'MySQL'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        color: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.5)'
    },
    {
        id: 3,
        type: 'project',
        title: 'Resume Generator',
        subtitle: 'Developer',
        date: '2024',
        status: 'Completed',
        description: 'AOOP course project - GUI-based resume generator demonstrating OOP principles.',
        tech: ['Java', 'JavaFX'],
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        color: '#8b5cf6',
        glowColor: 'rgba(139, 92, 246, 0.5)'
    }
];

// Floating particle component
function TimelineParticle({ delay, duration }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, 20],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className="absolute left-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-cyber-purple to-neon-cyan blur-sm"
            style={{ transform: 'translateX(-50%)' }}
        />
    );
}

// Timeline Node Component
function TimelineNode({ item, index, isLast }) {
    const [nodeRef, isInView] = useScrollAnimation(0.2);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={nodeRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, z: -100 }}
            animate={isInView ? { opacity: 1, x: 0, z: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 50,
                damping: 20
            }}
            className="relative mb-16 last:mb-0"
        >
            <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}>
                {/* Timeline node indicator */}
                <div className="relative flex-shrink-0">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.3 : 1,
                            rotate: isHovered ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                        style={{
                            background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                            boxShadow: `0 0 30px ${item.glowColor}`,
                        }}
                    >
                        <div className="text-white">
                            {item.icon}
                        </div>
                    </motion.div>

                    {/* Pulse effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: item.color,
                        }}
                    />
                </div>

                {/* Content Card */}
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                    tabIndex={0}
                    animate={{
                        z: isHovered ? 50 : 0,
                        scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="flex-1 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 cursor-pointer outline-none ring-2 ring-transparent focus-visible:ring-neon-cyan"
                    style={{
                        transformStyle: "preserve-3d",
                        boxShadow: isHovered
                            ? `0 20px 60px ${item.glowColor}, 0 0 40px ${item.glowColor}`
                            : '0 10px 30px rgba(0, 0, 0, 0.3)',
                        borderColor: isHovered ? item.color : 'rgba(255, 255, 255, 0.1)',
                        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                    }}
                >
                    {/* Date badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                            border: `1px solid ${item.color}40`,
                        }}
                    >
                        {item.date}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.4 }}
                        className="text-2xl font-bold mb-1"
                        style={{
                            background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {item.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="text-foreground/70 mb-2 font-medium"
                    >
                        {item.subtitle}
                    </motion.p>

                    {/* Status */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.6 }}
                        className="text-sm text-foreground/50 mb-3"
                    >
                        {item.status}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.7 }}
                        className="text-foreground/80 mb-4 leading-relaxed"
                    >
                        {item.description}
                    </motion.p>

                    {/* Tech stack */}
                    {item.tech && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.2 + 0.8 }}
                            className="flex flex-wrap gap-2"
                        >
                            {item.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-foreground/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* Hover detail indicator */}
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-xs text-foreground/50 flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Hover to explore
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Main Component
export default function ExperienceTimeline() {
    const [timelineRef, isTimelineInView] = useScrollAnimation(0.1);
    const [titleRef, isTitleInView] = useScrollAnimation(0.2);

    return (
        <section id="experience" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0a0a0f] to-[#0f0a1a]" />
                <motion.div
                    animate={{ opacity: [0.2, 0.35, 0.2], x: [-100, 100, -100] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Title */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                            Experience
                        </span>
                    </h2>
                    <p className="text-foreground/60 text-sm sm:text-base">
                        My journey in tech and education
                    </p>
                </motion.div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Animated timeline line */}
                    <div className="absolute left-8 top-8 bottom-8 w-1 overflow-hidden">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-full h-full origin-top"
                            style={{
                                background: 'linear-gradient(180deg, #8b5cf6, #06b6d4)',
                                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                            }}
                        />

                        {/* Particles along the line */}
                        {[...Array(5)].map((_, i) => (
                            <TimelineParticle
                                key={i}
                                delay={i * 0.8}
                                duration={3 + i * 0.5}
                            />
                        ))}
                    </div>

                    {/* Timeline nodes */}
                    <div className="pl-24">
                        {timelineData.map((item, index) => (
                            <TimelineNode
                                key={item.id}
                                item={item}
                                index={index}
                                isLast={index === timelineData.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
