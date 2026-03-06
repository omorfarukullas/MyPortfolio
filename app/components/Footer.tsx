'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            position: 'relative',
            marginTop: '8rem',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            padding: '4rem 0 3rem 0',
            overflow: 'hidden',
        }}>
            {/* Subtle top glow */}
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                opacity: 0.5,
            }} />

            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                justifyContent: 'space-between',
                maxWidth: '1100px',
            }}>
                {/* Brand & Copy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center',
                            fontFamily: 'monospace', fontWeight: 900, fontSize: '1.4rem',
                            color: 'var(--text-primary)', letterSpacing: '-0.05em',
                            transition: 'color 0.2s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        >
                            <span style={{ color: 'var(--accent)' }}>&lt;/</span>
                            OFU
                            <span style={{ color: 'var(--accent)' }}>&gt;</span>
                        </div>
                    </Link>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px' }}>
                        Transforming complex problems into elegant, user-friendly digital solutions. Building software that matters.
                    </p>
                </div>

                {/* Navigation Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-primary)' }}>
                        Navigation
                    </span>
                    <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none',
                                    transition: 'color 0.2s, padding-left 0.2s', width: 'fit-content'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.paddingLeft = '4px'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0'; }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Social Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-primary)' }}>
                        Connect
                    </span>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {[
                            { icon: <SiGithub size={18} />, href: siteConfig.social.github, label: 'GitHub' },
                            { icon: <SiLinkedin size={18} />, href: siteConfig.social.linkedin, label: 'LinkedIn' },
                            { icon: <SiX size={18} />, href: siteConfig.social.twitter, label: 'Twitter/X' },
                            { icon: <SiFacebook size={18} />, href: siteConfig.social.facebook, label: 'Facebook' },
                            { icon: <SiInstagram size={18} />, href: siteConfig.social.instagram, label: 'Instagram' },
                            { icon: <MdEmail size={20} />, href: `mailto:${siteConfig.social.email}`, label: 'Email' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: '38px', height: '38px', borderRadius: '50%',
                                    background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.background = 'var(--accent)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.background = 'var(--bg-elevated)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.transform = 'none';
                                }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="container" style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
                marginTop: '3.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
            }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    © {year} Omor Faruk Ullas. All rights reserved.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                    Available for new opportunities
                </div>
            </div>
        </footer>
    );
}
