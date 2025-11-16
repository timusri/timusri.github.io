import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';
import { Calendar, MapPin, Tag, ExternalLink } from 'lucide-react';

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
}).use(highlightjs);

export async function generateStaticParams() {
    try {
        const talksDirectory = path.join(process.cwd(), 'talks');
        if (!fs.existsSync(talksDirectory)) {
            return [];
        }
        const fileNames = fs.readdirSync(talksDirectory);
        return fileNames
            .filter(fileName => fileName.endsWith('.md'))  // Only markdown files
            .map(fileName => ({
                slug: fileName.replace(/\.md$/, '')
            }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const fullPath = path.join(process.cwd(), 'talks', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
            title: `${data.title} | Talks`,
            description: data.description || `${data.title} - Conference Talk`,
        };
    } catch (error) {
        return {
            title: 'Talk Not Found',
            description: 'The requested talk could not be found.',
        };
    }
}

export default async function TalkPage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const fullPath = path.join(process.cwd(), 'talks', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const htmlContent = md.render(content);

        return (
            <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href="/talks"
                            className="inline-flex items-center text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                        >
                            ← Back to Talks
                        </Link>
                    </div>

                    {/* Article */}
                    <article className="bg-[#25262b] rounded-xl border border-[#2c2e33] overflow-hidden">
                        {/* Featured Image */}
                        {data.thumbnail && (
                            <div className="w-full h-64 md:h-96 overflow-hidden">
                                <img
                                    src={data.thumbnail}
                                    alt={data.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8">
                            {/* Header */}
                            <header className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#e6e6e6]">
                                    {data.title}
                                </h1>
                                
                                {/* Metadata */}
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#a6a7ab] text-sm mb-6">
                                    {data.event && (
                                        <div className="flex items-center gap-2 bg-[#2c2e33] px-3 py-1.5 rounded-lg">
                                            <Calendar className="w-4 h-4 text-[#98c379]" />
                                            <span className="text-[#98c379] font-medium">{data.event}</span>
                                        </div>
                                    )}
                                    {data.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{data.location}</span>
                                        </div>
                                    )}
                                    {data.date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={data.date}>{data.date}</time>
                                        </div>
                                    )}
                                </div>

                                {/* Tags */}
                                {data.tags && data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {data.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#2c2e33] text-[#98c379] text-sm rounded-md border border-[#98c379]/20"
                                            >
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                {data.description && (
                                    <p className="text-[#a6a7ab] text-lg leading-relaxed">
                                        {data.description}
                                    </p>
                                )}
                            </header>

                            {/* Google Slides Embed */}
                            {data.slidesUrl && (
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold text-[#e6e6e6]">Presentation Slides</h2>
                                        <a
                                            href={data.slidesUrl.replace('/embed', '/edit')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors text-sm"
                                        >
                                            View Full Screen
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            src={data.slidesUrl}
                                            className="absolute top-0 left-0 w-full h-full rounded-lg border border-[#2c2e33]"
                                            allowFullScreen
                                            title={`${data.title} - Slides`}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* LinkedIn Post Embed */}
                            {data.linkedinPostUrl && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-[#e6e6e6] mb-4">LinkedIn Post</h2>
                                    <div className="bg-[#2c2e33] rounded-lg p-4">
                                        <iframe
                                            src={data.linkedinPostUrl}
                                            className="w-full rounded-lg"
                                            style={{ minHeight: '500px' }}
                                            frameBorder="0"
                                            allowFullScreen
                                            title={`${data.title} - LinkedIn Post`}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Markdown Content */}
                            <div
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                                className="prose prose-invert max-w-none"
                            />
                        </div>
                    </article>
                </main>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/talks"
                            className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                        >
                            ← Back to Talks
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Talk Not Found</h1>
                    <p className="text-[#a6a7ab]">Sorry, the talk you're looking for doesn't exist.</p>
                </main>
            </div>
        );
    }
}

