export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
    content?: string;
    readingTime?: number;
    externalUrl?: string;  // Optional external URL (e.g., Medium article)
}

/**
 * Calculate reading time for a piece of content
 * @param content - The text content to analyze
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Search posts by title, description, or content
 * @param posts - Array of blog posts
 * @param query - Search query string
 * @returns Filtered array of posts matching the query
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
    if (!query || query.trim() === '') {
        return posts;
    }

    const lowerQuery = query.toLowerCase();
    
    return posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery);
        const descMatch = post.description?.toLowerCase().includes(lowerQuery) || false;
        const contentMatch = post.content?.toLowerCase().includes(lowerQuery) || false;
        const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        
        return titleMatch || descMatch || contentMatch || tagsMatch;
    });
}

/**
 * Filter posts by tags
 * @param posts - Array of blog posts
 * @param selectedTags - Array of tags to filter by
 * @returns Filtered array of posts containing any of the selected tags
 */
export function filterByTags(posts: BlogPost[], selectedTags: string[]): BlogPost[] {
    if (!selectedTags || selectedTags.length === 0) {
        return posts;
    }

    return posts.filter(post => 
        post.tags.some(tag => selectedTags.includes(tag))
    );
}

/**
 * Get all unique tags from posts
 * @param posts - Array of blog posts
 * @returns Array of unique tag strings
 */
export function getAllTags(posts: BlogPost[]): string[] {
    const tagsSet = new Set<string>();
    
    posts.forEach(post => {
        post.tags.forEach(tag => tagsSet.add(tag));
    });
    
    return Array.from(tagsSet).sort();
}

/**
 * Get related posts based on shared tags
 * @param currentPost - The current post to find related posts for
 * @param allPosts - Array of all blog posts
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts sorted by relevance
 */
export function getRelatedPosts(
    currentPost: BlogPost,
    allPosts: BlogPost[],
    limit: number = 3
): BlogPost[] {
    // Exclude the current post
    const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
    
    // Calculate relevance score based on shared tags
    const postsWithScores = otherPosts.map(post => {
        const sharedTags = post.tags.filter(tag => 
            currentPost.tags.includes(tag)
        );
        
        return {
            post,
            score: sharedTags.length
        };
    });
    
    // Sort by score (descending) and then by date (newest first)
    postsWithScores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });
    
    // Return only posts with at least one shared tag
    return postsWithScores
        .filter(item => item.score > 0)
        .slice(0, limit)
        .map(item => item.post);
}

/**
 * Sort posts by different criteria
 * @param posts - Array of blog posts
 * @param sortBy - Sort criteria: 'newest', 'oldest', or 'title'
 * @returns Sorted array of posts
 */
export function sortPosts(posts: BlogPost[], sortBy: 'newest' | 'oldest' | 'title' = 'newest'): BlogPost[] {
    const sorted = [...posts];
    
    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        case 'oldest':
            return sorted.sort((a, b) => 
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        case 'title':
            return sorted.sort((a, b) => 
                a.title.localeCompare(b.title)
            );
        default:
            return sorted;
    }
}

/**
 * Format date to readable string
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
}

