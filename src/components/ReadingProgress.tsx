'use client';

import React, { useEffect, useState } from 'react';
import { getReadingProgress } from '@/lib/markdown-utils';

const ReadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            const currentProgress = getReadingProgress(scrollTop, scrollHeight, clientHeight);
            setProgress(currentProgress);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#2c2e33]">
            <div
                className="h-full bg-gradient-to-r from-[#98c379] to-[#b5e890] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ReadingProgress;

