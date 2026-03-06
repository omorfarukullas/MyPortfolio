import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactSection from '@/app/components/ContactSection';

export const metadata = generatePageMetadata({
    title: 'Contact',
    description: 'Get in touch with Omor Faruk Ullas for project collaborations, freelance work, or just to say hello.',
    canonical: `${seoConfig.siteUrl}/contact`,
});

const webPageSchema = generateWebPageSchema(
    'Contact — Omor Faruk Ullas',
    'Get in touch with Omor Faruk Ullas for project collaborations or freelance opportunities.',
    `${seoConfig.siteUrl}/contact`,
);

export default function ContactPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
