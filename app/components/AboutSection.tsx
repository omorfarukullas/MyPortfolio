'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import {
    SiTypescript, SiJavascript,
    SiNodedotjs, SiPhp, SiPython, SiOpenjdk, SiRuby, SiGo, SiKotlin, SiCplusplus,
    SiReact, SiNextdotjs, SiTailwindcss, SiExpress, SiLaravel,
    SiMysql, SiPostgresql, SiMongodb,
    SiGit, SiGithub, SiAndroid,
} from 'react-icons/si';

/* ——————————————————————————————————————
   TEXT ICON (for C, C#, C++ text fallbacks)
—————————————————————————————————————— */
function TextIcon({ label }: { label: string }) {
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 800, lineHeight: 1,
            fontFamily: 'monospace',
        }}>
            {label}
        </span>
    );
}

/* ——————————————————————————————————————
   DATA
—————————————————————————————————————— */

const techCategories = [
    {
        title: 'Languages',
        color: '#a78bfa',
        skills: [
            { name: 'C', icon: <TextIcon label="C" />, level: 93, color: '#A8B9CC' },
            { name: 'C++', icon: <SiCplusplus />, level: 95, color: '#00599C' },
            { name: 'C#', icon: <TextIcon label="C#" />, level: 94, color: '#239120' },
            { name: 'Java', icon: <SiOpenjdk />, level: 96, color: '#ED8B00' },
            { name: 'Python', icon: <SiPython />, level: 98, color: '#3776AB' },
            { name: 'JavaScript', icon: <SiJavascript />, level: 99, color: '#F7DF1E' },
            { name: 'TypeScript', icon: <SiTypescript />, level: 97, color: '#3178C6' },
            { name: 'PHP', icon: <SiPhp />, level: 94, color: '#777BB4' },
            { name: 'Ruby', icon: <SiRuby />, level: 91, color: '#CC342D' },
            { name: 'Go', icon: <SiGo />, level: 95, color: '#00ADD8' },
            { name: 'Kotlin', icon: <SiKotlin />, level: 93, color: '#7F52FF' },
        ],
    },
    {
        title: 'Frameworks',
        color: '#60a5fa',
        skills: [
            { name: 'React', icon: <SiReact />, level: 98, color: '#61DAFB' },
            { name: 'Next.js', icon: <SiNextdotjs />, level: 96, color: '#FFFFFF' },
            { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 97, color: '#06B6D4' },
            { name: 'Node.js', icon: <SiNodedotjs />, level: 95, color: '#339933' },
            { name: 'Express.js', icon: <SiExpress />, level: 94, color: '#FFFFFF' },
            { name: 'Laravel', icon: <SiLaravel />, level: 92, color: '#FF2D20' },
        ],
    },
    {
        title: 'Databases',
        color: '#f6ad55',
        skills: [
            { name: 'MySQL', icon: <SiMysql />, level: 96, color: '#4479A1' },
            { name: 'PostgreSQL', icon: <SiPostgresql />, level: 95, color: '#4169E1' },
            { name: 'MongoDB', icon: <SiMongodb />, level: 94, color: '#47A248' },
        ],
    },
    {
        title: 'Tools',
        color: '#34d399',
        skills: [
            { name: 'Git', icon: <SiGit />, level: 98, color: '#F05032' },
            { name: 'GitHub', icon: <SiGithub />, level: 97, color: '#181717' },
            { name: 'Android', icon: <SiAndroid />, level: 92, color: '#3DDC84' },
        ],
    },
];

const strengths = [
    { icon: '🚀', title: '12+ Languages', desc: 'Fluent across a wide range of programming languages and paradigms.' },
    { icon: '🏗️', title: 'Full-Stack Ready', desc: 'From pixel-perfect UIs to scalable servers, databases, and mobile.' },
    { icon: '📐', title: 'CS Fundamentals', desc: 'Strong grounding in algorithms, data structures, and system design.' },
    { icon: '🌍', title: 'Real-World Impact', desc: 'Building MediconnectBD to solve healthcare bottlenecks in Bangladesh.' },
    { icon: '🧱', title: 'Clean Code', desc: 'Passion for readable, maintainable, and well-documented codebases.' },
    { icon: '📚', title: 'Always Learning', desc: 'Committed to continuous improvement and staying ahead of tech trends.' },
];

const philosophy = [
    'Choose the right tool for the job, not the familiar one',
    'Write code that humans can read and machines can execute efficiently',
    'Build for scale, design for users, optimize for impact',
    'Never stop learning — always stay curious',
];

const opportunities = [
    'Healthcare Technology', 'Fintech Solutions', 'E-commerce Platforms',
    'SaaS Products', 'Open Source Projects', 'Innovative Startups',
];

const quickFacts = [
    { icon: '📍', text: 'Dhaka, Bangladesh' },
    { icon: '🎓', text: 'B.Sc. CSE — United International University' },
    { icon: '💼', text: 'Open to Remote & On-site Roles' },
    { icon: '⚽', text: 'Football Tactics Analyst & OSS Contributor' },
];

/* ——————————————————————————————————————
   FADE IN
—————————————————————————————————————— */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <div ref={ref} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(18px)',
            transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
        }}>
            {children}
        </div>
    );
}

/* ——————————————————————————————————————
   HELPERS
—————————————————————————————————————— */
function Label({ text }: { text: string }) {
    return (
        <p style={{
            fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem',
        }}>
            {text}
        </p>
    );
}

function Divider() {
    return <div style={{ height: '1px', background: 'var(--border)', margin: '4rem 0' }} />;
}

/* ——————————————————————————————————————
   MAIN
—————————————————————————————————————— */
export default function AboutSection() {
    return (
        <section id="about" style={{ borderTop: '1px solid var(--border)', paddingTop: '6rem', paddingBottom: '6rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                {/* ── Bio ── */}
                <FadeIn>
                    <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
                        <Label text="About Me" />
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                            Hi, I&apos;m <span style={{ color: 'var(--accent)' }}>Omor Faruk Ullas</span> 👋
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            <p>
                                I&apos;m a <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Full Stack Developer</strong> and{' '}
                                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Software Engineer</strong> currently pursuing Computer Science &amp; Engineering at{' '}
                                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>United International University</strong> in Dhaka, Bangladesh. I&apos;m passionate about turning complex problems into elegant, user-friendly solutions.
                            </p>

                            <p>
                                When I&apos;m not writing code, you&apos;ll find me analyzing football matches ⚽ or exploring the latest developments in web technologies. I believe the best software is built at the intersection of technical excellence and genuine understanding of user needs.
                            </p>

                            <p>
                                I&apos;m always excited to collaborate on innovative projects, contribute to open source, and connect with fellow developers who are passionate about building solutions that matter.
                            </p>

                            <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Let&apos;s build something amazing together! 🚀
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* ── Quick Facts ── */}
                <FadeIn delay={0.05}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {quickFacts.map(({ icon, text }) => (
                            <div key={text} style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.45rem 0.9rem', borderRadius: '8px',
                                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                fontSize: '0.85rem', color: 'var(--text-secondary)',
                            }}>
                                <span>{icon}</span>{text}
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <Divider />

                {/* ── Tech Ecosystem ── */}
                <FadeIn delay={0.05}>
                    <Label text="Technology Ecosystem" />
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                        Languages, Frameworks &amp; Tools
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '580px', lineHeight: 1.7 }}>
                        My strength lies in versatility — I pick the best tool for the job rather than defaulting to the familiar.
                    </p>
                </FadeIn>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '3rem 2rem',
                }}>
                    {techCategories.map((cat, ci) => (
                        <FadeIn key={cat.title} delay={ci * 0.07}>
                            <div>
                                {/* Category header with colored underline */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    marginBottom: '1.25rem', paddingBottom: '0.6rem',
                                    borderBottom: `2px solid ${cat.color}`,
                                }}>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {cat.title}
                                    </span>
                                </div>

                                {/* Skill rows */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cat.skills.map((skill) => (
                                        <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            {/* Label + Percentage */}
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                        width: '20px', flexShrink: 0,
                                                        color: skill.color, fontSize: '1.05rem',
                                                    }}>
                                                        {skill.icon}
                                                    </span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            {/* Progress Bar */}
                                            <div style={{
                                                width: '100%', height: '4px',
                                                background: 'var(--border)',
                                                borderRadius: '2px', overflow: 'hidden',
                                            }}>
                                                <div
                                                    style={{
                                                        height: '100%', width: `${skill.level}%`,
                                                        background: skill.color, borderRadius: '2px',
                                                        boxShadow: `0 0 8px ${skill.color}80`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <Divider />

                {/* ── Strengths ── */}
                <FadeIn delay={0.05}>
                    <Label text="What I Bring" />
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
                        To the Table
                    </h3>
                </FadeIn>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {strengths.map((s, si) => (
                        <FadeIn key={s.title} delay={si * 0.05}>
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px',
                                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                            }}>
                                <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
                                <div>
                                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem' }}>{s.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <Divider />

                {/* ── Philosophy + Beyond Code — Smart Unified Layout ── */}
                <FadeIn delay={0.05}>
                    <Label text="Philosophy &amp; Approach" />
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
                        How I Think &amp; Work
                    </h3>
                </FadeIn>

                {/* Philosophy numbered cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                    {philosophy.map((p, idx) => (
                        <FadeIn key={p} delay={idx * 0.06}>
                            <div style={{
                                padding: '1.5rem',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                height: '100%',
                                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                                transition: 'border-color 0.2s, transform 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <span style={{
                                    fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace',
                                    color: 'var(--accent)', letterSpacing: '0.05em',
                                }}>
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                                    {p}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Beyond Code + Interests — horizontal strip */}
                <FadeIn delay={0.1}>
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '2rem',
                        padding: '1.75rem 2rem',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        alignItems: 'flex-start',
                    }}>
                        {/* Left: text */}
                        <div style={{ flex: '1 1 260px' }}>
                            <Label text="Beyond Code" />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '0.25rem' }}>
                                Football tactics ⚽ &nbsp;·&nbsp; open source contributions &nbsp;·&nbsp; exploring emerging tech.
                                I believe well-rounded people write the best software.
                            </p>
                        </div>
                        {/* Right: opportunity tags */}
                        <div style={{ flex: '1 1 260px' }}>
                            <Label text="Seeking Opportunities In" />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                                {opportunities.map((opp) => (
                                    <span key={opp} style={{
                                        padding: '0.3rem 0.75rem', borderRadius: '999px',
                                        fontSize: '0.8rem', fontWeight: 500,
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text-secondary)',
                                    }}>
                                        {opp}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* ── CTA ── */}
                <FadeIn delay={0.1}>
                    <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                            Open to full-time roles, freelance projects, and collaborations.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contact" style={{
                                display: 'inline-block', padding: '0.8rem 2.25rem',
                                background: 'var(--accent)', color: '#fff',
                                borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
                                textDecoration: 'none', boxShadow: 'var(--shadow-accent)',
                                transition: 'transform 0.2s, background 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--accent-hover)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--accent)'; }}
                            >
                                Get In Touch
                            </Link>
                            <Link href="/projects" style={{
                                display: 'inline-block', padding: '0.78rem 2.25rem',
                                background: 'transparent', color: 'var(--text-primary)',
                                border: '1.5px solid var(--border-strong)', borderRadius: '999px',
                                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                                transition: 'border-color 0.2s, color 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            >
                                View My Work →
                            </Link>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
}
