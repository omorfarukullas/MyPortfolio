"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Text, Billboard } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Import Icons
import {
    SiTypescript,
    SiJavascript,
    SiPython,
    SiHtml5,
    SiCss3,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiExpress,
    SiMysql,
    SiMongodb,
    SiGit,
} from 'react-icons/si';
import { FaJava, FaCode } from 'react-icons/fa';

// Combined consolidated data list for the carousel (12 items for symmetry)
const skillsList = [
    { name: "JavaScript", color: "#f7df1e", icon: SiJavascript, proficiency: 95, desc: "Modern ES6+, Async/Await, DOM manipulation." },
    { name: "React", color: "#61dafb", icon: SiReact, proficiency: 90, desc: "Hooks, Context, Redux, Performance optimization." },
    { name: "Next.js", color: "#ffffff", icon: SiNextdotjs, proficiency: 85, desc: "SSR, ISR, App Router, Full-stack features." },
    { name: "TypeScript", color: "#3178c6", icon: SiTypescript, proficiency: 90, desc: "Strict typing, Interfaces, Generics." },
    { name: "Node.js", color: "#339933", icon: SiNodedotjs, proficiency: 85, desc: "REST APIs, Event Loop, File System." },
    { name: "Python", color: "#3776ab", icon: SiPython, proficiency: 85, desc: "Data analysis, Scripting, Backend logic." },
    { name: "Java", color: "#f89820", icon: FaJava, proficiency: 80, desc: "OOP, Spring Boot, Enterprise applications." },
    { name: "HTML5", color: "#e34f26", icon: SiHtml5, proficiency: 95, desc: "Semantic markup, Accessibility, SEO." },
    { name: "CSS3", color: "#1572b6", icon: SiCss3, proficiency: 90, desc: "Flexbox, Grid, Animations, Responsive design." },
    { name: "MySQL", color: "#4479a1", icon: SiMysql, proficiency: 85, desc: "Relational design, Complex queries, Optimization." },
    { name: "MongoDB", color: "#47a248", icon: SiMongodb, proficiency: 80, desc: "NoSQL schema design, Aggregation pipelines." },
    { name: "Git", color: "#f05032", icon: SiGit, proficiency: 90, desc: "Version control, branching strategies, CI/CD basic." },
];

/**
 * 3D Carousel Item (Billboard)
 */
function CarouselItem({ skill, index, total, activeIndex, setActiveIndex }) {
    const isActive = index === activeIndex;

    // Arrange in a circle on X-Z plane
    const radius = 14;
    const angleStep = (2 * Math.PI) / total;
    const baseAngle = index * angleStep;

    return (
        <group
            rotation={[0, baseAngle, 0]} // Rotate around Y axis
            position={[0, 0, 0]}
        >
            {/* Push out to radius on Z axis? X axis? 
                Let's push to Z so 0 angle is front?
                Usually: X=sin, Z=cos. 
                Let's simply push Z: [0, 0, radius]
            */}
            <group position={[0, 0, radius]}>
                {/* Visual Card - Always faces center/camera thanks to parent rotation cancellation or Billboard */}
                {/* Since the parent group rotates Y, the child also rotates. 
                    To make it look at the center, we rotate it back PI? Or keep it facing OUT?
                    Usually items face OUT from center.
                    When they rotate to front (camera), they face the camera.
                */}
                <Html
                    transform
                    center
                    // No counter-rotation needed if we want them facing OUTWARD from center.
                    // When at front (Angle 0), they face +Z (Camera is at +Z looking -Z).
                    // So they need to face +Z.
                    distanceFactor={20}
                    zIndexRange={[100, 0]}
                >
                    <div
                        className={`
                            transition-all duration-700 ease-out cursor-pointer group
                            ${isActive ? 'scale-150 opacity-0' : 'scale-100 opacity-80 hover:opacity-100 hover:scale-110'} 
                        `}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* 
                           Inactive Card Design: Big Logo 
                        */}
                        <div
                            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md transition-all duration-500"
                            style={{
                                borderColor: isActive ? skill.color : 'rgba(255,255,255,0.1)',
                                boxShadow: isActive ? `0 0 30px ${skill.color}` : '0 10px 30px rgba(0,0,0,0.3)',
                                transform: `translateY(${isActive ? -20 : 0}px)` // Float up if active? Active is hidden anyway.
                            }}
                        >
                            <skill.icon size={60} color={skill.color} className="drop-shadow-lg" />
                            {/* Reflection/Shine effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    );
}

function CarouselScene({ activeIndex, setActiveIndex }) {
    const groupRef = useRef();

    // Rotate the entire carousel on Y-axis to bring active item to FRONT
    const angleStep = (2 * Math.PI) / skillsList.length;
    // We want the active index to be at angle 0 (Front).
    // So we rotate the group by -index * angleStep.
    const targetRotation = -activeIndex * angleStep;

    useFrame((state, delta) => {
        if (groupRef.current) {
            // SMOOTHER ROTATION (Reduced speed factor from 3 to 2 for grace)
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, delta * 2);
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 10, 20]} intensity={1} />
            <spotLight position={[0, 20, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

            <group ref={groupRef} rotation={[0, 0, 0]}>
                {skillsList.map((skill, i) => (
                    <CarouselItem
                        key={skill.name}
                        skill={skill}
                        index={i}
                        total={skillsList.length}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                ))}
            </group>

            {/* Platform / Floor Reflection */}
            <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#000" transparent opacity={0.5} roughness={0.1} metalness={0.8} />
            </mesh>
        </>
    );
}

// --- CENTRAL DISPLAY (Active Card) ---
function ActiveSkillCard({ skill }) {
    const Icon = skill.icon;

    return (
        <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            exit={{ opacity: 0, scale: 0.8, z: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
            {/* CHANGED: Highly transparent glass background instead of dark opacity to fix 'black box' issue */}
            <div className="relative bg-transparent border-none p-8 rounded-3xl max-w-lg w-full text-center pointer-events-auto transform transition-all duration-500">

                {/* Glowing Backdrop - Reduced opacity */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-20 blur-3xl transition-colors duration-500"
                    style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                />

                {/* Big Icon - Centered at Top - MAXIMUM VISIBILITY */}
                <div className="relative z-10 mx-auto mb-6">
                    {/* Remove dark background from icon container, use pure glow */}
                    <div
                        className="inline-block p-6 rounded-full bg-white/5 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                        style={{
                            boxShadow: `0 0 50px ${skill.color}`,
                            background: `radial-gradient(circle, ${skill.color}22, transparent)`
                        }}
                    >
                        <Icon size={120} color={skill.color} style={{ filter: `drop-shadow(0 0 20px ${skill.color})` }} />
                    </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-4xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)] tracking-wide">
                    {skill.name}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-white/70 mb-8 text-base leading-relaxed max-w-sm mx-auto">
                    {skill.desc}
                </p>

                {/* Progress Bar with Small Logo next to it (Requested Feature) */}
                <div className="relative z-10 flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                    {/* Small sidebar logo */}
                    <div className="p-2 rounded-lg bg-black/40">
                        <Icon size={24} color={skill.color} />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold text-white/80 mb-1 uppercase tracking-wider">
                            <span>Proficiency</span>
                            <span>{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 1.0, ease: "easeOut" }}
                                className="h-full rounded-full relative"
                                style={{ backgroundColor: skill.color }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

// --- MOBILE (Static Wheel Fallback) ---
function MobileCircularSkills() {
    return (
        <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center pointer-events-none">
            {/* Center Label */}
            <div className="absolute z-10 text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-[family-name:var(--font-orbitron)]">
                    Tech<br />Stack
                </h3>
            </div>
            {/* Simple static ring for mobile */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '20s' }}>
                {skillsList.map((skill, i) => {
                    const angle = (i / skillsList.length) * 2 * Math.PI;
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                        <div
                            key={skill.name}
                            className="absolute top-1/2 left-1/2 -ml-4 -mt-4 w-8 h-8 flex items-center justify-center"
                            style={{ transform: `translate(${x}px, ${y}px) rotate(${-angle}rad)` }} // Counter-rotate?
                        >
                            <skill.icon size={20} color={skill.color} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

// --- NEW SCROLLING LIST (Below Canvas) ---
function ScrollingSkillsList() {
    return (
        <div className="w-full mt-8 overflow-hidden relative">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />

            <div className="flex gap-4 animate-scroll whitespace-nowrap py-4">
                {/* Double the list for seamless loop */}
                {[...skillsList, ...skillsList].map((skill, i) => (
                    <div
                        key={`${skill.name}-${i}`}
                        className="inline-flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors min-w-[120px]"
                    >
                        <skill.icon size={24} color={skill.color} />
                        <span className="text-sm font-bold text-white/90">{skill.name}</span>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }} />
                        </div>
                        <span className="text-[10px] text-white/50">{skill.proficiency}%</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 15s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-scroll {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
}


export default function SkillsOrbit() {
    const [isMobile, setIsMobile] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [titleRef, isTitleInView] = useScrollAnimation(0.2);
    const [activeIndex, setActiveIndex] = useState(0);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Auto-rotation (disabled if user prefers reduced motion)
        let interval;
        if (!prefersReducedMotion) {
            interval = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % skillsList.length);
            }, 5000);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            if (interval) clearInterval(interval);
        };
    }, [prefersReducedMotion]);

    if (!mounted) return null;

    const activeSkill = skillsList[activeIndex];

    return (
        <section id="skills" className="relative min-h-screen py-20 px-4 overflow-hidden bg-[#030014] flex flex-col items-center">
            {/* Standard Background Grid Pattern (matching Hero/About) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* SECTION HEADER - Consistent Style - FORCED VISIBLE */}
            <div
                className="relative z-10 text-center mb-12 max-w-4xl mx-auto pt-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 theme-transition hover:bg-white/10">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="text-sm text-white/70 font-medium tracking-wide">Technical Proficiency</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-orbitron)] mb-6">
                    <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                        Professional
                    </span>
                    <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent ml-3 animate-gradient uppercase">
                        Skills
                    </span>
                </h2>

                <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                    A comprehensive overview of the technologies and tools I've mastered to build scalable, high-performance applications.
                </p>
            </div>

            <div className="flex-1 w-full max-w-[1600px] mx-auto relative rounded-3xl overflow-hidden min-h-[500px] flex flex-col">

                {/* 3D CAROUSEL */}
                <div className="relative flex-1 min-h-[400px]">
                    {isMobile ? (
                        /* Mobile Fallback (Unchanged from prev iteration essentially, just ensuring clean render) */
                        <div className="flex items-center justify-center h-full">
                            <div className="relative w-full aspect-square max-w-xs mx-auto animate-spin-slow" style={{ animationDuration: '30s' }}>
                                {skillsList.map((skill, i) => {
                                    const angle = (i / skillsList.length) * 2 * Math.PI;
                                    const radius = 100;
                                    const x = Math.cos(angle) * radius;
                                    const y = Math.sin(angle) * radius;
                                    return (
                                        <div
                                            key={skill.name}
                                            className="absolute top-1/2 left-1/2 -ml-5 -mt-5 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10"
                                            style={{ transform: `translate(${x}px, ${y}px) rotate(${-angle}rad)` }}
                                        >
                                            <skill.icon size={20} color={skill.color} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent opacity-80">
                                    Spinning<br />Wheel
                                </h3>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 z-0">
                                <Canvas camera={{ position: [0, 5, 28], fov: 35 }} dpr={[1, 2]}>
                                    <Suspense fallback={null}>
                                        {/* Rotating Scene */}
                                        <CarouselScene activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                                        {/* Removed fog to ensure clarity */}
                                    </Suspense>
                                </Canvas>
                            </div>

                            <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
                                <AnimatePresence mode='wait'>
                                    <ActiveSkillCard skill={activeSkill} />
                                </AnimatePresence>
                            </div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                                {skillsList.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* VISIBLE LIST SECTION (Below Model) */}
                <div className="bg-black/20 backdrop-blur-sm border-t border-white/5 py-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-lg font-bold text-white/80 font-[family-name:var(--font-orbitron)]">Full Skillset</h3>
                            <div className="h-[1px] flex-1 bg-white/10" />
                        </div>
                        <ScrollingSkillsList />
                    </div>
                </div>

            </div>
        </section>
    );
}
