import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Presentation } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Talk {
    slug: string;
    title: string;
    date: string;
    event: string;
    location: string;
    tags: string[];
    description: string;
    thumbnail: string;
}

const FeaturedTalks = async () => {
    const talksDirectory = path.join(process.cwd(), 'talks');

    let talks: Talk[] = [];

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
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 2); // Get the 2 most recent talks
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#25262b]/30">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-4">
                            Conference <span className="text-[#98c379]">Talks</span>
                        </h2>
                        <p className="text-[#a6a7ab] text-lg">
                            Speaking at DevOps conferences and community events
                        </p>
                    </div>
                    <Link
                        href="/talks"
                        className="hidden md:flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors group"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {talks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {talks.map((talk) => (
                            <Link
                                key={talk.slug}
                                href={`/talks/${talk.slug}`}
                                className="group bg-[#25262b] rounded-xl overflow-hidden border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                            >
                                {/* Thumbnail */}
                                {talk.thumbnail ? (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={talk.thumbnail}
                                            alt={talk.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#25262b] to-transparent opacity-60"></div>
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-[#98c379]/20 to-[#2c2e33] flex items-center justify-center">
                                        <Presentation className="w-16 h-16 text-[#98c379]/30" />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Event Badge */}
                                    <div className="flex items-center gap-2 text-[#98c379] text-sm font-medium mb-3">
                                        <Presentation className="w-4 h-4" />
                                        <span>{talk.event}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-[#e6e6e6] mb-2 group-hover:text-[#98c379] transition-colors line-clamp-2">
                                        {talk.title}
                                    </h3>

                                    {/* Metadata */}
                                    <div className="flex items-center gap-4 text-sm text-[#a6a7ab] mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{talk.date}</span>
                                        </div>
                                        {talk.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{talk.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#a6a7ab] text-sm line-clamp-2">
                                        {talk.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[#a6a7ab] text-lg">No talks yet.</p>
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/talks"
                        className="inline-flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors"
                    >
                        View All Talks
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTalks;

