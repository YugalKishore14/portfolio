import { getBlogPosts, getBlogPost } from '@/lib/api';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
    try {
        const posts = await getBlogPosts();
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let initialPost = null;

    try {
        initialPost = await getBlogPost(slug);
    } catch (error) {
        console.error(`Error pre-fetching blog post ${slug}:`, error);
    }

    return <BlogPostClient params={params} initialPost={initialPost} />;
}
