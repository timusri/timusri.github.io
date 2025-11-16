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
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#25262b]/30">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-2">
                            Conference <span className="text-[#98c379]">Talks</span>
                        </h2>
                        <p className="text-[#a6a7ab]">
                            Speaking at DevOps conferences and community events
                        </p>
                    </div>
                    <Link
                        href="/talks"
                        className="hidden md:flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors group text-sm"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {talks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {talks.map((talk) => (
                            <Link
                                key={talk.slug}
                                href={`/talks/${talk.slug}`}
                                className="group bg-[#25262b] rounded-lg overflow-hidden border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                            >
                                {/* Thumbnail */}
                                {talk.thumbnail ? (
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={talk.thumbnail}
                                            alt={talk.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#25262b] to-transparent opacity-60"></div>
                                    </div>
                                ) : (
                                    <div className="h-40 bg-gradient-to-br from-[#98c379]/20 to-[#2c2e33] flex items-center justify-center">
                                        <Presentation className="w-12 h-12 text-[#98c379]/30" />
                                    </div>
                                )}

                                <div className="p-4">
                                    {/* Event Badge */}
                                    <div className="flex items-center gap-1.5 text-[#98c379] text-xs font-medium mb-2">
                                        <Presentation className="w-3.5 h-3.5" />
                                        <span>{talk.event}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-[#e6e6e6] mb-2 group-hover:text-[#98c379] transition-colors line-clamp-2">
                                        {talk.title}
                                    </h3>

                                    {/* Metadata */}
                                    <div className="flex items-center gap-3 text-xs text-[#a6a7ab] mb-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{talk.date}</span>
                                        </div>
                                        {talk.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{talk.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#a6a7ab] text-xs line-clamp-2">
                                        {talk.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-[#a6a7ab]">No talks yet.</p>
                    </div>
                )}

                <div className="mt-6 text-center md:hidden">
                    <Link
                        href="/talks"
                        className="inline-flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors text-sm"
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

