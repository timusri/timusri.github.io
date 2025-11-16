'use client';

import React, { useEffect, useRef } from 'react';

interface CommentSectionProps {
    slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ slug }) => {
    const commentBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if giscus script already exists
        const existingScript = document.querySelector('script[src*="giscus"]');
        if (existingScript || !commentBoxRef.current) return;

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'timusri/timusri.github.io'); // Update with your repo
        script.setAttribute('data-repo-id', 'YOUR_REPO_ID'); // You'll need to get this from giscus.app
        script.setAttribute('data-category', 'Comments');
        script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // You'll need to get this from giscus.app
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'dark');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('data-loading', 'lazy');
        script.crossOrigin = 'anonymous';
        script.async = true;

        commentBoxRef.current.appendChild(script);
    }, [slug]);

    return (
        <section className="mt-16 pt-16 border-t border-[#2c2e33]">
            <h2 className="text-2xl font-bold text-[#e6e6e6] mb-6">
                Comments
            </h2>
            <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2e33]">
                <div ref={commentBoxRef} />
                <noscript>
                    <p className="text-[#a6a7ab]">
                        Please enable JavaScript to view the comments powered by giscus.
                    </p>
                </noscript>
            </div>
        </section>
    );
};

export default CommentSection;

