import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import RelatedPosts from '@/components/RelatedPosts';
import CommentSection from '@/components/CommentSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import { calculateReadingTime, getRelatedPosts } from '@/lib/blog-utils';
import { addHeadingAnchors } from '@/lib/markdown-utils';
import { Calendar, Clock, User } from 'lucide-react';

// Initialize markdown-it with options
const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
}).use(highlightjs);

// This function generates the static paths at build time
export async function generateStaticParams() {
    try {
        const postsDirectory = path.join(process.cwd(), 'posts');
        if (!fs.existsSync(postsDirectory)) {
            console.warn('Posts directory does not exist');
            return [];
        }
        const fileNames = fs.readdirSync(postsDirectory);
        return fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(fileName => ({
                slug: fileName.replace(/\.md$/, '')
            }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// This function generates the metadata for each page
export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
            title: `${data.title} | Sumit Srivastava`,
            description: data.description || `${data.title} - Blog Post`,
        };
    } catch (error) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }
}

// Helper to get all posts
function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames
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
                readingTime: calculateReadingTime(content),
                content
            };
        });
}

// The main page component
export default async function BlogPost({ params }) {
    try {
        const { slug } = await params;
        const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Calculate reading time
        const readingTime = calculateReadingTime(content);
        
        // Render markdown to HTML
        let htmlContent = md.render(content);
        
        // Add anchor IDs to headings
        htmlContent = addHeadingAnchors(htmlContent);
        
        // Get all posts for related posts
        const allPosts = getAllPosts();
        const currentPost = {
            slug,
            title: data.title,
            date: data.date,
            tags: data.tags || [],
            description: data.description,
            readingTime
        };
        
        const relatedPosts = getRelatedPosts(currentPost, allPosts, 3);

        return (
            <>
                <ReadingProgress />
                
                <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                            >
                                ← Back to Blog
                            </Link>
                        </div>

                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            {/* Main Content */}
                            <article className="lg:col-span-8">
                                <header className="mb-8">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#e6e6e6]">
                                        {data.title}
                                    </h1>
                                    
                                    {/* Meta Information */}
                                    <div className="flex flex-wrap items-center gap-6 text-[#a6a7ab] mb-6">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>Sumit Srivastava</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={data.date}>{data.date}</time>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{readingTime} min read</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {data.tags && data.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {data.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-[#25262b] text-[#98c379] text-sm rounded-md border border-[#2c2e33]"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Share Buttons */}
                                    <ShareButtons title={data.title} slug={slug} />
                                </header>

                                {/* Article Content */}
                                <div
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                    className="prose prose-invert"
                                />

                                {/* Newsletter Signup */}
                                <NewsletterSignup />

                                {/* Comments - Uncomment after configuring giscus */}
                                {/* <CommentSection slug={slug} /> */}

                                {/* Related Posts */}
                                <RelatedPosts posts={relatedPosts} />
                            </article>

                            {/* Table of Contents - Sidebar */}
                            <aside className="hidden lg:block lg:col-span-4">
                                <TableOfContents content={content} />
                            </aside>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-[#a6a7ab]">Sorry, the blog post you're looking for doesn't exist.</p>
                </main>
            </div>
        );
    }
}
