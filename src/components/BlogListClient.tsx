'use client';

import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import BlogCard from './BlogCard';
import { searchPosts, filterByTags, getAllTags, sortPosts, BlogPost } from '@/lib/blog-utils';
import { ArrowUpDown } from 'lucide-react';

interface BlogListClientProps {
    initialPosts: BlogPost[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ initialPosts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    const allTags = useMemo(() => getAllTags(initialPosts), [initialPosts]);

    const filteredPosts = useMemo(() => {
        let posts = [...initialPosts];
        
        // Apply search
        if (searchQuery) {
            posts = searchPosts(posts, searchQuery);
        }
        
        // Apply tag filter
        if (selectedTags.length > 0) {
            posts = filterByTags(posts, selectedTags);
        }
        
        // Apply sorting
        posts = sortPosts(posts, sortBy);
        
        return posts;
    }, [initialPosts, searchQuery, selectedTags, sortBy]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleClearTags = () => {
        setSelectedTags([]);
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Blog <span className="text-[#98c379]">Posts</span>
                    </h1>
                    <p className="text-[#a6a7ab] text-lg">
                        Insights on DevOps, cloud infrastructure, and software engineering
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-6">
                    {/* Search Bar */}
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search posts by title, content, or tags..."
                    />

                    {/* Tag Filter and Sort */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <TagFilter
                                allTags={allTags}
                                selectedTags={selectedTags}
                                onTagToggle={handleTagToggle}
                                onClearAll={handleClearTags}
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="lg:w-48">
                            <label className="block text-sm font-medium text-[#a6a7ab] mb-2">
                                Sort by
                            </label>
                            <div className="relative">
                                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a6a7ab] pointer-events-none" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                                    className="w-full pl-10 pr-4 py-2 bg-[#25262b] border border-[#2c2e33] rounded-lg text-[#e6e6e6] focus:outline-none focus:border-[#98c379] focus:ring-1 focus:ring-[#98c379] transition-all appearance-none cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="title">Title (A-Z)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-[#a6a7ab]">
                    {filteredPosts.length === initialPosts.length ? (
                        <p>Showing all {filteredPosts.length} posts</p>
                    ) : (
                        <p>
                            Found {filteredPosts.length} of {initialPosts.length} posts
                        </p>
                    )}
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <BlogCard
                                key={post.slug}
                                slug={post.slug}
                                title={post.title}
                                date={post.date}
                                description={post.description || ''}
                                tags={post.tags}
                                readingTime={post.readingTime || 1}
                                externalUrl={post.externalUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[#a6a7ab] text-lg mb-4">
                            No posts found matching your criteria
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedTags([]);
                            }}
                            className="text-[#98c379] hover:text-[#b5e890] transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlogListClient;

