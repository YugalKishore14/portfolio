'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { getBlogPost } from '@/lib/api';
import { Calendar, Clock, Eye, Tag, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostClient({
    params,
    initialPost = null
}: {
    params: Promise<{ slug: string }>,
    initialPost?: BlogPost | null
}) {
    const router = useRouter();
    const { slug } = use(params); // Unwrap the Promise
    const [post, setPost] = useState<BlogPost | null>(initialPost);
    const [loading, setLoading] = useState(!initialPost);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialPost) return;

        async function fetchPost() {
            try {
                const data = await getBlogPost(slug);
                setPost(data);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug, initialPost]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent mb-4"></div>
                    <p className="text-lg">Loading blog post...</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-200">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
                        <p className="text-slate-400 mb-6">{error || 'Blog post not found'}</p>
                        <button
                            onClick={() => router.push('/#blog')}
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <article className="max-w-4xl mx-auto px-4 py-24">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/#blog')}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </button>

                {/* Featured Image */}
                {post.featured_image_url && (
                    <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                        <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    </div>
                )}

                {/* Category Badge */}
                <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-full mb-6">
                    {post.category}
                </span>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] leading-tight">
                    {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
                    <span className="flex items-center gap-2">
                        <Calendar size={18} />
                        {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={18} />
                        {post.read_time} min read
                    </span>
                    <span className="flex items-center gap-2">
                        <Eye size={18} />
                        {post.views} views
                    </span>
                    <span className="text-cyan-400 font-medium">By {post.author}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {post.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-2 px-4 py-2 glass text-cyan-400 text-sm rounded-lg hover:bg-cyan-500/10 transition-colors"
                            >
                                <Tag size={16} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div
                    className="blog-content text-lg"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <button
                        onClick={() => router.push('/#blog')}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                        Read More Articles
                    </button>
                </div>
            </article>

            <Footer />
        </main>
    );
}
