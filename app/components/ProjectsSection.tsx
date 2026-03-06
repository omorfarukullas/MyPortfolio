'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import ProjectModal from './ProjectModal';

const projectsData = [
    {
        id: 0,
        title: 'Noor e Ramadan',
        tagline: 'Islamic Daily Life Companion',
        description: 'A comprehensive app to help Muslims easily practice their daily Islamic life, especially during Ramadan.',
        longDescription:
            'Noor e Ramadan provides a seamless experience for tracking daily prayers, fasting schedules, Quran reading, and daily supplications. Built to help users stay connected to their faith with features like prayer reminders, interactive progress tracking, and authentic Islamic resources.',
        techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
        features: [
            'Daily prayer tracking & reminders',
            'Ramadan fasting schedule',
            'Quran reading tracker',
            'Authentic supplications (Duas)',
            'Interactive dashboard',
        ],
        status: 'Completed',
        category: 'Web',
        github: '#',
        colors: { primary: '#10b981', secondary: '#047857' },
        image: '🌙',
    },
    {
        id: 1,
        title: 'MediconnectBD',
        tagline: 'Unified Smart Healthcare System',
        description: 'Revolutionizing healthcare accessibility and management in Bangladesh.',
        longDescription:
            'A comprehensive smart healthcare platform that bridges the gap between patients, doctors, and hospitals. Features real-time appointment booking, live queue tracking, hospital resource management, electronic medical records, emergency ambulance services, and telemedicine capabilities.',
        techStack: ['TypeScript', 'React', 'Node.js', 'MySQL', 'Express'],
        features: [
            'Appointment booking system',
            'Live queue tracking',
            'Hospital resource management',
            'Electronic Medical Records (EMR)',
            'Emergency ambulance dispatch',
            'Telemedicine capabilities',
        ],
        status: 'In Development',
        category: 'Healthcare',
        github: '#',
        colors: { primary: '#0ea5e9', secondary: '#0284c7' },
        image: '🏥',
    },
    {
        id: 2,
        title: 'JavaFX Resume Generator',
        tagline: 'Desktop Resume Builder',
        description: 'GUI-based professional resume generator built with OOP principles.',
        longDescription:
            'A sophisticated desktop application built with JavaFX that lets users create professional resumes. Demonstrates advanced OOP concepts including inheritance, encapsulation, and polymorphism with an intuitive graphical interface.',
        techStack: ['Java', 'JavaFX'],
        features: [
            'Graphical drag-and-drop interface',
            'Structured resume generation',
            'OOP design patterns',
            'EventHandler-based interaction',
        ],
        status: 'Completed',
        category: 'Tools',
        github: '#',
        colors: { primary: '#8b5cf6', secondary: '#6d28d9' },
        image: '📄',
    },
];

const categories = ['All', 'Web', 'Healthcare', 'Tools', 'Mobile'];

type Project = typeof projectsData[0];

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                cursor: 'pointer',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = project.colors.primary + '60';
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px ${project.colors.primary}40`;
                const bgGlow = el.querySelector('.project-glow') as HTMLDivElement;
                if (bgGlow) bgGlow.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = isInView ? 'none' : 'translateY(30px)';
                el.style.boxShadow = 'none';
                const bgGlow = el.querySelector('.project-glow') as HTMLDivElement;
                if (bgGlow) bgGlow.style.opacity = '0';
            }}
        >
            {/* Top gradient strip */}
            <div style={{ height: '3px', width: '100%', background: `linear-gradient(90deg, ${project.colors.primary}, ${project.colors.secondary})` }} />

            {/* Hover Glow inside card */}
            <div className="project-glow" style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: `radial-gradient(circle at top right, ${project.colors.primary}15, transparent 60%)`,
                opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none'
            }} />

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{
                        fontSize: '2.5rem', lineHeight: 1, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                        width: '60px', height: '60px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {project.image}
                    </div>
                    <span style={{
                        padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
                        background: `${project.colors.primary}15`, color: project.colors.primary,
                        border: `1px solid ${project.colors.primary}30`, letterSpacing: '0.02em'
                    }}>
                        {project.status}
                    </span>
                </div>

                <h3 style={{
                    fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em',
                    color: 'var(--text-primary)'
                }}>
                    {project.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: project.colors.primary, marginBottom: '1rem', fontWeight: 600 }}>
                    {project.tagline}
                </p>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} style={{
                            padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                            background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)',
                        }}>
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.25rem 0.4rem', fontWeight: 600 }}>
                            +{project.techStack.length - 4}
                        </span>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Explore Project
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-50px' });

    const filtered = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="section" style={{ borderTop: '1px solid var(--border)', padding: '6rem 0' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Section Header */}
                <div
                    ref={headerRef}
                    style={{
                        marginBottom: '3rem',
                        opacity: headerInView ? 1 : 0,
                        transform: headerInView ? 'none' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        textAlign: 'center',
                    }}
                >
                    <span style={{
                        display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '100px',
                        background: 'var(--accent-subtle)', color: 'var(--accent)',
                        fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                        marginBottom: '1rem', border: '1px solid var(--accent)'
                    }}>
                        Portfolio
                    </span>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Things I&apos;ve Built
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        From comprehensive healthcare platforms to everyday tools — building real, scalable solutions to solve actual problems.
                    </p>
                </div>

                {/* Sleek Segmented Filter Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}>
                    <div style={{
                        display: 'inline-flex', flexWrap: 'wrap', gap: '0.25rem', padding: '0.35rem',
                        background: 'var(--bg-elevated)', borderRadius: '100px', border: '1px solid var(--border)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                    }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '0.6rem 1.25rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600,
                                    border: 'none', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                    background: selectedCategory === cat ? 'var(--text-primary)' : 'transparent',
                                    color: selectedCategory === cat ? 'var(--bg-surface)' : 'var(--text-secondary)',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                            >
                                <ProjectCard project={project} index={index} onClick={() => setSelectedProject(project)} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
