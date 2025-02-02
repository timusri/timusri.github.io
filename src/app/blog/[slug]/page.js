import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';

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
        const { slug } = params;
        const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
            title: data.title,
            description: data.description || `${data.title} - Blog Post`,
        };
    } catch (error) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }
}

// The main page component
export default function BlogPost({ params }) {
    try {
        const { slug } = params;
        const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = md.render(content);

        return (
            <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6]">
                <main className="max-w-4xl mx-auto px-4 py-12">
                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                    <article className="prose prose-invert max-w-none">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                            <div className="text-[#a6a7ab]">
                                <time dateTime={data.date}>{data.date}</time>
                                {data.tags && (
                                    <div className="mt-2 flex gap-2">
                                        {data.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-[#2c2e33] px-2 py-1 rounded text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>
                        <div
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                            className="prose prose-invert prose-pre:bg-[#2c2e33] prose-pre:border prose-pre:border-[#363b44]"
                        />
                    </article>
                </main>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6]">
                <main className="max-w-4xl mx-auto px-4 py-12">
                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p>Sorry, the blog post you're looking for doesn't exist.</p>
                </main>
            </div>
        );
    }
} 