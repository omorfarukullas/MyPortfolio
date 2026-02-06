"use client";

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { usePerformance } from './PerformanceProvider';
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
import { FaJava } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { DiJava } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';

// Skill data with orbits
const skillsData = {
    languages: {
        category: "Languages",
        orbit: 3,
        speed: 1.5,
        skills: [
            { name: "TypeScript", color: "#3178c6", proficiency: 90, icon: SiTypescript },
            { name: "JavaScript", color: "#f7df1e", proficiency: 95, icon: SiJavascript },
            { name: "Python", color: "#3776ab", proficiency: 85, icon: SiPython },
            { name: "Java", color: "#f89820", proficiency: 80, icon: FaJava },
            { name: "HTML5", color: "#e34f26", proficiency: 95, icon: SiHtml5 },
            { name: "CSS3", color: "#1572b6", proficiency: 90, icon: SiCss3 },
        ]
    },
    frameworks: {
        category: "Frameworks",
        orbit: 5,
        speed: 1.0,
        skills: [
            { name: "React", color: "#61dafb", proficiency: 90, icon: SiReact },
            { name: "Next.js", color: "#ffffff", proficiency: 85, icon: SiNextdotjs },
            { name: "Node.js", color: "#339933", proficiency: 85, icon: SiNodedotjs },
            { name: "Express", color: "#888888", proficiency: 80, icon: SiExpress },
            { name: "JavaFX", color: "#f89820", proficiency: 75, icon: DiJava },
        ]
    },
    databases: {
        category: "Databases & Tools",
        orbit: 7,
        speed: 0.6,
        skills: [
            { name: "MySQL", color: "#4479a1", proficiency: 85, icon: SiMysql },
            { name: "MongoDB", color: "#47a248", proficiency: 80, icon: SiMongodb },
            { name: "Git", color: "#f05032", proficiency: 90, icon: SiGit },
            { name: "VS Code", color: "#007acc", proficiency: 95, icon: VscCode },
            { name: "REST API", color: "#8b5cf6", proficiency: 88, icon: TbApi },
        ]
    }
};

// Single Skill Orb Component
function SkillOrb({ skill, orbitRadius, orbitSpeed, index, totalInOrbit }) {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const angle = useRef((index / totalInOrbit) * Math.PI * 2);
    const floatOffset = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Orbit rotation (pause on hover)
        if (!hovered) {
            angle.current += delta * orbitSpeed * 0.1;
        }

        // Calculate position with float effect
        const x = Math.cos(angle.current) * orbitRadius;
        const z = Math.sin(angle.current) * orbitRadius;
        const floatY = Math.sin(state.clock.elapsedTime * 2 + floatOffset.current) * 0.2;

        groupRef.current.position.set(x, floatY, z);

        // Always face camera
        groupRef.current.lookAt(0, floatY, 0);
    });

    return (
        <group ref={groupRef}>
            {/* Icon and Label Display */}
            <Html
                center
                distanceFactor={6}
                zIndexRange={[100, 0]}
                style={{ pointerEvents: 'auto' }}
            >
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={`
                        flex flex-col items-center gap-2 p-4 rounded-2xl
                        bg-black/40 backdrop-blur-xl border border-white/20
                        transition-all duration-300 cursor-pointer
                        ${hovered ? 'scale-125 bg-black/60 border-white/40 shadow-2xl' : 'scale-100'}
                    `}
                    style={{
                        boxShadow: hovered
                            ? `0 0 40px ${skill.color}80, 0 0 80px ${skill.color}40`
                            : `0 0 20px ${skill.color}40`,
                        minWidth: '100px',
                    }}
                >
                    {/* Icon */}
                    <div
                        className="p-3 rounded-xl transition-all duration-300"
                        style={{
                            backgroundColor: `${skill.color}20`,
                            border: `2px solid ${skill.color}60`,
                        }}
                    >
                        <skill.icon
                            size={hovered ? 32 : 28}
                            color={skill.color}
                            style={{
                                filter: `drop-shadow(0 0 ${hovered ? 12 : 8}px ${skill.color})`,
                                transition: 'all 0.3s'
                            }}
                        />
                    </div>

                    {/* Skill Name */}
                    <div className="text-center">
                        <div
                            className="text-sm font-bold whitespace-nowrap"
                            style={{ color: skill.color }}
                        >
                            {skill.name}
                        </div>

                        {/* Proficiency on hover */}
                        {hovered && (
                            <div className="mt-2 w-full">
                                <div className="h-1.5 w-20 bg-white/20 rounded-full overflow-hidden mx-auto">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${skill.proficiency}%`,
                                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                            boxShadow: `0 0 8px ${skill.color}80`,
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-white/70 mt-1">
                                    {skill.proficiency}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Html>

            {/* Subtle glow sphere behind */}
            <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                    color={skill.color}
                    transparent
                    opacity={hovered ? 0.15 : 0.08}
                />
            </mesh>
        </group>
    );
}

// Orbit Ring Visual
function OrbitRing({ radius, color }) {
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        ));
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
        </line>
    );
}

// 3D Scene Component
function SkillsScene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[10, -10, 10]} intensity={0.5} color="#06b6d4" />

            {/* Center label */}
            <Html center>
                <div className="pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center"
                    >
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent font-[family-name:var(--font-orbitron)]">
                            Tech Stack
                        </div>
                    </motion.div>
                </div>
            </Html>

            {/* Orbit rings */}
            <OrbitRing radius={skillsData.languages.orbit} color="#3178c6" />
            <OrbitRing radius={skillsData.frameworks.orbit} color="#8b5cf6" />
            <OrbitRing radius={skillsData.databases.orbit} color="#47a248" />

            {/* Languages orbit (inner) */}
            {skillsData.languages.skills.map((skill, index) => (
                <SkillOrb
                    key={`lang-${skill.name}`}
                    skill={skill}
                    orbitRadius={skillsData.languages.orbit}
                    orbitSpeed={skillsData.languages.speed}
                    index={index}
                    totalInOrbit={skillsData.languages.skills.length}
                />
            ))}

            {/* Frameworks orbit (middle) */}
            {skillsData.frameworks.skills.map((skill, index) => (
                <SkillOrb
                    key={`fw-${skill.name}`}
                    skill={skill}
                    orbitRadius={skillsData.frameworks.orbit}
                    orbitSpeed={skillsData.frameworks.speed}
                    index={index}
                    totalInOrbit={skillsData.frameworks.skills.length}
                />
            ))}

            {/* Databases orbit (outer) */}
            {skillsData.databases.skills.map((skill, index) => (
                <SkillOrb
                    key={`db-${skill.name}`}
                    skill={skill}
                    orbitRadius={skillsData.databases.orbit}
                    orbitSpeed={skillsData.databases.speed}
                    index={index}
                    totalInOrbit={skillsData.databases.skills.length}
                />
            ))}

            {/* Camera controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}

// Mobile 2D Fallback
function MobileSkillsView() {
    const allSkills = [
        ...skillsData.languages.skills,
        ...skillsData.frameworks.skills,
        ...skillsData.databases.skills,
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-8">
            {allSkills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="relative group"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center hover:border-white/30 transition-all duration-300">
                        <div
                            className="w-12 h-12 mx-auto mb-3 rounded-full"
                            style={{
                                backgroundColor: skill.color,
                                boxShadow: `0 0 20px ${skill.color}40`,
                            }}
                        />
                        <div className="text-sm font-semibold text-white mb-2">{skill.name}</div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.proficiency}%` }}
                                transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-cyber-purple to-neon-cyan"
                            />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// Main Component
export default function SkillsOrbit() {
    const [isMobile, setIsMobile] = useState(false);
    const { isReduced } = usePerformance();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="skills" className="relative min-h-screen py-20 px-4 overflow-hidden bg-[#0a0a0f]">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0a0a0f] to-[#0f0a1a]" />
                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h2>
                    <p className="text-foreground/60 text-sm sm:text-base">
                        {isMobile ? "My Tech Stack" : "Hover over skills to see proficiency"}
                    </p>
                </motion.div>

                {/* 3D Canvas or Mobile View */}
                {!isMobile ? (
                    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                        <Canvas
                            camera={{ position: [0, 8, 15], fov: 60 }}
                            gl={{ antialias: true, alpha: true }}
                        >
                            <Suspense fallback={null}>
                                <SkillsScene />
                            </Suspense>
                        </Canvas>
                    </div>
                ) : (
                    <MobileSkillsView />
                )}

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-foreground/60"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#3178c6]" />
                        <span>Languages</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                        <span>Frameworks</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#47a248]" />
                        <span>Tools & DBs</span>
                    </div>
                </motion.div>

                {/* Skills Breakdown Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 space-y-12"
                >
                    {/* Languages */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#3178c6] to-transparent rounded-full" />
                            <span className="bg-gradient-to-r from-[#3178c6] to-[#1572b6] bg-clip-text text-transparent">
                                Languages
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skillsData.languages.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-[#3178c6]/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {skill.icon && <skill.icon size={20} color={skill.color} className="drop-shadow-sm" />}
                                            <span className="font-semibold text-white">{skill.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#3178c6]">{skill.proficiency}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                                boxShadow: `0 0 10px ${skill.color}80`,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Frameworks & Tools */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#8b5cf6] to-transparent rounded-full" />
                            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#61dafb] bg-clip-text text-transparent">
                                Frameworks & Tools
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skillsData.frameworks.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-[#8b5cf6]/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {skill.icon && <skill.icon size={20} color={skill.color} className="drop-shadow-sm" />}
                                            <span className="font-semibold text-white">{skill.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#8b5cf6]">{skill.proficiency}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                                boxShadow: `0 0 10px ${skill.color}80`,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Databases & Tools */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#47a248] to-transparent rounded-full" />
                            <span className="bg-gradient-to-r from-[#47a248] to-[#4479a1] bg-clip-text text-transparent">
                                Databases & Tools
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skillsData.databases.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-[#47a248]/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {skill.icon && <skill.icon size={20} color={skill.color} className="drop-shadow-sm" />}
                                            <span className="font-semibold text-white">{skill.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-[#47a248]">{skill.proficiency}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                                                boxShadow: `0 0 10px ${skill.color}80`,
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
