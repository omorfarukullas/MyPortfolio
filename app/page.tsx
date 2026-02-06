"use client";

import dynamic from 'next/dynamic';
// Dynamically import sections to reduce initial bundle size
const AboutSection = dynamic(() => import('./components/AboutSection'));
const SkillsOrbit = dynamic(() => import('./components/SkillsOrbit'));
const ProjectsGallery = dynamic(() => import('./components/ProjectsGallery'));
const ExperienceTimeline = dynamic(() => import('./components/ExperienceTimeline'));
const ContactSection = dynamic(() => import('./components/ContactSection'));

// FloatingHeroSimple is client-only (particles/animations)
const FloatingHeroSimple = dynamic(
  () => import('./components/FloatingHeroSimple'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingHeroSimple />
      <AboutSection />
      <SkillsOrbit />
      <ProjectsGallery />
      <ExperienceTimeline />
      <ContactSection />
    </main>
  );
}


