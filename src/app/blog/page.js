import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogListClient from '@/components/BlogListClient';
import { calculateReadingTime } from '@/lib/blog-utils';

export default async function BlogIndex() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    let posts = [];
    
    if (fs.existsSync(postsDirectory)) {
        const fileNames = fs.readdirSync(postsDirectory);

        posts = fileNames
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
                    description: data.description || content.substring(0, 150) + '...',
                    readingTime: calculateReadingTime(content),
                    externalUrl: data.externalUrl || ''  // Include external URL if present
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return <BlogListClient initialPosts={posts} />;
}
