'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    readingTime: number;
    externalUrl?: string;  // Optional external URL
}

const BlogCard: React.FC<BlogCardProps> = ({
    slug,
    title,
    date,
    description,
    tags,
    readingTime,
    externalUrl
}) => {
    const href = externalUrl || `/blog/${slug}`;
    const isExternal = !!externalUrl;
    
    const CardContent = (
        <>
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-[#a6a7ab] mb-3">
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                </div>
                {isExternal && (
                    <div className="flex items-center gap-1 text-[#98c379]">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs font-medium">Medium</span>
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#e6e6e6] mb-3 group-hover:text-[#98c379] transition-colors line-clamp-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-[#a6a7ab] text-sm mb-4 line-clamp-3">
                {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-[#2c2e33] text-[#98c379] text-xs rounded-md group-hover:bg-[#98c379]/10"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </>
    );

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[#25262b] rounded-xl p-6 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
            >
                {CardContent}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className="group block bg-[#25262b] rounded-xl p-6 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
        >
            {CardContent}
        </Link>
    );
};

export default BlogCard;

