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
            <instancedMesh ref={light} args={[null, null, count / 2]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color="#06B6D4"
                    emissive="#06B6D4"
                    emissiveIntensity={0.7}
                    roughness={0.3}
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

    // ... (useEffect remains same)

    // ... (return statement until Canvas)

    {/* Three.js Canvas */ }
    <Canvas
        className="z-10"
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
    >
        <Scene mousePosition={mousePosition} isMobile={isMobile} />
    </Canvas>

    {/* Fallback for mobile - 2D text overlay */ }
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none md:hidden">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4"
        >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                <span className="bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent">
                    OMOR FARUK
                </span>
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                <span className="bg-gradient-to-r from-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                    ULLAS
                </span>
            </h1>
        </motion.div>
    </div>

    {/* Content Overlay with Typing Effect, Tagline, and Buttons */ }
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* Spacing from 3D text */}
        <div className="h-32 md:h-40" />

        {/* Animated Subtitle with Typing Effect */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-4"
        >
            <h2 className="text-lg md:text-2xl font-medium text-foreground/90">
                <TypingEffect
                    text="Full Stack Developer | CSE Student | Football Analyst ⚽"
                    delay={1500}
                />
            </h2>
        </motion.div>

        {/* Project Tagline */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-sm md:text-base text-foreground/70 mb-8 text-center max-w-md"
        >
            Building MediconnectBD & Creating Impactful Solutions
        </motion.p>

        {/* Action Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
            {/* View My Work Button with Anti-Gravity Effect */}
            <motion.button
                whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyber-purple to-neon-cyan rounded-full font-semibold text-white shadow-lg hover:shadow-cyber-purple/50 transition-all duration-300 overflow-hidden"
                onClick={handleScrollDown}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        →
                    </motion.span>
                </span>
            </motion.button>

            {/* Download Resume Button with Neon Glow */}
            <motion.a
                href="/resume.pdf"
                download
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(6, 182, 212, 0.6), 0 0 50px rgba(139, 92, 246, 0.4)",
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-background border-2 border-neon-cyan rounded-full font-semibold text-neon-cyan hover:text-white transition-colors duration-300 overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                    Download Resume
                    <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ↓
                    </motion.span>
                </span>
            </motion.a>
        </motion.div>
    </div>

    {/* Social Icons - Floating near bottom */ }
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-4 pointer-events-none">
        <SocialIcon
            href="https://github.com/yourusername"
            delay={6}
            icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            }
        />
        <SocialIcon
            href="https://linkedin.com/in/yourusername"
            delay={6.2}
            icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            }
        />
        <SocialIcon
            href="mailto:your.email@example.com"
            delay={6.4}
            icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            }
        />
    </div>

    {/* Smooth Scroll Down Arrow */ }
    <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer"
    >
        <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95] // Custom spring-like easing
            }}
            className="w-6 h-10 border-2 border-cyber-purple rounded-full flex items-start justify-center p-2 hover:border-neon-cyan transition-colors"
        >
            <motion.div
                className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
                animate={{
                    boxShadow: [
                        "0 0 5px rgba(6, 182, 212, 0.5)",
                        "0 0 20px rgba(6, 182, 212, 0.8)",
                        "0 0 5px rgba(6, 182, 212, 0.5)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    </motion.button>
        </motion.div >
    );
}
