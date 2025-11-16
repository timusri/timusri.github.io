'use client';

import React, { useEffect, useState } from 'react';
import { extractHeadings, Heading } from '@/lib/markdown-utils';
import { List } from 'lucide-react';

interface TableOfContentsProps {
    content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const extractedHeadings = extractHeadings(content);
        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-[#98c379] text-[#1a1b1e] rounded-full shadow-lg hover:bg-[#b5e890] transition-all"
                aria-label="Toggle table of contents"
            >
                <List className="w-6 h-6" />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Table of Contents */}
            <nav
                className={`
                    fixed lg:sticky top-24 right-0 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    lg:top-32 w-72 max-h-[calc(100vh-200px)] overflow-y-auto
                    bg-[#25262b] rounded-lg p-6 border border-[#2c2e33]
                    transition-transform duration-300 z-50
                    lg:z-auto
                `}
            >
                <h3 className="text-sm font-semibold text-[#e6e6e6] mb-4 flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Table of Contents
                </h3>
                <ul className="space-y-2">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                        >
                            <button
                                onClick={() => scrollToHeading(heading.id)}
                                className={`
                                    text-left text-sm transition-colors duration-200 hover:text-[#98c379] w-full
                                    ${activeId === heading.id
                                        ? 'text-[#98c379] font-medium'
                                        : 'text-[#a6a7ab]'
                                    }
                                `}
                            >
                                {heading.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default TableOfContents;

