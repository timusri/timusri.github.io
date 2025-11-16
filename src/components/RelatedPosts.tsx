import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-utils';

interface RelatedPostsProps {
    posts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 border-t border-[#2c2e33]">
            <h2 className="text-2xl font-bold text-[#e6e6e6] mb-6">
                Related <span className="text-[#98c379]">Posts</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block bg-[#25262b] rounded-lg p-5 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 text-sm text-[#a6a7ab] mb-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{post.date}</span>
                            </div>
                            {post.readingTime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{post.readingTime} min</span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-lg font-semibold text-[#e6e6e6] mb-2 group-hover:text-[#98c379] transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-[#2c2e33] text-[#98c379] text-xs rounded"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-1 text-[#98c379] text-sm mt-4 group-hover:gap-2 transition-all">
                            <span>Read more</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;

