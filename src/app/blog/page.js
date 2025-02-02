import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default async function BlogIndex() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                ...data,
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6]">
            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.slug} className="group">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="flex items-baseline hover:bg-[#25262b] rounded-lg p-4 transition-colors duration-200"
                            >
                                <span className="text-[#a6a7ab] w-32 flex-shrink-0">
                                    {post.date}
                                </span>
                                <span className="text-[#98c379] group-hover:text-[#b5e890]">
                                    {post.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
