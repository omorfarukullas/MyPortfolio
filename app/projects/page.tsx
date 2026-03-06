import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProjectsSection from '@/app/components/ProjectsSection';

export const metadata = generatePageMetadata({
    title: 'Projects',
    description: 'Portfolio of projects built by Omor Faruk Ullas — from healthcare platforms to desktop tools.',
    canonical: `${seoConfig.siteUrl}/projects`,
});

const webPageSchema = generateWebPageSchema(
    'Projects — Omor Faruk Ullas',
    'Explore projects built by Omor Faruk Ullas including MediconnectBD, a smart healthcare platform.',
    `${seoConfig.siteUrl}/projects`,
);

export default function ProjectsPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <ProjectsSection />
            </main>
            <Footer />
        </>
    );
}
