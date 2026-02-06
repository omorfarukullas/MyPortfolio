"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check if already dismissed
        const isDismissed = localStorage.getItem("pwa-install-dismissed");
        if (isDismissed) {
            setDismissed(true);
            return;
        }

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
            // Show install button after 3 seconds
            setTimeout(() => {
                setShowInstallButton(true);
            }, 3000);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("User accepted the install prompt");
        } else {
            console.log("User dismissed the install prompt");
        }

        // Clear the deferredPrompt
        setDeferredPrompt(null);
        setShowInstallButton(false);
    };

    const handleDismiss = () => {
        setShowInstallButton(false);
        setDismissed(true);
        localStorage.setItem("pwa-install-dismissed", "true");
    };

    if (dismissed || !showInstallButton) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
            >
                <div className="bg-gradient-to-r from-cyber-purple/90 to-neon-cyan/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
                        aria-label="Dismiss install prompt"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-white font-bold mb-1">Install Portfolio App</h3>
                            <p className="text-white/80 text-sm mb-3">
                                Add to your home screen for quick access and offline viewing
                            </p>
                            <button
                                onClick={handleInstallClick}
                                className="w-full bg-white text-cyber-purple font-bold py-2 px-4 rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Install Now
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
