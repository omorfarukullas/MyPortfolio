"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useMobile } from '../hooks/useMobile';

// Project data
const projectsData = [
    {
        id: 1,
        title: "MediconnectBD",
        tagline: "Unified Smart Healthcare System",
        description: "Revolutionizing healthcare accessibility and management in Bangladesh",
        longDescription: "A comprehensive smart healthcare platform that bridges the gap between patients, doctors, and hospitals. Features include real-time appointment booking, live queue tracking, hospital resource management, electronic medical records, emergency ambulance services, and telemedicine capabilities.",
        techStack: ["TypeScript", "JavaScript", "MySQL", "React", "Node.js"],
        features: [
            "Appointment booking",
            "Live queue tracking",
            "Hospital resource tracking",
            "Electronic Medical Records (EMR)",
            "Emergency ambulance",
            "Telemedicine"
        ],
        status: "In Development",
        category: "Healthcare",
        github: "#",
        colors: {
            primary: "#06b6d4",
            secondary: "#10b981",
            glow: "rgba(6, 182, 212, 0.5)"
        },
        image: "🏥"
    },
    {
        id: 2,
        title: "JavaFX Resume Generator",
        tagline: "Desktop Resume Builder",
        description: "GUI-based resume generator with OOP principles",
        longDescription: "A sophisticated desktop application built with JavaFX that allows users to create professional resumes. Demonstrates advanced OOP concepts including inheritance, encapsulation, and polymorphism with an intuitive graphical interface.",
        techStack: ["Java", "JavaFX"],
        features: [
            "Graphical interface",
            "Structured generation",
            "OOP design (inheritance, encapsulation)",
            "Event handling"
        ],
        status: "Completed",
        category: "Tools",
        github: "#",
        colors: {
            primary: "#8b5cf6",
            secondary: "#3b82f6",
            glow: "rgba(139, 92, 246, 0.5)"
        },
        image: "📄"
    }
];

const categories = ["All", "Healthcare", "Education", "Tools"];

// Floating Project Card
function ProjectCard({ project, index, mousePosition, onClick }) {
    const isMobile = useMobile();
    const [cardRef, isInView] = useScrollAnimation(0.15);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic effect
    const magneticX = useSpring(0, { stiffness: 50, damping: 20 });
    const magneticY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        if (isMobile) return;

        if (cardRef.current && mousePosition.x !== 0) {
            const rect = cardRef.current.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const distanceX = mousePosition.x - cardCenterX;
            const distanceY = mousePosition.y - cardCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < 300) {
                const strength = (300 - distance) / 300;
                magneticX.set(distanceX * strength * 0.05);
                magneticY.set(distanceY * strength * 0.05);
            } else {
                magneticX.set(0);
                magneticY.set(0);
            }
        }
    }, [mousePosition, magneticX, magneticY, isMobile]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : { opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5, scale: 0.9 }}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 50,
                damping: 20
            }}
            style={{
                x: magneticX,
                y: magneticY,
                perspective: 1000,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            {/* Floating animation wrapper */}
            <motion.div
                animate={{
                    y: isMobile ? [0, -5, 0] : [0, -15, 0],
                    rotateY: isHovered && !isMobile ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                    y: {
                        duration: 2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                    rotateY: {
                        duration: 0.6,
                        ease: "easeOut"
                    }
                }}
            >
                <motion.div
                    animate={{
                        z: isHovered && !isMobile ? 50 : 0,
                        scale: isHovered && !isMobile ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    onClick={onClick}
                    className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
                    style={{
                        transformStyle: "preserve-3d",
                        boxShadow: isHovered
                            ? `0 20px 60px ${project.colors.glow}, 0 0 40px ${project.colors.glow}`
                            : '0 10px 30px rgba(0, 0, 0, 0.3)',
                        borderColor: isHovered ? project.colors.primary : 'rgba(255, 255, 255, 0.1)',
                        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                    }}
                >
                    {/* Holographic border effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            animate={{
                                background: isHovered
                                    ? `linear-gradient(90deg, ${project.colors.primary}, ${project.colors.secondary}, ${project.colors.primary})`
                                    : 'transparent',
                                backgroundSize: '200% 100%',
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 opacity-20"
                            style={{
                                maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                            }}
                        />
                    </div>

                    {/* Glow overlay on hover */}
                    <motion.div
                        animate={{ opacity: isHovered ? 0.1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${project.colors.primary}, transparent)`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative p-6 z-10">
                        {/* Emoji Icon */}
                        <div className="text-6xl mb-4">{project.image}</div>

                        {/* Status Badge */}
                        <div className="mb-3">
                            <span
                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{
                                    backgroundColor: `${project.colors.primary}20`,
                                    color: project.colors.primary,
                                    border: `1px solid ${project.colors.primary}40`,
                                }}
                            >
                                {project.status}
                            </span>
                        </div>

                        {/* Title */}
                        <h3
                            className="text-2xl font-bold mb-2"
                            style={{
                                background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {project.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-sm text-foreground/60 mb-3">{project.tagline}</p>

                        {/* Description */}
                        <p className="text-foreground/80 mb-4 line-clamp-2">{project.description}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.slice(0, 3).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-foreground/70"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 3 && (
                                <span className="px-2 py-1 rounded-md text-xs text-foreground/50">
                                    +{project.techStack.length - 3}
                                </span>
                            )}
                        </div>

                        {/* View Details Button */}
                        <motion.button
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                y: isHovered ? 0 : 10,
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-full py-2 rounded-lg font-semibold text-white"
                            style={{
                                background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                                boxShadow: `0 4px 15px ${project.colors.glow}`,
                            }}
                        >
                            View Details
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Project Modal
function ProjectModal({ project, onClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        // Focus the modal when it opens
        modalRef.current?.focus();

        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <motion.div
                ref={modalRef}
                tabIndex={-1}
                initial={{ scale: 0.8, rotateX: -20 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.8, rotateX: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0a0a0f] border border-white/20 rounded-2xl p-8 outline-none"
                style={{
                    boxShadow: `0 25px 80px ${project.colors.glow}`,
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Close Modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="mb-6">
                    <div className="text-6xl mb-4">{project.image}</div>
                    <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                            backgroundColor: `${project.colors.primary}20`,
                            color: project.colors.primary,
                            border: `1px solid ${project.colors.primary}40`,
                        }}
                    >
                        {project.status}
                    </span>
                </div>

                <h2
                    id="modal-title"
                    className="text-4xl font-bold mb-2"
                    style={{
                        background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {project.title}
                </h2>
                <p className="text-xl text-foreground/60 mb-6">{project.tagline}</p>
                <p className="text-foreground/90 mb-6 leading-relaxed">{project.longDescription}</p>

                {/* Tech Stack */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: project.colors.primary }}>
                        Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-lg text-sm bg-white/5 border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: project.colors.primary }}>
                        Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span style={{ color: project.colors.secondary }}>✓</span>
                                <span className="text-foreground/80">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 hover:scale-105 transition-transform"
                        style={{
                            background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                            boxShadow: `0 4px 20px ${project.colors.glow}`,
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Main Component
export default function ProjectsGallery() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [titleRef, isTitleInView] = useScrollAnimation(0.2);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter(p => p.category === selectedCategory);

    return (
        <section id="projects" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1a] via-[#0a0a0f] to-[#0a0f1a]" />
                <motion.div
                    animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyber-purple/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Title */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-foreground/60 text-sm sm:text-base mb-8">
                        Building solutions that make a difference
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-cyber-purple to-neon-cyan text-white shadow-lg'
                                    : 'bg-white/5 border border-white/10 text-foreground/70 hover:border-cyber-purple/50'
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            mousePosition={mousePosition}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
