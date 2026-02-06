"use client";

import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import FloatingNav from "./FloatingNav";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen from "./LoadingScreen";
import InteractiveBackground from "./InteractiveBackground";
import { SoundProvider } from "../hooks/useSoundEffects";
import SoundToggle from "./SoundToggle";
import GoogleAnalytics from "./GoogleAnalytics";
import InstallPrompt from "./InstallPrompt";

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loadingComplete, setLoadingComplete] = useState(false);

    return (
        <SoundProvider>
            {/* Analytics */}
            <GoogleAnalytics
                measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            />
            <Analytics />

            {/* PWA Install Prompt */}
            <InstallPrompt />

            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <LoadingScreen onComplete={() => setLoadingComplete(true)} />
            <FloatingNav />
            <ScrollProgress />
            <SoundToggle />

            {/* Interactive Particle Background */}
            <InteractiveBackground />

            {/* Main content */}
            <div id="main-content" className="relative z-10">
                {children}
            </div>
        </SoundProvider>
    );
}
