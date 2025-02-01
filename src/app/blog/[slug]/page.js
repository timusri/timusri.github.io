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
}).use(highlightjs, { inline: true });

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => ({
        slug: fileName.replace(/\.md$/, ''),
    }));
}

export default async function BlogPost({ params }) {
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
                <article className="prose prose-invert max-w-none
                    prose-headings:text-[#e6e6e6]
                    prose-p:text-[#e6e6e6]
                    prose-a:text-[#98c379] prose-a:no-underline hover:prose-a:text-[#b5e890]
                    prose-strong:text-[#e6e6e6]
                    prose-code:text-[#e6e6e6]
                    prose-pre:bg-transparent
                    prose-pre:p-0
                    prose-blockquote:text-[#a6a7ab]
                    prose-blockquote:border-l-[#98c379]
                    prose-li:text-[#e6e6e6]
                    prose-img:rounded-lg
                ">
                    <header className="mb-8 not-prose">
                        <h1 className="text-4xl font-bold text-[#e6e6e6] mb-4">
                            {data.title}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center text-[#a6a7ab] gap-2 sm:gap-4">
                            {data.author && (
                                <div className="flex items-center gap-2">
                                    <span>By {data.author}</span>
                                </div>
                            )}
                            {data.date && (
                                <>
                                    <span className="hidden sm:inline">•</span>
                                    <time dateTime={data.date}>{data.date}</time>
                                </>
                            )}
                        </div>
                        {data.tags && data.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {data.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#25262b] px-2 py-1 rounded text-sm text-[#a6a7ab]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>
                    <div
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        className="[&>*:first-child]:mt-0"
                    />
                </article>
            </main>
        </div>
    );
} 