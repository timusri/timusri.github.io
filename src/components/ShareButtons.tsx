'use client';

import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, slug }) => {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set the URL only on the client side after mounting
        setUrl(`${window.location.origin}/blog/${slug}`);
        setMounted(true);
    }, [slug]);

    // Don't render share links until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="flex items-center gap-3">
                <span className="text-sm text-[#a6a7ab]">Share:</span>
                <div className="flex gap-3">
                    <div className="p-2 bg-[#25262b] rounded-lg border border-[#2c2e33] w-8 h-8"></div>
                    <div className="p-2 bg-[#25262b] rounded-lg border border-[#2c2e33] w-8 h-8"></div>
                    <div className="p-2 bg-[#25262b] rounded-lg border border-[#2c2e33] w-8 h-8"></div>
                </div>
            </div>
        );
    }

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-[#a6a7ab]">Share:</span>
            
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25262b] text-[#a6a7ab] rounded-lg hover:bg-[#2c2e33] hover:text-[#98c379] transition-all border border-[#2c2e33]"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-4 h-4" />
            </a>
            
            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25262b] text-[#a6a7ab] rounded-lg hover:bg-[#2c2e33] hover:text-[#98c379] transition-all border border-[#2c2e33]"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-4 h-4" />
            </a>
            
            <button
                onClick={copyToClipboard}
                className="p-2 bg-[#25262b] text-[#a6a7ab] rounded-lg hover:bg-[#2c2e33] hover:text-[#98c379] transition-all border border-[#2c2e33]"
                aria-label="Copy link"
            >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </button>
        </div>
    );
};

export default ShareButtons;

