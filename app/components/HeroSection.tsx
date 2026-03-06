'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { siteConfig } from '@/config/site';

/* ——— Animated Typing Text ——— */
function TypingText({ words }: { words: string[] }) {
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        const delay = deleting ? 60 : charIdx === current.length ? 1400 : 80;
        const timer = setTimeout(() => {
            if (!deleting && charIdx < current.length) setCharIdx((c) => c + 1);
            else if (!deleting && charIdx === current.length) setDeleting(true);
            else if (deleting && charIdx > 0) setCharIdx((c) => c - 1);
            else { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); }
        }, delay);
        return () => clearTimeout(timer);
    }, [charIdx, deleting, wordIdx, words]);

    return (
        <span>
            {words[wordIdx].slice(0, charIdx)}
            <span style={{
                borderRight: '2px solid var(--accent)', marginLeft: '1px',
                display: 'inline-block', animation: 'cursor-blink 0.75s step-end infinite',
                height: '1em', verticalAlign: 'text-bottom',
            }} />
        </span>
    );
}

/* ——— Developer SVG Illustration ——— */
function DeveloperIllustration() {
    return (
        <svg viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', maxWidth: '480px', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.45))' }}>
            {/* Purple blob */}
            <path d="M310 65C370 85 400 155 390 225C380 295 328 344 258 352C188 360 118 318 88 248C58 178 80 98 142 70C204 42 250 45 310 65Z" fill="rgba(75, 45, 120, 0.55)" />
            {/* Decorative shapes */}
            <rect x="338" y="55" width="22" height="22" rx="4" fill="rgba(168, 85, 247, 0.6)" transform="rotate(15 338 55)" />
            <circle cx="368" cy="128" r="9" fill="rgba(130,80,200,0.5)" />
            <polygon points="348,185 360,172 372,185 360,198" fill="rgba(168, 85, 247, 0.45)" />
            <circle cx="80" cy="200" r="6" fill="rgba(168, 85, 247, 0.3)" />
            <rect x="58" y="155" width="14" height="14" rx="2" fill="rgba(130,80,200,0.35)" transform="rotate(-20 58 155)" />

            {/* Laptop base */}
            <rect x="100" y="274" width="210" height="18" rx="9" fill="#162232" />
            <rect x="92" y="252" width="226" height="25" rx="5" fill="#1e3350" />

            {/* Laptop screen */}
            <rect x="112" y="152" width="186" height="112" rx="8" fill="#162232" />
            <rect x="118" y="158" width="174" height="98" rx="5" fill="#0b1624" />
            {/* Code on screen */}
            <rect x="126" y="168" width="55" height="5" rx="2" fill="rgba(168, 85, 247, 0.9)" />
            <rect x="132" y="180" width="78" height="4" rx="2" fill="rgba(255,255,255,0.28)" />
            <rect x="132" y="191" width="95" height="4" rx="2" fill="rgba(100,185,255,0.55)" />
            <rect x="132" y="202" width="65" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="126" y="213" width="48" height="5" rx="2" fill="rgba(168, 85, 247, 0.75)" />
            <rect x="132" y="225" width="62" height="4" rx="2" fill="rgba(100,220,150,0.55)" />
            <rect x="132" y="236" width="82" height="4" rx="2" fill="rgba(255,255,255,0.17)" />
            <text x="200" y="271" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Arial">acer</text>

            {/* Shirt body */}
            <path d="M162 205Q185 188 205 190Q225 188 248 205L256 285L154 285Z" fill="#a855f7" />
            {/* Neck + Head */}
            <rect x="198" y="168" width="14" height="24" rx="6" fill="#e8a898" />
            <ellipse cx="205" cy="138" rx="30" ry="33" fill="#e8a898" />
            {/* Hair */}
            <path d="M176 126C180 95 230 95 234 126C228 110 205 106 176 126Z" fill="#1a1a2e" />
            {/* Ears */}
            <ellipse cx="175" cy="138" rx="5" ry="7" fill="#d49080" />
            <ellipse cx="235" cy="138" rx="5" ry="7" fill="#d49080" />
            {/* Eyes */}
            <ellipse cx="196" cy="136" rx="3.5" ry="4" fill="#1a1a2e" />
            <ellipse cx="214" cy="136" rx="3.5" ry="4" fill="#1a1a2e" />
            <ellipse cx="195" cy="135" rx="1.2" ry="1.5" fill="#fff" />
            <ellipse cx="213" cy="135" rx="1.2" ry="1.5" fill="#fff" />
            {/* Smile */}
            <path d="M197 148Q205 155 213 148" stroke="#b87865" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Arms */}
            <path d="M162 212Q140 235 118 245Q108 250 110 264Q118 274 128 266Q152 252 168 232Z" fill="#e8a898" />
            <path d="M248 212Q270 235 292 245Q302 250 300 264Q292 274 282 266Q258 252 242 232Z" fill="#e8a898" />
            <ellipse cx="116" cy="268" rx="13" ry="9" fill="#e8a898" />
            <ellipse cx="294" cy="268" rx="13" ry="9" fill="#e8a898" />

            {/* Legs (crossed) */}
            <path d="M154 283Q148 315 133 336Q158 344 173 325Q188 306 188 283Z" fill="#12192a" />
            <path d="M256 283Q262 315 277 336Q252 344 237 325Q222 306 222 283Z" fill="#12192a" />
            <path d="M138 318Q175 308 205 312Q235 308 272 318Q263 345 205 350Q147 345 138 318Z" fill="#12192a" />
        </svg>
    );
}

/* ——— Social Icon ——— */
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', color: 'var(--text-muted)', transition: 'color 0.2s, transform 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; }}
        >
            {children}
        </a>
    );
}

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Animation helper using CSS
    const fade = (delay: number): React.CSSProperties => ({
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    });

    const fadeX = (dir: 'left' | 'right', delay: number): React.CSSProperties => ({
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : `translateX(${dir === 'left' ? '-20px' : '20px'})`,
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    });

    return (
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '68px' }}>

            {/* Left Social Sidebar */}
            <div style={{
                position: 'fixed', left: '1.5rem', bottom: 0, zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem',
                paddingBottom: '2rem', ...fadeX('left', 0.8),
            }} className="sidebar-hide">
                <SocialIcon href={siteConfig.social.facebook ?? 'https://facebook.com'} label="Facebook">
                    <SiFacebook size={18} />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.instagram ?? 'https://instagram.com'} label="Instagram">
                    <SiInstagram size={18} />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.twitter ?? 'https://twitter.com'} label="Twitter/X">
                    <SiX size={18} />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                    <SiLinkedin size={18} />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.github} label="GitHub">
                    <SiGithub size={18} />
                </SocialIcon>
                <div style={{ width: '1px', height: '70px', background: 'linear-gradient(to bottom, var(--text-muted), transparent)', marginTop: '4px' }} />
            </div>

            {/* Right Email Sidebar */}
            <div style={{
                position: 'fixed', right: '1.5rem', bottom: 0, zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                paddingBottom: '2rem', ...fadeX('right', 0.9),
            }} className="sidebar-hide">
                <a
                    href={`mailto:${siteConfig.social.email}`}
                    style={{
                        writingMode: 'vertical-rl', fontSize: '0.78rem', letterSpacing: '0.12em',
                        color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s',
                        fontFamily: 'JetBrains Mono, monospace',
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'}
                >
                    {siteConfig.social.email}
                </a>
                <div style={{ width: '1px', height: '70px', background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
            </div>

            {/* Main content */}
            <div className="container" style={{ width: '100%' }}>
                <div className="hero-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 68px)',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    paddingLeft: '3rem',
                    paddingRight: '3rem',
                }}>
                    {/* Text Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', alignItems: 'flex-start' }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', ...fade(0.1) }}>
                            Hi There 👋
                        </p>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                            marginBottom: '0.75rem',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            ...fade(0.2),
                        }}>
                            I&apos;m{' '}
                            <span style={{ color: 'var(--accent)' }}>
                                Omor Faruk<br />Ullas
                            </span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                            fontWeight: 400,
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            minHeight: '2em',
                            ...fade(0.3),
                        }}>
                            I am a{' '}
                            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                {mounted && <TypingText words={['Full Stack Developer', 'React Developer', 'Node.js Developer', 'CSE Student', 'Problem Solver']} />}
                            </span>
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fade(0.4) }}>
                            <a
                                href="/resume.pdf"
                                download
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.75rem 2rem',
                                    background: 'var(--accent)',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                                    cursor: 'pointer', letterSpacing: '0.01em',
                                    boxShadow: '0 4px 18px rgba(232,69,69,0.35)',
                                    transition: 'background 0.15s, transform 0.15s, box-shadow 0.15s',
                                }}
                                onMouseEnter={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = 'var(--accent-hover)'; t.style.transform = 'translateY(-2px)'; t.style.boxShadow = '0 6px 24px rgba(232,69,69,0.45)'; }}
                                onMouseLeave={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = 'var(--accent)'; t.style.transform = 'none'; t.style.boxShadow = '0 4px 18px rgba(232,69,69,0.35)'; }}
                            >
                                Resume
                            </a>
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-flex', alignItems: 'center',
                                    padding: '0.73rem 2rem',
                                    background: 'var(--bg-elevated)',
                                    color: 'var(--text-primary)',
                                    border: '1.5px solid rgba(255,255,255,0.18)',
                                    borderRadius: '6px', fontWeight: 600, fontSize: '0.95rem',
                                    textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s, transform 0.15s',
                                }}
                                onMouseEnter={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.borderColor = 'var(--accent)'; t.style.color = 'var(--accent)'; t.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.borderColor = 'rgba(255,255,255,0.18)'; t.style.color = 'var(--text-primary)'; t.style.transform = 'none'; }}
                            >
                                Contact Me
                            </Link>
                        </div>
                    </div>

                    {/* Illustration Column */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: mounted ? 1 : 0,
                        animation: mounted ? 'float 4s ease-in-out infinite' : 'none',
                        transition: 'opacity 0.6s ease 0.3s',
                    }}>
                        <DeveloperIllustration />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            order: 2;
            align-items: center !important;
          }
          .hero-grid > div:last-child {
            order: 1;
          }
        }
        @media (min-width: 901px) {
          .sidebar-hide { display: flex !important; }
        }
        @media (max-width: 900px) {
          .sidebar-hide { display: none !important; }
        }
      `}</style>
        </section>
    );
}
