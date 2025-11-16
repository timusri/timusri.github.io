import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Calendar, MapPin, Tag } from 'lucide-react';

export const metadata = {
    title: 'Talks | Sumit Srivastava',
    description: 'Conference talks, presentations, and speaking engagements by Sumit Srivastava on DevOps, Cloud, and Kubernetes.',
};

export default async function TalksPage() {
    const talksDirectory = path.join(process.cwd(), 'talks');
    
    let talks: Array<{
        slug: string;
        title: string;
        date: string;
        event: string;
        location: string;
        tags: string[];
        description: string;
        thumbnail: string;
    }> = [];
    
    if (fs.existsSync(talksDirectory)) {
        const fileNames = fs.readdirSync(talksDirectory);

        talks = fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(fileName => {
                const slug = fileName.replace(/\.md$/, '');
                const fullPath = path.join(talksDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents);

                return {
                    slug,
                    title: data.title || 'Untitled',
                    date: data.date || '',
                    event: data.event || '',
                    location: data.location || '',
                    tags: data.tags || [],
                    description: data.description || '',
                    thumbnail: data.thumbnail || ''
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Talks & <span className="text-[#98c379]">Presentations</span>
                    </h1>
                    <p className="text-[#a6a7ab] text-lg">
                        Sharing knowledge at conferences, meetups, and community events
                    </p>
                </div>

                {/* Talks Grid */}
                {talks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {talks.map((talk) => (
                            <Link
                                key={talk.slug}
                                href={`/talks/${talk.slug}`}
                                className="group block bg-[#25262b] rounded-xl overflow-hidden border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                            >
                                {/* Thumbnail */}
                                {talk.thumbnail && (
                                    <div className="relative h-48 bg-gradient-to-br from-[#98c379]/20 to-[#2c2e33] overflow-hidden">
                                        <img
                                            src={talk.thumbnail}
                                            alt={talk.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#25262b] to-transparent opacity-60"></div>
                                    </div>
                                )}
                                {!talk.thumbnail && (
                                    <div className="h-48 bg-gradient-to-br from-[#98c379]/20 to-[#2c2e33] flex items-center justify-center">
                                        <Tag className="w-16 h-16 text-[#98c379]/30" />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Event and Date */}
                                    <div className="flex items-center gap-4 text-sm text-[#a6a7ab] mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{talk.date}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-[#e6e6e6] mb-2 group-hover:text-[#98c379] transition-colors line-clamp-2">
                                        {talk.title}
                                    </h3>

                                    {/* Event */}
                                    <p className="text-[#98c379] text-sm font-medium mb-2">
                                        {talk.event}
                                    </p>

                                    {/* Location */}
                                    {talk.location && (
                                        <div className="flex items-center gap-1 text-[#a6a7ab] text-sm mb-3">
                                            <MapPin className="w-4 h-4" />
                                            <span>{talk.location}</span>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-[#a6a7ab] text-sm mb-4 line-clamp-2">
                                        {talk.description}
                                    </p>

                                    {/* Tags */}
                                    {talk.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {talk.tags.slice(0, 3).map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#2c2e33] text-[#98c379] text-xs rounded-md"
                                                >
                                                    <Tag className="w-3 h-3" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[#a6a7ab] text-lg">
                            No talks yet. Check back soon!
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

