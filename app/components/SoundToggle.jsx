"use client";

import { useSound } from '../hooks/useSoundEffects';
import { motion } from 'framer-motion';

export default function SoundToggle() {
    const { isEnabled, toggleSound } = useSound();

    return (
        <motion.button
            onClick={toggleSound}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg group"
            style={{
                background: isEnabled
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                borderColor: isEnabled
                    ? 'rgba(139, 92, 246, 0.4)'
                    : 'rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {isEnabled ? (
                // Speaker Icon (Sound On)
                <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            ) : (
                // Mute Icon
                <svg className="w-5 h-5 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            )}

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            </span>
        </motion.button>
    );
}
