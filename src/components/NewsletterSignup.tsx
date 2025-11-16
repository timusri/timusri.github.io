'use client';

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');
        
        // TODO: Replace with actual newsletter service integration
        // Example services: ConvertKit, Mailchimp, Buttondown, etc.
        
        // Simulated API call
        setTimeout(() => {
            setStatus('success');
            setMessage('Thanks for subscribing! Check your email for confirmation.');
            setEmail('');
            
            // Reset after 5 seconds
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        }, 1000);
    };

    return (
        <section className="mt-16 pt-16 border-t border-[#2c2e33]">
            <div className="bg-gradient-to-br from-[#25262b] to-[#1a1b1e] rounded-xl p-8 border border-[#2c2e33]">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98c379]/10 rounded-full mb-6">
                        <Mail className="w-8 h-8 text-[#98c379]" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-[#e6e6e6] mb-4">
                        Subscribe to the Newsletter
                    </h2>
                    
                    <p className="text-[#a6a7ab] mb-8">
                        Get notified about new posts on DevOps, cloud infrastructure, and software engineering.
                        No spam, unsubscribe anytime.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            disabled={status === 'loading'}
                            className="flex-1 px-4 py-3 bg-[#1a1b1e] border border-[#2c2e33] rounded-lg text-[#e6e6e6] placeholder-[#a6a7ab] focus:outline-none focus:border-[#98c379] focus:ring-1 focus:ring-[#98c379] transition-all disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#98c379] text-[#1a1b1e] font-medium rounded-lg hover:bg-[#b5e890] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Subscribing...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>Subscribe</span>
                                </>
                            )}
                        </button>
                    </form>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-sm ${
                            status === 'success' 
                                ? 'bg-[#98c379]/10 text-[#98c379]' 
                                : 'bg-red-500/10 text-red-400'
                        }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;

