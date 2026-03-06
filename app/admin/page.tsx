'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function AdminDashboard() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !content) {
            setErrorMessage('Title, description, and content are required.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    tags,
                    content,
                    published: true
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to publish post');
            }

            setStatus('success');

            // Wait 2 seconds then redirect to the blog page to view the new post
            setTimeout(() => {
                router.push('/blog');
            }, 2000);

        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'An unknown error occurred.');
        }
    };

    return (
        <>
            <Header />
            <main style={{ paddingTop: '100px', minHeight: '90vh' }}>
                <div className="container" style={{ maxWidth: '800px', paddingBottom: '4rem' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Local Dashboard
                        </p>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                            Write a new Post ✍️
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            When you publish here, an `.mdx` file will be created locally in your `/content/blogs` folder. Commit and push it to Vercel to go live!
                        </p>
                    </div>

                    {/* Status Alerts */}
                    {status === 'success' && (
                        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', color: '#10b981', borderRadius: '4px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <strong>Success!</strong> Your post was written to disk. Redirecting to blog...
                        </div>
                    )}

                    {status === 'error' && (
                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', color: '#ef4444', borderRadius: '4px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <strong>Error:</strong> {errorMessage}
                        </div>
                    )}

                    {/* The Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}>

                        {/* Title */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="title" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Post Title <span style={{ color: 'var(--accent)' }}>*</span></label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Building a Unified Healthcare System"
                                required
                                style={{
                                    padding: '0.8rem 1rem', borderRadius: '8px',
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    color: 'var(--text-primary)', fontSize: '1rem', outline: 'none',
                                    transition: 'border-color 0.2s', width: '100%'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        {/* Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="description" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Short Description <span style={{ color: 'var(--accent)' }}>*</span></label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A brief summary for the blog cards..."
                                required
                                style={{
                                    padding: '0.8rem 1rem', borderRadius: '8px',
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    color: 'var(--text-primary)', fontSize: '1rem', outline: 'none',
                                    transition: 'border-color 0.2s', width: '100%'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="tags" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Tags (comma separated)</label>
                            <input
                                id="tags"
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g. Next.js, React, Node, SQL"
                                style={{
                                    padding: '0.8rem 1rem', borderRadius: '8px',
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    color: 'var(--text-primary)', fontSize: '1rem', outline: 'none',
                                    transition: 'border-color 0.2s', width: '100%'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        {/* Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="content" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Markdown Content <span style={{ color: 'var(--accent)' }}>*</span></label>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You can use standard Markdown like **bold**, *italics*, # Headers, and codeblocks.</p>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="# Introduction\n\nStart writing your amazing post here..."
                                required
                                style={{
                                    padding: '1rem', borderRadius: '8px',
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                    color: 'var(--text-primary)', fontSize: '1rem', outline: 'none',
                                    transition: 'border-color 0.2s', width: '100%', minHeight: '400px',
                                    fontFamily: 'monospace', resize: 'vertical'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                marginTop: '1rem', padding: '1rem 2rem', borderRadius: '8px',
                                background: status === 'loading' ? 'var(--border)' : 'var(--accent)',
                                color: '#fff', fontSize: '1.05rem', fontWeight: 700,
                                border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer',
                                transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
                            }}
                        >
                            {status === 'loading' ? 'Publishing...' : 'Publish Post to Disk 🚀'}
                        </button>

                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
