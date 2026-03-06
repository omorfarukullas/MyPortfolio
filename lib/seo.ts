import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';

interface PageSeoOptions {
    title?: string;
    description?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
    keywords?: string[];
    noIndex?: boolean;
    publishedAt?: string;
    type?: 'website' | 'article';
}

export function generatePageMetadata(options: PageSeoOptions = {}): Metadata {
    const {
        title,
        description = seoConfig.siteDescription,
        ogImage = seoConfig.defaultOgImage,
        ogTitle,
        ogDescription,
        canonical,
        keywords = seoConfig.keywords,
        noIndex = false,
        type = 'website',
    } = options;

    const resolvedTitle = title
        ? `${title} | ${seoConfig.siteName}`
        : seoConfig.siteTitle;

    const resolvedOgTitle = ogTitle || resolvedTitle;
    const resolvedOgDesc = ogDescription || description;
    const resolvedCanonical = canonical || seoConfig.siteUrl;

    return {
        title: resolvedTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: seoConfig.author.name }],
        creator: seoConfig.author.name,
        publisher: seoConfig.author.name,
        metadataBase: new URL(seoConfig.siteUrl),
        alternates: {
            canonical: resolvedCanonical,
        },
        openGraph: {
            type,
            locale: seoConfig.locale,
            url: resolvedCanonical,
            siteName: `${seoConfig.siteName} Portfolio`,
            title: resolvedOgTitle,
            description: resolvedOgDesc,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: resolvedOgTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: resolvedOgTitle,
            description: resolvedOgDesc,
            images: [ogImage],
            creator: seoConfig.twitterHandle,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// --- JSON-LD Schema Builders ---

export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: seoConfig.author.name,
        jobTitle: 'Full Stack Developer',
        description: seoConfig.siteDescription,
        url: seoConfig.siteUrl,
        image: `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
        email: seoConfig.author.email,
        sameAs: [
            'https://github.com/omorfarukullas',
            'https://linkedin.com/in/omorfarukullas',
            'https://twitter.com/omorfarukullas',
        ],
        knowsAbout: [
            'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript',
            'Python', 'Java', 'MySQL', 'MongoDB', 'Full Stack Development',
        ],
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'United International University',
            sameAs: 'https://www.uiu.ac.bd/',
        },
        nationality: { '@type': 'Country', name: 'Bangladesh' },
    };
}

export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${seoConfig.siteName} Portfolio`,
        url: seoConfig.siteUrl,
        description: seoConfig.siteDescription,
        author: { '@type': 'Person', name: seoConfig.author.name },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${seoConfig.siteUrl}/blog?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url,
        isPartOf: { '@type': 'WebSite', url: seoConfig.siteUrl },
        author: { '@type': 'Person', name: seoConfig.author.name },
    };
}

export function generateBlogPostingSchema(post: {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    featured_image?: string;
}) {
    const postUrl = `${seoConfig.siteUrl}/blog/${post.slug}`;
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: seoConfig.author.name,
            url: seoConfig.siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: seoConfig.siteName,
            url: seoConfig.siteUrl,
        },
        image: post.featured_image
            ? `${seoConfig.siteUrl}${post.featured_image}`
            : `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
        keywords: post.tags.join(', '),
        isPartOf: {
            '@type': 'Blog',
            url: `${seoConfig.siteUrl}/blog`,
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
