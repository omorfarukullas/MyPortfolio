import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { estimateReadTime } from './utils';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    featured_image?: string;
    published: boolean;
    seo_title?: string;
    seo_description?: string;
    readTime: number;
    content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> { }

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

function ensureBlogsDir() {
    if (!fs.existsSync(BLOGS_DIR)) {
        fs.mkdirSync(BLOGS_DIR, { recursive: true });
    }
}

export function getAllPosts(): BlogPostMeta[] {
    ensureBlogsDir();

    const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.mdx'));

    const posts = files
        .map((filename) => {
            const slug = filename.replace(/\.mdx$/, '');
            const filePath = path.join(BLOGS_DIR, filename);
            const raw = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(raw);

            return {
                slug: data.slug || slug,
                title: data.title || 'Untitled',
                description: data.description || '',
                date: data.date || new Date().toISOString(),
                author: data.author || 'Omor Faruk Ullas',
                tags: Array.isArray(data.tags) ? data.tags : [],
                featured_image: data.featured_image || null,
                published: data.published !== false,
                seo_title: data.seo_title,
                seo_description: data.seo_description,
                readTime: estimateReadTime(content),
            } as BlogPostMeta;
        })
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    ensureBlogsDir();

    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
        slug: data.slug || slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Omor Faruk Ullas',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured_image: data.featured_image || null,
        published: data.published !== false,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        readTime: estimateReadTime(content),
        content,
    };
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): BlogPostMeta[] {
    const allPosts = getAllPosts();
    return allPosts
        .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
        .slice(0, limit);
}

export function getAdjacentPosts(slug: string): {
    prev: BlogPostMeta | null;
    next: BlogPostMeta | null;
} {
    const allPosts = getAllPosts();
    const index = allPosts.findIndex((p) => p.slug === slug);
    return {
        prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
        next: index > 0 ? allPosts[index - 1] : null,
    };
}

export function getAllTags(): string[] {
    const allPosts = getAllPosts();
    const tagSet = new Set<string>();
    allPosts.forEach((post) => post.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
}

export function generateRssFeed(posts: BlogPostMeta[], siteUrl: string): string {
    const items = posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>${post.author}</author>
      ${post.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
        )
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Omor Faruk Ullas — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on Full Stack Development, React, Node.js, and building real-world solutions.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}
