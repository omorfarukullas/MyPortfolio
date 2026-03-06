import { getAllPosts, getAllTags } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogListClient from './BlogListClient';

export const metadata = generatePageMetadata({
    title: 'Blog',
    description: 'Articles on Full Stack Development, React, Next.js, Node.js, and building real-world solutions.',
    canonical: 'https://omorfarukullas.vercel.app/blog',
});

export default function BlogPage() {
    const posts = getAllPosts();
    const allTags = getAllTags();

    return (
        <>
            <Header />
            <main style={{ paddingTop: '80px' }}>
                <div className="container section">
                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem', maxWidth: '560px' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Blog
                        </p>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                            Writing & Thoughts
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Articles on full-stack development, healthcare tech, and the things I learn building in public.
                        </p>
                    </div>

                    <BlogListClient posts={posts} allTags={allTags} />
                </div>
            </main>
            <Footer />
        </>
    );
}
