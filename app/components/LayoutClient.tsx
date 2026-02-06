"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import FloatingNav from "./FloatingNav";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen from "./LoadingScreen";
import InteractiveBackground from "./InteractiveBackground";
import { SoundProvider } from "../hooks/useSoundEffects";
import SoundToggle from "./SoundToggle";
import GoogleAnalytics from "./GoogleAnalytics";
import InstallPrompt from "./InstallPrompt";
import { PerformanceProvider } from "./PerformanceProvider";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [shouldRenderBackground, setShouldRenderBackground] = useState(false);

    useEffect(() => {
        // Defer background rendering to post-interaction or idle
        const timer = setTimeout(() => setShouldRenderBackground(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PerformanceProvider>
            <SoundProvider>
                {/* Analytics - Loaded silently */}
                <GoogleAnalytics
                    measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
                />
                <Analytics />

                {/* PWA Install Prompt - Non-blocking */}
                <InstallPrompt />

                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>

                {/* Faster Loading Screen (180ms-250ms target) */}
                <LoadingScreen onComplete={() => setLoadingComplete(true)} />

                <FloatingNav />
                <ScrollProgress />
                <SoundToggle />

                {/* Interactive Particle Background - Deferred */}
                {shouldRenderBackground && <InteractiveBackground />}

                {/* Main content */}
                <div
                    id="main-content"
                    className="relative z-10 transition-opacity duration-150"
                    style={{ opacity: loadingComplete ? 1 : 0 }}
                >
                    {children}
                </div>
            </SoundProvider>
        </PerformanceProvider>
    );
}
