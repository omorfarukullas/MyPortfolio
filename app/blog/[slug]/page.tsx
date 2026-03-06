import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPostBySlug, getRelatedPosts, getAdjacentPosts } from '@/lib/mdx';
import { generatePageMetadata, generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogCard from '@/app/components/BlogCard';
import Link from 'next/link';

interface Params { slug: string }

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);
    if (!post) return {};
    return generatePageMetadata({
        title: post.seo_title || post.title,
        description: post.seo_description || post.description,
        ogImage: post.featured_image || undefined,
        canonical: `${seoConfig.siteUrl}/blog/${post.slug}`,
        type: 'article',
        publishedAt: post.date,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);
    if (!post) notFound();

    const related = getRelatedPosts(post.slug, post.tags);
    const { prev, next } = getAdjacentPosts(post.slug);

    const blogSchema = generateBlogPostingSchema(post);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: seoConfig.siteUrl },
        { name: 'Blog', url: `${seoConfig.siteUrl}/blog` },
        { name: post.title, url: `${seoConfig.siteUrl}/blog/${post.slug}` },
    ]);

    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <main style={{ paddingTop: '80px' }}>
                <article>
                    {/* Post Header */}
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <div className="container" style={{ paddingTop: '3rem', maxWidth: '780px' }}>
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                                <span>/</span>
                                <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
                                <span>/</span>
                                <span style={{ color: 'var(--text-secondary)' }}>{post.title}</span>
                            </nav>

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                                {post.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?tag=${tag}`}>
                                        <span className="tag">{tag}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
                                {post.title}
                            </h1>

                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                {post.description}
                            </p>

                            {/* Meta */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{post.author}</span>
                                <span>·</span>
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                <span>·</span>
                                <span>{post.readTime} min read</span>

                                {/* Share buttons */}
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.78rem' }}>Share:</span>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${seoConfig.siteUrl}/blog/${post.slug}`)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        aria-label="Share on Twitter"
                                        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                                        className="hover-accent-text"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${seoConfig.siteUrl}/blog/${post.slug}`)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        aria-label="Share on LinkedIn"
                                        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                                        className="hover-accent-text"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="container" style={{ maxWidth: '780px', paddingBottom: '4rem' }}>
                        <div className="prose">
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                                    },
                                }}
                            />
                        </div>

                        {/* Tags at bottom */}
                        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Topics</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {post.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?tag=${tag}`}>
                                        <span className="tag">{tag}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Prev / Next */}
                        {(prev || next) && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                                {prev ? (
                                    <Link href={`/blog/${prev.slug}`} style={{ textDecoration: 'none' }}>
                                        <div className="card hover-border-accent" style={{ padding: '1.25rem' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>← Previous</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{prev.title}</p>
                                        </div>
                                    </Link>
                                ) : <div />}
                                {next ? (
                                    <Link href={`/blog/${next.slug}`} style={{ textDecoration: 'none' }}>
                                        <div className="card hover-border-accent" style={{ padding: '1.25rem', textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Next →</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{next.title}</p>
                                        </div>
                                    </Link>
                                ) : <div />}
                            </div>
                        )}

                        {/* Related Posts */}
                        {related.length > 0 && (
                            <div style={{ marginTop: '3rem' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>Related Articles</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                                    {related.map((p) => (
                                        <BlogCard key={p.slug} post={p} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
