"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ReducedQualityContext = createContext({
    isReduced: false,
    fps: 60,
});

export const usePerformance = () => useContext(ReducedQualityContext);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
    const [isReduced, setIsReduced] = useState(false);
    const [fps, setFps] = useState(60);

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let lowFpsCount = 0;

        const checkFps = () => {
            const now = performance.now();
            frameCount++;

            if (now - lastTime >= 1000) {
                const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
                setFps(currentFps);

                if (currentFps < 55) {
                    lowFpsCount++;
                    if (lowFpsCount >= 3) { // 3 consecutive seconds of low FPS
                        setIsReduced(true);
                    }
                } else {
                    lowFpsCount = 0;
                }

                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(checkFps);
        };

        const handleId = requestAnimationFrame(checkFps);
        return () => cancelAnimationFrame(handleId);
    }, []);

    return (
        <ReducedQualityContext.Provider value={{ isReduced, fps }}>
            {children}
        </ReducedQualityContext.Provider>
    );
}
