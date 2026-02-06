import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param threshold - Percentage of element visible before trigger (0-1)
 * @param triggerOnce - If true, animation triggers only once
 * @returns [ref, isInView] - Ref to attach to element and visibility state
 */
export function useScrollAnimation(threshold = 0.2, triggerOnce = true) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (triggerOnce && hasTriggered.current) return;
                    setIsInView(true);
                    hasTriggered.current = true;
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            {
                threshold,
                rootMargin: '0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [threshold, triggerOnce]);

    return [ref, isInView];
}

/**
 * Hook for parallax scroll effect
 * @param speed - Parallax speed multiplier (0.5 = half speed)
 * @returns [ref, offset] - Ref and current Y offset
 */
export function useParallax(speed = 0.5) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let animationFrameId;

        const handleScroll = () => {
            if (animationFrameId) return;

            animationFrameId = requestAnimationFrame(() => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const scrolled = window.scrollY;
                const elementTop = rect.top + scrolled;
                const offsetY = (scrolled - elementTop) * speed;
                setOffset(offsetY);
                animationFrameId = null;
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [speed]);

    return [ref, offset];
}
