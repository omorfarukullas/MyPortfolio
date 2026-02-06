"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSound } from '../hooks/useSoundEffects';
import { useMobile } from '../hooks/useMobile';
import { usePerformance } from './PerformanceProvider';

const subjectOptions = [
    "Collaboration",
    "Project Inquiry",
    "Just Saying Hi",
    "Other"
];

export default function ContactSection() {
    const [sectionRef, isInView] = useScrollAnimation(0.1);
    const [formRef, isFormInView] = useScrollAnimation(0.2);
    const [funFactsRef, isFunFactsInView] = useScrollAnimation(0.2);
    const [socialRef, isSocialInView] = useScrollAnimation(0.2);
    const { playSound } = useSound();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: subjectOptions[0],
        message: ''
    });

    const [focusedField, setFocusedField] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitState, setSubmitState] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        playSound('click');

        if (!validateForm()) {
            setSubmitState('error');
            playSound('error');
            setTimeout(() => setSubmitState('idle'), 2000);
            return;
        }

        setSubmitState('loading');
        playSound('hover'); // Launch sound substitute

        try {
            // Using Formspree - replace 'YOUR_FORM_ID' with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/xbdarqwv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitState('success');
                playSound('success');
                setFormData({ name: '', email: '', subject: subjectOptions[0], message: '' });
                setTimeout(() => setSubmitState('idle'), 3000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            setSubmitState('error');
            playSound('error');
            setTimeout(() => setSubmitState('idle'), 3000);
        }
    };

    const messageLength = formData.message.length;
    const maxLength = 500;

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f] flex items-center"
        >
            {/* Simplified background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f]" />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Single subtle glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto w-full">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyber-purple via-neon-cyan to-cyber-purple bg-clip-text text-transparent">
                            Let's Build Something Together 🚀
                        </span>
                    </h2>
                    <p className="text-foreground/60 text-lg">
                        Open for collaboration on innovative projects
                    </p>

                    {/* Minimal decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.18, delay: 0.05 }}
                        className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-cyber-purple to-neon-cyan"
                    />
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    ref={formRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.18, delay: 0.1 }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 shadow-2xl"
                    >
                        {/* Subtle top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />

                        <div className="relative space-y-8">
                            {/* Name Field */}
                            <div className="relative pt-2">
                                <motion.input
                                    id="name-input"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg outline-none transition-all ${errors.name
                                        ? 'border-red-500/50'
                                        : focusedField === 'name'
                                            ? 'border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                            : 'border-white/10'
                                        }`}
                                    placeholder=" "
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                <motion.label
                                    htmlFor="name-input"
                                    animate={{
                                        y: focusedField === 'name' || formData.name ? -28 : 0,
                                        scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                                        color: errors.name
                                            ? '#ef4444'
                                            : focusedField === 'name'
                                                ? '#06b6d4'
                                                : 'rgba(255, 255, 255, 0.4)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-4 top-3 pointer-events-none origin-left font-medium text-sm"
                                >
                                    Your Name
                                </motion.label>
                                {errors.name && (
                                    <motion.p
                                        id="name-error"
                                        role="alert"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                                    >
                                        <span>⚠️</span> {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="relative pt-2">
                                <motion.input
                                    id="email-input"
                                    type="email"
                                    inputMode="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg outline-none transition-all ${errors.email
                                        ? 'border-red-500/50'
                                        : focusedField === 'email'
                                            ? 'border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                            : 'border-white/10'
                                        }`}
                                    placeholder=" "
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                <motion.label
                                    htmlFor="email-input"
                                    animate={{
                                        y: focusedField === 'email' || formData.email ? -28 : 0,
                                        scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                                        color: errors.email
                                            ? '#ef4444'
                                            : focusedField === 'email'
                                                ? '#06b6d4'
                                                : 'rgba(255, 255, 255, 0.4)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-4 top-3 pointer-events-none origin-left font-medium text-sm"
                                >
                                    Your.email@example.com
                                </motion.label>
                                {errors.email && (
                                    <motion.p
                                        id="email-error"
                                        role="alert"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                                    >
                                        <span>⚠️</span> {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Subject Dropdown */}
                            <div className="relative pt-2">
                                <motion.select
                                    id="subject-input"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg outline-none transition-all appearance-none cursor-pointer ${focusedField === 'subject'
                                        ? 'border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                        : 'border-white/10'
                                        }`}
                                >
                                    {subjectOptions.map(option => (
                                        <option key={option} value={option} className="bg-[#0a0a0f] text-white">
                                            {option}
                                        </option>
                                    ))}
                                </motion.select>
                                <motion.label
                                    htmlFor="subject-input"
                                    animate={{
                                        y: -28,
                                        scale: 0.85,
                                        color: focusedField === 'subject' ? '#06b6d4' : 'rgba(255, 255, 255, 0.4)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-4 top-3 pointer-events-none origin-left font-medium text-sm"
                                >
                                    Subject
                                </motion.label>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div className="relative pt-2">
                                <motion.textarea
                                    id="message-input"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    maxLength={maxLength}
                                    rows={5}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg outline-none transition-all resize-none ${errors.message
                                        ? 'border-red-500/50'
                                        : focusedField === 'message'
                                            ? 'border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                            : 'border-white/10'
                                        }`}
                                    placeholder=" "
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                />
                                <motion.label
                                    htmlFor="message-input"
                                    animate={{
                                        y: focusedField === 'message' || formData.message ? -28 : 12,
                                        scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                                        color: errors.message
                                            ? '#ef4444'
                                            : focusedField === 'message'
                                                ? '#06b6d4'
                                                : 'rgba(255, 255, 255, 0.4)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-4 pointer-events-none origin-left font-medium text-sm"
                                >
                                    Tell me about your idea...
                                </motion.label>
                                <div className="absolute bottom-2 right-3 text-xs text-white/30 font-mono">
                                    {messageLength}/{maxLength}
                                </div>
                                {errors.message && (
                                    <motion.p
                                        id="message-error"
                                        role="alert"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                                    >
                                        <span>⚠️</span> {errors.message}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={submitState === 'loading' || submitState === 'success'}
                                whileHover={submitState === 'idle' ? { y: -4, scale: 1.01 } : {}}
                                onMouseEnter={() => playSound('hover')}
                                whileTap={submitState === 'idle' ? { scale: 0.99 } : {}}
                                animate={
                                    submitState === 'loading'
                                        ? { y: [-2, -8, -2] }
                                        : submitState === 'success'
                                            ? { y: -60, opacity: 0, scale: 0.8 }
                                            : submitState === 'error'
                                                ? { x: [-3, 3, -3, 3, 0] }
                                                : {}
                                }
                                transition={
                                    submitState === 'loading'
                                        ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                        : submitState === 'success'
                                            ? { duration: 0.6, ease: "easeIn" }
                                            : submitState === 'error'
                                                ? { duration: 0.4 }
                                                : { duration: 0.2 }
                                }
                                className="w-full py-4 rounded-lg font-bold text-lg relative overflow-hidden group"
                                style={{
                                    background: submitState === 'success'
                                        ? 'linear-gradient(135deg, #22c55e, #10b981)'
                                        : submitState === 'error'
                                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                            : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                    boxShadow: submitState === 'idle'
                                        ? '0 4px 15px rgba(139, 92, 246, 0.3)'
                                        : submitState === 'success'
                                            ? '0 8px 35px rgba(34, 197, 94, 0.4)'
                                            : submitState === 'error'
                                                ? '0 8px 25px rgba(239, 68, 68, 0.3)'
                                                : '0 4px 15px rgba(139, 92, 246, 0.3)',
                                }}
                            >
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

                                {/* Button content */}
                                <span className="relative">
                                    {submitState === 'idle' && "Send Message 🚀"}
                                    {submitState === 'loading' && (
                                        <span className="flex items-center justify-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                🚀
                                            </motion.span>
                                            Launching...
                                        </span>
                                    )}
                                    {submitState === 'success' && "✅ Message Sent!"}
                                    {submitState === 'error' && "❌ Something went wrong"}
                                </span>

                                {/* Minimal confetti on success */}
                                {submitState === 'success' && (
                                    <>
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1.5 h-1.5 rounded-full"
                                                style={{
                                                    background: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
                                                    left: '50%',
                                                    top: '50%',
                                                }}
                                                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                                animate={{
                                                    scale: [0, 1, 0],
                                                    x: Math.cos((i / 12) * Math.PI * 2) * 80,
                                                    y: Math.sin((i / 12) * Math.PI * 2) * 80 - 30,
                                                    opacity: [1, 1, 0],
                                                }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                            />
                                        ))}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Fun Facts Floating Card */}
                <motion.div
                    ref={funFactsRef}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isFunFactsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 max-w-sm mx-auto"
                >
                    <FunFactsCard />
                </motion.div>

                {/* Social Links Constellation */}
                <motion.div
                    ref={socialRef}
                    initial={{ opacity: 0 }}
                    animate={isSocialInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.18, delay: 0.15 }}
                    className="mt-16"
                >
                    <h3 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent">
                        Connect With Me
                    </h3>

                    <SocialConstellation />
                </motion.div>
            </div>
        </section>
    );
}

// Fun Facts Card Component
function FunFactsCard() {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const funFacts = [
        "⚽ Football analyst who codes",
        "🏥 Building healthcare solutions",
        "💻 TypeScript enthusiast",
        "🎓 UIU CSE Student",
        "🚀 Open source contributor",
        "🌟 Always learning new tech",
    ];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, funFacts.length]);

    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative"
        >
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyber-purple/10 to-neon-cyan/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />

                {/* Title */}
                <h4 className="text-lg font-bold mb-4 bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent flex items-center gap-2">
                    ⚡ Quick Facts
                    {isPaused && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-xs text-white/40"
                        >
                            (paused)
                        </motion.span>
                    )}
                </h4>

                {/* Rotating Fact */}
                <div className="relative h-16 flex items-center justify-center overflow-hidden">
                    {funFacts.map((fact, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: currentFactIndex === index ? 1 : 0,
                                y: currentFactIndex === index ? 0 : 20,
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute text-center text-foreground/80 font-medium"
                        >
                            {fact}
                        </motion.p>
                    ))}
                </div>

                {/* Progress Indicator Dots */}
                <div className="flex gap-1.5 justify-center mb-4 mt-2">
                    {funFacts.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentFactIndex(index)}
                            className="w-1.5 h-1.5 rounded-full transition-all"
                            style={{
                                background: currentFactIndex === index
                                    ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                                    : 'rgba(255, 255, 255, 0.2)',
                            }}
                            animate={{
                                scale: currentFactIndex === index ? 1.3 : 1,
                            }}
                            whileHover={{ scale: 1.5 }}
                        />
                    ))}
                </div>

                {/* More About Me Button */}
                <motion.a
                    href="#about"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full py-2.5 px-4 rounded-lg text-center font-bold text-sm relative overflow-hidden group"
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/0 via-cyber-purple/20 to-cyber-purple/0 group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative bg-gradient-to-r from-cyber-purple to-neon-cyan bg-clip-text text-transparent">
                        More About Me →
                    </span>
                </motion.a>
            </div>
        </motion.div>
    );
}

// Social Constellation Component
function SocialConstellation() {
    const { playSound } = useSound();
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [clickedIcon, setClickedIcon] = useState(null);
    const isMobile = useMobile();
    const { isReduced } = usePerformance();

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/omorfarukullas',
            color: '#8b5cf6',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/omorullas',
            color: '#0ea5e9',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: 'X',
            url: 'https://x.com/berlinsergio34',
            color: '#ffffff',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/sergio.marquina.203120',
            color: '#1877f2',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/_sergio._.marquina_/',
            color: '#e4405f',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: 'WhatsApp',
            url: 'https://wa.me/01300712512',
            color: '#25d366',
            icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
        },
        {
            name: 'Email',
            url: 'mailto:omor.farukh16@gmail.com',
            color: '#ef4444',
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            name: 'Portfolio',
            url: '#home',
            color: '#06b6d4',
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
        },
    ];

    // Calculate orbital positions
    const getOrbitalPosition = (index, total) => {
        if (isMobile) {
            // Mobile: horizontal row
            const spacing = 70;
            const offset = ((total - 1) * spacing) / 2;
            return { x: (index * spacing) - offset, y: 0 };
        }
        // Desktop: circular orbit
        const radius = 140;
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    const handleClick = (index, url) => {
        setClickedIcon(index);
        setTimeout(() => {
            setClickedIcon(null);
            window.open(url, url.startsWith('#') ? '_self' : '_blank');
        }, 600);
    };

    return (
        <div className={`relative ${isMobile ? 'h-40' : 'h-96'} flex items-center justify-center`}>
            {/* Central holographic core */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {/* Orbital rings */}
                {!isMobile && [120, 140, 160].map((radius, i) => (
                    <motion.div
                        key={radius}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{
                            width: radius * 2,
                            height: radius * 2,
                            borderColor: `rgba(139, 92, 246, ${0.1 - i * 0.03})`,
                            borderStyle: i === 1 ? 'dashed' : 'solid',
                        }}
                        animate={{
                            rotate: i % 2 === 0 ? 360 : -360,
                        }}
                        transition={{
                            duration: isReduced ? 0 : 40 + i * 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}

                {/* Center pulse */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyber-purple"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>

            {/* Connecting constellation paths - desktop only */}
            {!isMobile && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    {socialLinks.map((link, i) => {
                        const nextLink = socialLinks[(i + 1) % socialLinks.length];
                        const pos1 = getOrbitalPosition(i, socialLinks.length);
                        const pos2 = getOrbitalPosition((i + 1) % socialLinks.length, socialLinks.length);

                        return (
                            <motion.path
                                key={i}
                                d={`M ${50 + (pos1.x / 4)}% ${50 + (pos1.y / 4)}% L ${50 + (pos2.x / 4)}% ${50 + (pos2.y / 4)}%`}
                                stroke="url(#pathGradient)"
                                strokeWidth="1"
                                fill="none"
                                strokeDasharray="5,5"
                                animate={{
                                    strokeDashoffset: [0, -10],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{
                                    strokeDashoffset: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    opacity: {
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    },
                                }}
                            />
                        );
                    })}
                </svg>
            )}

            {/* Social Icons */}
            {socialLinks.map((link, index) => {
                const position = getOrbitalPosition(index, socialLinks.length);

                return (
                    <motion.div
                        key={link.name}
                        className="absolute top-1/2 left-1/2 cursor-pointer group focus:outline-none"
                        style={{
                            x: position.x,
                            y: position.y,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: isMobile ? 0 : [position.y, position.y - 8, position.y],
                        }}
                        transition={{
                            scale: { delay: index * 0.1, duration: 0.5, type: 'spring' },
                            opacity: { delay: index * 0.1, duration: 0.5 },
                            y: {
                                duration: 2.5 + index * 0.3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                        whileHover={!isMobile ? {
                            scale: 1.3,
                            y: position.y - 25,
                            transition: { duration: 0.3 },
                        } : { scale: 1.15 }}
                        whileFocus={{ scale: 1.2 }}
                        onHoverStart={() => setHoveredIcon(index)}
                        onHoverEnd={() => setHoveredIcon(null)}
                        onClick={() => handleClick(index, link.url)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleClick(index, link.url);
                            }
                        }}
                        role="link"
                        aria-label={`Visit ${link.name}`}
                        tabIndex={0}
                    >
                        {/* Icon container with hexagonal frame */}
                        <motion.div
                            className="relative w-14 h-14 -translate-x-1/2 -translate-y-1/2"
                            animate={clickedIcon === index ? {
                                scale: [1, 1.3, 1, 1.3, 1, 1.3, 1],
                                rotate: [0, 10, -10, 10, 0],
                            } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, ${link.color}60, transparent 70%)`,
                                    filter: isMobile ? 'blur(10px)' : 'blur(20px)',
                                }}
                                animate={{
                                    scale: hoveredIcon === index ? [1, 1.4, 1] : 1,
                                    opacity: hoveredIcon === index ? [0.6, 1, 0.6] : 0.4,
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: hoveredIcon === index ? Infinity : 0,
                                }}
                            />

                            {/* Hexagonal border frame */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                    background: `linear-gradient(135deg, ${link.color}40, ${link.color}20)`,
                                    border: `1.5px solid ${link.color}60`,
                                }}
                                animate={{
                                    rotate: hoveredIcon === index ? 360 : 0,
                                }}
                                transition={{
                                    duration: 3,
                                    ease: 'linear',
                                }}
                            />

                            {/* Holographic scan line */}
                            {!isMobile && (
                                <motion.div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                    }}
                                >
                                    <motion.div
                                        className="absolute w-full h-[2px]"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`,
                                            boxShadow: `0 0 10px ${link.color}`,
                                        }}
                                        animate={{
                                            y: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.2,
                                            ease: 'linear',
                                        }}
                                    />
                                </motion.div>
                            )}

                            {/* Inner icon circle */}
                            <div
                                className="relative w-full h-full rounded-full p-3 backdrop-blur-md flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${link.color}25, ${link.color}10)`,
                                    border: `1px solid ${link.color}50`,
                                    color: link.color,
                                    boxShadow: `inset 0 0 10px ${link.color}20`,
                                }}
                            >
                                {link.icon}
                            </div>

                            {/* Corner tech accents */}
                            {!isMobile && hoveredIcon === index && (
                                <>
                                    {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                                        <motion.div
                                            key={i}
                                            className={`absolute ${pos} w-2 h-2`}
                                            style={{
                                                background: link.color,
                                                boxShadow: `0 0 8px ${link.color}`,
                                            }}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                        />
                                    ))}
                                </>
                            )}

                            {/* Enhanced particle burst */}
                            {hoveredIcon === index && !isMobile && (
                                <>
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1.5 h-1.5 rounded-full"
                                            style={{
                                                background: link.color,
                                                left: '50%',
                                                top: '50%',
                                                boxShadow: `0 0 4px ${link.color}`,
                                            }}
                                            initial={{ scale: 0, x: 0, y: 0 }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                x: Math.cos((i / 12) * Math.PI * 2) * 40,
                                                y: Math.sin((i / 12) * Math.PI * 2) * 40,
                                                opacity: [1, 0.5, 0],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                repeatDelay: 0.3,
                                                delay: i * 0.05,
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </motion.div>

                        {/* Floating label with tech styling */}
                        {hoveredIcon === index && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap z-50"
                            >
                                <div
                                    className="relative px-4 py-1.5 rounded font-bold text-xs backdrop-blur-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${link.color}30, ${link.color}15)`,
                                        border: `1px solid ${link.color}60`,
                                        color: link.color,
                                        boxShadow: `0 0 20px ${link.color}40, inset 0 0 10px ${link.color}20`,
                                    }}
                                >
                                    {/* Tech corners on label */}
                                    <div className="absolute top-0 left-0 w-1 h-1" style={{ background: link.color }} />
                                    <div className="absolute top-0 right-0 w-1 h-1" style={{ background: link.color }} />
                                    <div className="absolute bottom-0 left-0 w-1 h-1" style={{ background: link.color }} />
                                    <div className="absolute bottom-0 right-0 w-1 h-1" style={{ background: link.color }} />

                                    <span className="relative z-10">{link.name}</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
