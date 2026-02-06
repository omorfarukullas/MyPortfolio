"use client";

import { useEffect, useRef, useState } from 'react';
import { usePerformance } from './PerformanceProvider';

export default function InteractiveBackground() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobile, setIsMobile] = useState(false);
    const { isReduced } = usePerformance();

    // Configuration
    const config = {
        particleColor: ['#8B5CF6', '#06B6D4', '#FFFFFF'], // Purple, Cyan, White
        connectionDistance: 150,
        baseSpeed: 0.5,
        repulsionRadius: 150,
        attractionRadius: 200,
        rippleDuration: 60, // Frames
    };

    // Density settings per section
    const densitySettings = {
        hero: 180,
        about: 120,
        projects: 120,
        skills: 100,
        experience: 100,
        contact: 60, // Low density but maybe more connections?
    };

    useEffect(() => {
        // Mobile check
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Section observer
        const observerOptions = { threshold: 0.2 };
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let ripples = [];
        let mouse = { x: -1000, y: -1000, active: false };
        let lastTime = 0;

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Anti-gravity float: slightly upward bias
                this.vx = (Math.random() - 0.5) * config.baseSpeed;
                this.vy = (Math.random() - 0.7) * config.baseSpeed;
                this.size = Math.random() * 2 + 0.5;
                this.color = config.particleColor[Math.floor(Math.random() * config.particleColor.length)];
                this.originalX = this.x;
                this.originalY = this.y;
            }

            update(targetDensity) {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Mouse Interaction (Desktop only)
                if (!isMobile && mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.repulsionRadius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.repulsionRadius - distance) / config.repulsionRadius;

                        // Repulsion
                        const repulsionStrength = 2; // Strong push
                        this.x -= forceDirectionX * force * repulsionStrength;
                        this.y -= forceDirectionY * force * repulsionStrength;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            let count = isMobile ? 50 : (densitySettings[activeSection] || 100);
            if (isReduced) count = Math.floor(count * 0.5); // 50% less particles on low FPS

            // Adjust particle count smoothly
            if (Math.abs(particles.length - count) > 5) {
                if (particles.length < count) {
                    // Add particles
                    for (let i = 0; i < count - particles.length; i++) {
                        particles.push(new Particle());
                    }
                } else {
                    // Remove particles randomly
                    particles = particles.slice(0, count);
                }
            } else if (particles.length === 0) {
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }
        };

        const drawConnections = () => {
            // Only connect close particles if section is contact or density is low
            // Or just standard connection for all
            const maxDist = config.connectionDistance;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDist) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / maxDist})`; // Purple tint
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

            initParticles(); // Check density adjustment

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            if (!isReduced) drawConnections();

            // Ripples - Only if not reduced
            if (!isReduced) {
                ripples.forEach((ripple, index) => {
                    ripple.radius += 2;
                    ripple.opacity -= 0.02;

                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${ripple.opacity})`; // Cyan ripple
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    if (ripple.opacity <= 0) {
                        ripples.splice(index, 1);
                    }
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;

            // Debounce active state clearing?
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const handleClick = (e) => {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                opacity: 1
            });
        };

        window.addEventListener('resize', resize);
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseout', handleMouseLeave);
            window.addEventListener('click', handleClick);
        }

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, [activeSection, isMobile]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0f]">
            {/* Layer 2: Gradient Orbs (Behind Canvas) */}
            <div className={`absolute inset-0 opacity-40 ${isReduced ? 'hidden' : ''}`}>
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-cyber-purple/30 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-[50%] right-[20%] w-[400px] h-[400px] bg-neon-cyan/20 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[80px] animate-pulse-slower" />
            </div>

            {/* Layer 1: Canvas Particle Field */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />

            {/* Optional Overlay for aesthetics */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>
    );
}
