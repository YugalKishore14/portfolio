import { getBlogPosts } from '@/lib/api';
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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    return <BlogPostClient params={params} />;
}
