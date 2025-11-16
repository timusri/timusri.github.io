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
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1b1e]">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-2">
                            Featured <span className="text-[#98c379]">Posts</span>
                        </h2>
                        <p className="text-[#a6a7ab]">
                            Thoughts on DevOps, cloud infrastructure, and more
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors group text-sm"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-[#25262b] rounded-lg p-4 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                        >
                            <div className="flex items-center gap-3 text-xs text-[#a6a7ab] mb-2">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#e6e6e6] mb-2 group-hover:text-[#98c379] transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-[#a6a7ab] text-xs mb-3 line-clamp-2">
                                {post.description}
                            </p>

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.slice(0, 3).map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-[#2c2e33] text-[#98c379] text-xs rounded"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="mt-6 text-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors text-sm"
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

