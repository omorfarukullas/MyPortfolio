'use client';

import Link from 'next/link';

import { BlogPostMeta } from '@/lib/mdx';
import { formatDateShort } from '@/lib/utils';

interface BlogCardProps {
    post: BlogPostMeta;
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <article
                className="card"
                style={{
                    padding: featured ? '2rem' : '1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
            >
                {/* Tags */}
                {post.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tag" style={{ fontSize: '0.72rem' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3 style={{
                    fontSize: featured ? '1.25rem' : '1rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '0',
                }}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {post.description}
                </p>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                    <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        Read
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </article>
        </Link>
    );
}
