'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

const HeroSection = () => {
    const [currentRole, setCurrentRole] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    
    const roles = [
        'DevOps Engineer',
        'Cloud Architect',
        'Infrastructure Specialist',
        'Platform Engineer'
    ];
    
    useEffect(() => {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout: NodeJS.Timeout;
        
        const type = () => {
            const currentText = roles[roleIndex];
            
            if (!isDeleting && charIndex <= currentText.length) {
                setCurrentRole(currentText.substring(0, charIndex));
                charIndex++;
                timeout = setTimeout(type, 100);
                
                if (charIndex === currentText.length) {
                    timeout = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 2000);
                }
            } else if (isDeleting && charIndex >= 0) {
                setCurrentRole(currentText.substring(0, charIndex));
                charIndex--;
                timeout = setTimeout(type, 50);
                
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    timeout = setTimeout(type, 500);
                }
            }
        };
        
        type();
        
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[#1a1b1e]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, #2c2e33 1px, transparent 1px),
                                    linear-gradient(to bottom, #2c2e33 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    opacity: 0.3
                }}></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1b1e]/50 to-[#1a1b1e]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex flex-col items-center gap-8">
                    {/* Profile Image */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#98c379]/20 shadow-2xl shadow-[#98c379]/10">
                            <img
                                src="/profile-placeholder.jpg"
                                alt="Sumit Srivastava"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#98c379] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[#1a1b1e] text-sm">👋</span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-[#e6e6e6]">
                            Hi, I'm <span className="bg-gradient-to-r from-[#98c379] to-[#b5e890] bg-clip-text text-transparent">
                                Sumit Srivastava
                            </span>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-2 text-2xl md:text-4xl font-mono text-[#a6a7ab]">
                            <span className="text-[#98c379]">{'>'}</span>
                            <span className="text-[#e6e6e6]">{currentRole}</span>
                            <span className="animate-pulse text-[#98c379]">_</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="max-w-2xl text-lg md:text-xl text-[#a6a7ab] leading-relaxed">
                        Head of DevOps at Invideo, specializing in cloud infrastructure, Kubernetes, 
                        and building scalable solutions. Passionate about automation, reliability, and DevOps culture.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8 mb-16">
                        <Link
                            href="/blog"
                            className="group flex items-center gap-2 px-6 py-3 bg-[#98c379] text-[#1a1b1e] font-medium rounded-lg hover:bg-[#b5e890] transition-all duration-200 shadow-lg shadow-[#98c379]/20 hover:shadow-xl hover:shadow-[#98c379]/30 hover:-translate-y-0.5"
                        >
                            View Blog
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link
                            href="/contact"
                            className="group flex items-center gap-2 px-6 py-3 bg-[#25262b] text-[#e6e6e6] font-medium rounded-lg hover:bg-[#2c2e33] transition-all duration-200 border border-[#2c2e33] hover:border-[#98c379]/50 hover:-translate-y-0.5"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Me
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-12 animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-[#98c379]/30 flex items-start justify-center p-2 mx-auto">
                            <div className="w-1.5 h-1.5 bg-[#98c379] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

