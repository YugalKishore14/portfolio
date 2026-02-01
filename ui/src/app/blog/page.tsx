'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, Eye, Tag, Search } from 'lucide-react';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getBlogPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            <Navbar />

            <div className="pt-24 pb-20 px-4 relative min-h-screen">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-orbitron">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Blog & Insights
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Exploring the frontiers of AI, Web3, and Software Engineering.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative mb-8">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-full focus:outline-none focus:border-cyan-500 text-slate-200 transition-all placeholder:text-slate-500"
                            />
                        </div>
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

                    {/* Content */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-slate-400">No posts found matching your criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                                >
                                    {/* Featured Image */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shrink-0">
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

                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Post Details */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
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

                                        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800 mt-auto">
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
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
