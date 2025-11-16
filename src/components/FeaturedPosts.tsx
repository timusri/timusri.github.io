import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

async function getPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            
            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                tags: data.tags || [],
                description: data.description || content.substring(0, 150),
                readingTime: calculateReadingTime(content)
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3); // Get top 3 posts
    
    return posts;
}

const FeaturedPosts = async () => {
    const posts = await getPosts();

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1b1e]">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-4">
                            Featured <span className="text-[#98c379]">Posts</span>
                        </h2>
                        <p className="text-[#a6a7ab] text-lg">
                            Thoughts on DevOps, cloud infrastructure, and more
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors group"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-[#25262b] rounded-xl p-6 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                        >
                            {/* Gradient Background */}
                            <div className="w-full h-32 bg-gradient-to-br from-[#98c379]/20 to-[#2c2e33] rounded-lg mb-4 flex items-center justify-center">
                                <span className="text-4xl font-bold text-[#98c379]/30">
                                    {index + 1}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-[#a6a7ab] mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-[#e6e6e6] mb-3 group-hover:text-[#98c379] transition-colors">
                                {post.title}
                            </h3>

                            <p className="text-[#a6a7ab] text-sm mb-4 line-clamp-2">
                                {post.description}
                            </p>

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-[#2c2e33] text-[#98c379] text-xs rounded-md"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors"
                    >
                        View All Posts
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPosts;

