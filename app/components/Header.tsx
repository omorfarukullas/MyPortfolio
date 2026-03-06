'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '@/config/site';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <>
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                background: scrolled
                    ? 'color-mix(in srgb, var(--bg-base) 92%, transparent)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

                    {/* Logo — code tag style */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            fontFamily: 'Plus Jakarta Sans, monospace',
                            fontWeight: 800,
                            fontSize: '1.35rem',
                            letterSpacing: '-0.02em',
                            color: 'var(--text-primary)',
                            lineHeight: 1,
                        }}>
                            {'</'}
                            <span style={{ color: 'var(--accent)' }}>OFU</span>
                            {'>'}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {siteConfig.nav.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.href.startsWith('/#')) {
                                        e.preventDefault();
                                        const hash = item.href.replace('/', '');
                                        const el = document.querySelector(hash);
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                            window.history.pushState(null, '', hash);
                                        } else if (pathname !== '/') {
                                            window.location.href = item.href;
                                        }
                                    }
                                }}
                                style={{
                                    padding: '0.45rem 1rem',
                                    borderRadius: '5px',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive(item.href) ? 600 : 500,
                                    color: isActive(item.href) ? 'var(--accent)' : 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.15s',
                                    letterSpacing: '0.01em',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'; }}
                                onMouseLeave={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Let's Talk */}
                        <Link
                            href="/contact"
                            className="hidden-mobile"
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '6px',
                                border: '2px solid var(--accent)',
                                color: 'var(--accent)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                transition: 'background 0.15s, color 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
                            }}
                        >
                            Let&apos;s Talk
                        </Link>

                        <ThemeToggle />

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="show-mobile"
                            style={{
                                display: 'none', alignItems: 'center', justifyContent: 'center',
                                width: '38px', height: '38px', borderRadius: '6px',
                                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                cursor: 'pointer', color: 'var(--text-primary)', flexShrink: 0,
                            }}
                        >
                            {menuOpen ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMenuOpen(false)}
                            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' } as React.CSSProperties}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
                            style={{
                                position: 'fixed', top: 0, right: 0, bottom: 0, width: '270px',
                                zIndex: 45, background: 'var(--bg-surface)',
                                borderLeft: '1px solid var(--border)',
                                padding: '5rem 1.5rem 2rem',
                                display: 'flex', flexDirection: 'column', gap: '0.25rem',
                            } as React.CSSProperties}
                        >
                            <div style={{ marginBottom: '1rem', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Navigation
                            </div>
                            {siteConfig.nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        padding: '0.7rem 1rem', borderRadius: '8px', fontSize: '1rem',
                                        fontWeight: 500, color: isActive(item.href) ? 'var(--accent)' : 'var(--text-primary)',
                                        background: isActive(item.href) ? 'var(--accent-subtle)' : 'transparent',
                                        textDecoration: 'none', display: 'block', cursor: 'pointer'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div style={{ marginTop: 'auto' }}>
                                <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
                                    display: 'block', textAlign: 'center', padding: '0.75rem',
                                    background: 'var(--accent)', color: '#fff', borderRadius: '8px',
                                    fontWeight: 700, textDecoration: 'none',
                                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.35)',
                                }}>
                                    Let&apos;s Talk!
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 769px) { .hidden-mobile{display:flex!important} .show-mobile{display:none!important} }
        @media (max-width: 768px)  { .hidden-mobile{display:none!important} .show-mobile{display:flex!important} }
      `}</style>
        </>
    );
}
