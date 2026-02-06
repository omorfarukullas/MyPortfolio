"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics({
    measurementId,
}: {
    measurementId?: string;
}) {
    useEffect(() => {
        // Only load in production and if measurement ID is provided
        if (
            process.env.NODE_ENV !== "production" ||
            !measurementId ||
            measurementId === "G-XXXXXXXXXX"
        ) {
            return;
        }

        // Load Google Analytics script
        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script1);

        // Initialize gtag
        const script2 = document.createElement("script");
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_path: window.location.pathname,
      });
    `;
        document.head.appendChild(script2);

        return () => {
            // Cleanup scripts on unmount
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, [measurementId]);

    return null;
}

// Helper function to track custom events
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Predefined event trackers
export const analytics = {
    trackPageView: (url: string) => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
                page_path: url,
            });
        }
    },
    trackButtonClick: (buttonName: string) => {
        trackEvent("click", "Button", buttonName);
    },
    trackFormSubmit: (formName: string) => {
        trackEvent("submit", "Form", formName);
    },
    trackProjectView: (projectName: string) => {
        trackEvent("view", "Project", projectName);
    },
    trackSocialClick: (platform: string) => {
        trackEvent("click", "Social", platform);
    },
};
