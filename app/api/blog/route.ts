import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to generate a URL-friendly slug from a title
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
}

export async function POST(req: NextRequest) {
    try {
        // Enforce Localhost-only strictly for security
        // In production on Vercel, this won't work anyway due to read-only fs,
        // but it's good practice to secure it against unauthorized requests.
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'CMS API is only available in local development.' }, { status: 403 });
        }

        const body = await req.json();
        const { title, description, tags, published, content } = body;

        if (!title || !description || !content) {
            return NextResponse.json({ error: 'Title, description, and content are required.' }, { status: 400 });
        }

        // Prepare frontmatter data
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const slug = generateSlug(title);

        // Define destination
        const blogsDir = path.join(process.cwd(), 'content', 'blogs');
        if (!fs.existsSync(blogsDir)) {
            fs.mkdirSync(blogsDir, { recursive: true });
        }

        const filePath = path.join(blogsDir, `${slug}.mdx`);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'A blog post with this title/slug already exists.' }, { status: 409 });
        }

        // Build the MDX string with Gray-Matter
        const fileContent = matter.stringify(content, {
            title,
            description,
            date,
            tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim()).filter(Boolean),
            published: published ?? true
        });

        // Write to disk
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return NextResponse.json({
            success: true,
            message: 'Blog post created successfully!',
            slug,
            path: `content/blogs/${slug}.mdx`
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error writing MDX file:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
