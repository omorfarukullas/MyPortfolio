'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BlogCard from '@/app/components/BlogCard';
import { BlogPostMeta } from '@/lib/mdx';

interface BlogListClientProps {
    posts: BlogPostMeta[];
    allTags: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogListClient({ posts, allTags }: BlogListClientProps) {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const filtered = useMemo(() => {
        return posts.filter((p) => {
            const matchesQuery =
                !query ||
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase());
            const matchesTag = !activeTag || p.tags.includes(activeTag);
            return matchesQuery && matchesTag;
        });
    }, [posts, query, activeTag]);

    const visible = filtered.slice(0, visibleCount);

    return (
        <>
            {/* Search + Filter */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="search"
                    placeholder="Search articles…"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
                    style={{
                        width: '100%', maxWidth: '420px',
                        padding: '0.65rem 1rem',
                        background: 'var(--bg-surface)', border: '1px solid var(--border)',
                        borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem',
                        outline: 'none', fontFamily: 'inherit',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <button
                        onClick={() => { setActiveTag(''); setVisibleCount(POSTS_PER_PAGE); }}
                        style={{
                            padding: '0.3rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem',
                            fontWeight: 500, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                            borderColor: !activeTag ? 'var(--accent)' : 'var(--border)',
                            background: !activeTag ? 'var(--accent-subtle)' : 'transparent',
                            color: !activeTag ? 'var(--accent)' : 'var(--text-muted)',
                        }}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => { setActiveTag(tag === activeTag ? '' : tag); setVisibleCount(POSTS_PER_PAGE); }}
                            style={{
                                padding: '0.3rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem',
                                fontWeight: 500, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                                borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                                background: activeTag === tag ? 'var(--accent-subtle)' : 'transparent',
                                color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            {(query || activeTag) && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} found
                </p>
            )}

            {/* Grid */}
            {visible.length > 0 ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                        {visible.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    {visibleCount < filtered.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={() => setVisibleCount((v) => v + POSTS_PER_PAGE)}
                                className="btn-ghost"
                            >
                                Load More ({filtered.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>No posts found. Try a different search.</p>
                    <button
                        onClick={() => { setQuery(''); setActiveTag(''); }}
                        style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </>
    );
}
