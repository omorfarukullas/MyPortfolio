// Color utilities and helper functions

/**
 * Theme color palette
 */
export const colors = {
    cyberPurple: '#8B5CF6',
    neonCyan: '#06B6D4',
    accentPurple: '#A78BFA',
    darkBg: '#0F172A',
    darkSurface: '#1E293B',
    border: '#334155',
    foreground: '#E2E8F0',
} as const;

/**
 * Get a color with opacity
 * @param color - Hex color code
 * @param opacity - Opacity value (0-1)
 */
export function withOpacity(color: string, opacity: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Animation duration constants
 */
export const animationDurations = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 1,
} as const;

/**
 * Common easing functions
 */
export const easings = {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    spring: [0.6, -0.05, 0.01, 0.99],
} as const;
