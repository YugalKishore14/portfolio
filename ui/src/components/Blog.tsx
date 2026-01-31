'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, Eye, Tag } from 'lucide-react';

interface BlogProps {
    data: BlogPost[];
}

export default function Blog({ data }: BlogProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(data.map(post => post.category)))];

    // Filter posts by category
    const filteredPosts = selectedCategory === 'All'
        ? data
        : data.filter(post => post.category === selectedCategory);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="py-20 px-4 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-orbitron)]">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Blog & Insights
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Sharing knowledge, experiences, and insights from the world of technology
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                                : 'glass text-slate-300 hover:text-white hover:border-cyan-500/50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-slate-400">No blog posts found</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 block"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                {/* Featured Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                                    {post.featured_image_url ? (
                                        <img
                                            src={post.featured_image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-6xl opacity-20">📝</div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800/50 text-cyan-400 text-xs rounded-md"
                                                >
                                                    <Tag size={12} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {formatDate(post.published_at || post.created_at)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {post.read_time} min
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {post.views}
                                        </span>
                                    </div>

                                    {/* Read More Button */}
                                    <div className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm group/link">
                                        Read More
                                        <svg
                                            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
