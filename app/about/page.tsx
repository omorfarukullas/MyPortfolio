import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AboutSection from '@/app/components/AboutSection';

export const metadata = generatePageMetadata({
    title: 'About',
    description: 'Learn more about Omor Faruk Ullas — a CSE student at United International University building innovative full-stack solutions.',
    canonical: `${seoConfig.siteUrl}/about`,
});

const webPageSchema = generateWebPageSchema(
    'About — Omor Faruk Ullas',
    'Learn more about Omor Faruk Ullas, a Full Stack Developer and CSE student at UIU.',
    `${seoConfig.siteUrl}/about`,
);

export default function AboutPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <AboutSection />
            </main>
            <Footer />
        </>
    );
}
