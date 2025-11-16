export interface Heading {
    id: string;
    text: string;
    level: number;
}

/**
 * Extract headings from markdown content
 * @param content - Raw markdown content
 * @returns Array of heading objects with id, text, and level
 */
export function extractHeadings(content: string): Heading[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = generateSlug(text);

        headings.push({
            id,
            text,
            level
        });
    }

    return headings;
}

/**
 * Generate a URL-friendly slug from text
 * @param text - Text to convert to slug
 * @returns URL-friendly slug string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
}

/**
 * Add anchor IDs to headings in HTML content
 * @param html - HTML content with headings
 * @returns HTML with anchor IDs added to headings
 */
export function addHeadingAnchors(html: string): string {
    return html.replace(
        /<h([1-6])>(.*?)<\/h\1>/g,
        (match, level, content) => {
            const id = generateSlug(content.replace(/<[^>]*>/g, '')); // Strip HTML tags
            return `<h${level} id="${id}">${content}</h${level}>`;
        }
    );
}

/**
 * Extract excerpt from markdown content
 * @param content - Markdown content
 * @param length - Maximum length of excerpt
 * @returns Excerpt string
 */
export function extractExcerpt(content: string, length: number = 150): string {
    // Remove markdown syntax
    const plainText = content
        .replace(/^#{1,6}\s+/gm, '') // Remove headings
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.+?)\*/g, '$1') // Remove italic
        .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
        .replace(/`(.+?)`/g, '$1') // Remove inline code
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .trim();

    if (plainText.length <= length) {
        return plainText;
    }

    return plainText.substring(0, length).trim() + '...';
}

/**
 * Get estimated reading progress percentage
 * @param scrollTop - Current scroll position
 * @param scrollHeight - Total scrollable height
 * @param clientHeight - Visible viewport height
 * @returns Progress percentage (0-100)
 */
export function getReadingProgress(
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
): number {
    const scrollableHeight = scrollHeight - clientHeight;
    if (scrollableHeight <= 0) return 100;
    
    const progress = (scrollTop / scrollableHeight) * 100;
    return Math.min(100, Math.max(0, progress));
}

