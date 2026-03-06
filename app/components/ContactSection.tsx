'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate sending — replace with actual API call / Formspree endpoint
        setTimeout(() => {
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
        }, 1200);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.7rem 0.95rem',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.15s',
        fontFamily: 'inherit',
    };

    return (
        <section id="contact" className="section" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                    {/* Left — Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Contact
                        </p>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Let&apos;s Work Together
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Whether you have a project idea, want to collaborate, or just want to say hello — my inbox is always open.
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                {
                                    label: 'GitHub', href: siteConfig.social.github, icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                                        </svg>
                                    )
                                },
                                {
                                    label: 'LinkedIn', href: siteConfig.social.linkedin, icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    )
                                },
                                {
                                    label: siteConfig.social.email, href: `mailto:${siteConfig.social.email}`, icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <rect x="2" y="4" width="20" height="16" rx="2" />
                                            <path d="M22 7L12 13 2 7" />
                                        </svg>
                                    )
                                },
                            ].map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                        color: 'var(--text-secondary)', textDecoration: 'none',
                                        fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.15s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {status === 'sent' ? (
                            <div style={{
                                textAlign: 'center', padding: '2.5rem',
                                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                borderRadius: '12px',
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Thanks for reaching out. I&apos;ll get back to you soon.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        value={form.message}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="btn-primary"
                                    style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
                                >
                                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                                    {status !== 'sending' && (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                        </svg>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
