'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal } from 'lucide-react';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#1a1b1e]/80 backdrop-blur-md border-b border-[#2c2e33]'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Name */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                    >
                        <Terminal className="w-5 h-5" />
                        <span className="font-mono font-bold text-lg">sumit.dev</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors duration-200 ${
                                isActive('/')
                                    ? 'text-[#98c379]'
                                    : 'text-[#a6a7ab] hover:text-[#e6e6e6]'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className={`text-sm font-medium transition-colors duration-200 ${
                                pathname?.startsWith('/blog')
                                    ? 'text-[#98c379]'
                                    : 'text-[#a6a7ab] hover:text-[#e6e6e6]'
                            }`}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-medium transition-colors duration-200 ${
                                pathname === '/contact'
                                    ? 'text-[#98c379]'
                                    : 'text-[#a6a7ab] hover:text-[#e6e6e6]'
                            }`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

