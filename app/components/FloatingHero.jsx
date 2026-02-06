"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useMobile } from '../hooks/useMobile';

// Particle component for background
function Particles({ count = 100 }) {
    const mesh = useRef();
    const light = useRef();

    // Generate random positions and colors for particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 40 - 20;
            const y = Math.random() * 40 - 20;
            const z = Math.random() * 40 - 20;

            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { factor, speed, x, y, z } = particle;

            // Update particle time
            const t = (particle.time += speed);

            // Oscillate position
            dummy.position.set(
                x + Math.cos(t) * factor / 10,
                y + Math.sin(t * 2) * factor / 10,
                z + Math.cos(t) * factor / 10
            );

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color="#8B5CF6"
                    emissive="#8B5CF6"
                    emissiveIntensity={0.5}
                    roughness={0.5}
                />
            </instancedMesh>
        </>
    );
}

// 3D Text Component with floating effect
function FloatingText({ mousePosition }) {
    const textRef = useRef();

    useFrame((state) => {
        if (textRef.current) {
            // Anti-gravity floating effect
            const time = state.clock.getElapsedTime();
            textRef.current.position.y = Math.sin(time * 0.5) * 0.3;

            // Mouse parallax effect
            textRef.current.rotation.x = mousePosition.y * 0.1;
            textRef.current.rotation.y = mousePosition.x * 0.1;
        }
    });

    return (
        <Center>
            <Float
                speed={2}
                rotationIntensity={0.2}
                floatIntensity={0.5}
            >
                <group ref={textRef}>
                    <Text3D
                        font="/fonts/helvetiker_bold.typeface.json"
                        size={0.8}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        OMOR FARUK
                        <meshStandardMaterial
                            color="#E2E8F0"
                            emissive="#8B5CF6"
                            emissiveIntensity={0.3}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </Text3D>
                    <Text3D
                        font="/fonts/helvetiker_bold.typeface.json"
                        size={0.8}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                        position={[0, -1.2, 0]}
                    >
                        ULLAS
                        <meshStandardMaterial
                            color="#E2E8F0"
                            emissive="#06B6D4"
                            emissiveIntensity={0.3}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </Text3D>
                </group>
            </Float>
        </Center>
    );
}

// Main Scene Component
function Scene({ mousePosition, isMobile }) {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
            <spotLight
                position={[0, 5, 0]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#8B5CF6"
            />

            {/* Particles - Reduced count on mobile */}
            <Particles count={isMobile ? 30 : 150} />

            {/* 3D Text - Only on Desktop */}
            {!isMobile && <FloatingText mousePosition={mousePosition} />}
        </>
    );
}

// Typing effect component
function TypingEffect({ text, delay = 0 }) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < text.length) {
                setDisplayText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }
        }, delay + currentIndex * 80);

        return () => clearTimeout(timer);
    }, [currentIndex, text, delay]);

    return (
        <span>
            {displayText}
            {currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-neon-cyan ml-1"
                />
            )}
        </span>
    );
}

// Social icon component
function SocialIcon({ href, icon, delay }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: [0, 5, -5, 0]
            }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, type: "spring", stiffness: 200 },
                rotate: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-purple/20 to-neon-cyan/20 backdrop-blur-sm border border-cyber-purple/30 flex items-center justify-center text-neon-cyan hover:text-cyber-purple hover:border-neon-cyan/50 transition-colors pointer-events-auto shadow-lg hover:shadow-neon-cyan/50"
        >
            {icon}
        </motion.a>
    );
}

// Main FloatingHero Component
export default function FloatingHero() {
    const isMobile = useMobile();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleScrollDown = () => {
        const nextSection = document.getElementById('about');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isMounted) return <div className="min-h-screen bg-transparent" />;

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Three.js Canvas */}
            <div className="absolute inset-0 z-10">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    style={{ background: 'transparent' }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Scene mousePosition={mousePosition} isMobile={isMobile} />
                </Canvas>
            </div>

            {/* Fallback for mobile - 2D text overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none md:hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center px-4"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent">
                            OMOR FARUK
                        </span>
                    </h1>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                            ULLAS
                        </span>
                    </h1>
                </motion.div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4">
                <div className="h-32 md:h-40" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-center mb-4"
                >
                    <h2 className="text-lg md:text-2xl font-medium text-white/90">
                        <TypingEffect
                            text="Full Stack Developer | CSE Student | Football Analyst ⚽"
                            delay={1500}
                        />
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5, duration: 0.8 }}
                    className="text-sm md:text-base text-white/70 mb-8 text-center max-w-md"
                >
                    Building MediconnectBD & Creating Impactful Solutions
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
                >
                    <motion.button
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-cyber-purple to-neon-cyan rounded-full font-semibold text-white shadow-lg hover:shadow-cyber-purple/50 transition-all duration-300"
                        onClick={handleScrollDown}
                    >
                        View My Work
                    </motion.button>

                    <motion.a
                        href="/resume.pdf"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-neon-cyan rounded-full font-semibold text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
                    >
                        Download Resume
                    </motion.a>
                </motion.div>
            </div>

            {/* Social Icons */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-4 pointer-events-none">
                <SocialIcon
                    href="https://github.com/omorfarukullas"
                    delay={6}
                    icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                />
                <SocialIcon
                    href="https://linkedin.com/in/omorullas"
                    delay={6.2}
                    icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                />
            </div>

            {/* Scroll Down Arrow */}
            <motion.button
                onClick={handleScrollDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
            >
                <div className="w-6 h-10 border-2 border-cyber-purple rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
                    />
                </div>
            </motion.button>
        </section>
    );
}
