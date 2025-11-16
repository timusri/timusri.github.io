import React from 'react';
import { Mail, Linkedin, Twitter, Github, MapPin, Briefcase, QrCode } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
    title: 'Contact | Sumit Srivastava',
    description: 'Get in touch with Sumit Srivastava - DevOps Engineer and Cloud Architect',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#1a1b1e] text-[#e6e6e6] pt-24 pb-12">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Get In <span className="text-[#98c379]">Touch</span>
                    </h1>
                    <p className="text-[#a6a7ab] text-lg">
                        I'm always open to discussing DevOps, cloud infrastructure, or new opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-[#25262b] rounded-xl p-6 border border-[#2c2e33]">
                            <h2 className="text-2xl font-bold text-[#e6e6e6] mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
                                {/* Email */}
                                <a
                                    href="mailto:srivastava.sumi3@gmail.com"
                                    className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg hover:bg-[#363b44] transition-colors group"
                                >
                                    <div className="p-3 bg-[#98c379]/10 rounded-lg group-hover:bg-[#98c379]/20 transition-colors">
                                        <Mail className="w-6 h-6 text-[#98c379]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#a6a7ab]">Email</div>
                                        <div className="text-[#e6e6e6] group-hover:text-[#98c379] transition-colors">
                                            srivastava.sumi3@gmail.com
                                        </div>
                                    </div>
                                </a>

                                {/* Location */}
                                <div className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg">
                                    <div className="p-3 bg-[#98c379]/10 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[#98c379]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#a6a7ab]">Location</div>
                                        <div className="text-[#e6e6e6]">Mumbai, India</div>
                                    </div>
                                </div>

                                {/* Current Role */}
                                <div className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg">
                                    <div className="p-3 bg-[#98c379]/10 rounded-lg">
                                        <Briefcase className="w-6 h-6 text-[#98c379]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#a6a7ab]">Current Role</div>
                                        <div className="text-[#e6e6e6]">Head of DevOps at Invideo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                        <div className="bg-[#25262b] rounded-xl p-6 border border-[#2c2e33]">
                            <h2 className="text-2xl font-bold text-[#e6e6e6] mb-6">
                                Connect With Me
                            </h2>

                            <div className="space-y-3">
                                <a
                                    href="https://www.linkedin.com/in/timusritcp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg hover:bg-[#363b44] transition-all hover:translate-x-1 group"
                                >
                                    <Linkedin className="w-6 h-6 text-[#98c379] group-hover:scale-110 transition-transform" />
                                    <div>
                                        <div className="text-[#e6e6e6] font-medium group-hover:text-[#98c379] transition-colors">
                                            LinkedIn
                                        </div>
                                        <div className="text-sm text-[#a6a7ab]">@timusritcp</div>
                                    </div>
                                </a>

                                <a
                                    href="https://github.com/timusri"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg hover:bg-[#363b44] transition-all hover:translate-x-1 group"
                                >
                                    <Github className="w-6 h-6 text-[#98c379] group-hover:scale-110 transition-transform" />
                                    <div>
                                        <div className="text-[#e6e6e6] font-medium group-hover:text-[#98c379] transition-colors">
                                            GitHub
                                        </div>
                                        <div className="text-sm text-[#a6a7ab]">@timusri</div>
                                    </div>
                                </a>

                                <a
                                    href="https://x.com/timus__"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg hover:bg-[#363b44] transition-all hover:translate-x-1 group"
                                >
                                    <Twitter className="w-6 h-6 text-[#98c379] group-hover:scale-110 transition-transform" />
                                    <div>
                                        <div className="text-[#e6e6e6] font-medium group-hover:text-[#98c379] transition-colors">
                                            Twitter/X
                                        </div>
                                        <div className="text-sm text-[#a6a7ab]">@timus__</div>
                                    </div>
                                </a>

                                <a
                                    href="https://timusri.medium.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-[#2c2e33] rounded-lg hover:bg-[#363b44] transition-all hover:translate-x-1 group"
                                >
                                    <div className="w-6 h-6 text-[#98c379] font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                                        M
                                    </div>
                                    <div>
                                        <div className="text-[#e6e6e6] font-medium group-hover:text-[#98c379] transition-colors">
                                            Medium
                                        </div>
                                        <div className="text-sm text-[#a6a7ab]">@timusri</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="bg-[#25262b] rounded-xl p-6 border border-[#2c2e33]">
                            <div className="flex items-center gap-2 mb-4">
                                <QrCode className="w-5 h-5 text-[#98c379]" />
                                <h3 className="text-lg font-bold text-[#e6e6e6]">
                                    Quick Connect
                                </h3>
                            </div>
                            <p className="text-sm text-[#a6a7ab] mb-4">
                                Scan to connect on LinkedIn
                            </p>
                            <div className="flex justify-center bg-white p-4 rounded-lg">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.linkedin.com/in/timusritcp"
                                    alt="LinkedIn QR Code"
                                    width={200}
                                    height={200}
                                    className="rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Message Section */}
                <div className="bg-gradient-to-br from-[#25262b] to-[#1a1b1e] rounded-xl p-8 border border-[#2c2e33]">
                    <h2 className="text-2xl font-bold text-[#e6e6e6] mb-4 text-center">
                        Let's Collaborate
                    </h2>
                    <p className="text-[#a6a7ab] text-center mb-6">
                        Whether you have a question, want to discuss DevOps best practices, or explore opportunities, 
                        feel free to reach out via email or connect on social media.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="mailto:srivastava.sumi3@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#98c379] text-[#1a1b1e] font-medium rounded-lg hover:bg-[#b5e890] transition-all duration-200 shadow-lg shadow-[#98c379]/20 hover:shadow-xl hover:shadow-[#98c379]/30 hover:-translate-y-0.5"
                        >
                            <Mail className="w-5 h-5" />
                            Send me an email
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

