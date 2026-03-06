'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    techStack: string[];
    features: string[];
    status: string;
    category: string;
    github: string;
    live?: string;
    colors: { primary: string; secondary: string };
    image: string;
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-project-title"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <motion.div
                        ref={modalRef}
                        tabIndex={-1}
                        initial={{ scale: 0.94, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.96, opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-hover)',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '680px',
                            maxHeight: '88vh',
                            overflowY: 'auto',
                            outline: 'none',
                            boxShadow: `0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px var(--border)`,
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            padding: '1.5rem 1.5rem 0',
                            gap: '1rem',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{project.image}</div>
                                <div>
                                    <h2
                                        id="modal-project-title"
                                        style={{
                                            fontSize: '1.35rem',
                                            fontWeight: 800,
                                            letterSpacing: '-0.02em',
                                            background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            marginBottom: '0.25rem',
                                        }}
                                    >
                                        {project.title}
                                    </h2>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{project.tagline}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                style={{
                                    flexShrink: 0,
                                    width: '32px', height: '32px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'var(--bg-elevated)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s, color 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--border-hover)';
                                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)';
                                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Status Badge */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <span style={{
                                    padding: '0.3rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    background: `${project.colors.primary}18`,
                                    color: project.colors.primary,
                                    border: `1px solid ${project.colors.primary}30`,
                                }}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                {project.longDescription}
                            </p>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />

                            {/* Tech Stack */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                    Tech Stack
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                padding: '0.3rem 0.7rem',
                                                background: 'var(--bg-elevated)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '6px',
                                                fontSize: '0.82rem',
                                                fontWeight: 500,
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div style={{ marginBottom: '1.75rem' }}>
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                    Key Features
                                </h3>
                                <ul style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                    gap: '0.5rem',
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}>
                                    {project.features.map((f, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={project.colors.primary} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '3px' }}>
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.6rem 1.25rem',
                                        background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        textDecoration: 'none',
                                        transition: 'opacity 0.15s, transform 0.15s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                                    </svg>
                                    View on GitHub
                                </a>
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-ghost"
                                        style={{ fontSize: '0.875rem' }}
                                    >
                                        Live Demo →
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
