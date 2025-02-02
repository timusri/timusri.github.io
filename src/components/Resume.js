'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Instagram, BookOpen, Twitter, Github, Rss } from 'lucide-react';
import Link from 'next/link';

const Resume = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(['']);
    const [currentDir, setCurrentDir] = useState('~');
    const [typing, setTyping] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    const resumeData = {
        about: [
            'Senior DevOps Engineer with extensive experience in cloud infrastructure and automation.',
            'Passionate about building scalable systems and improving development workflows.',
            'Experienced in implementing and maintaining CI/CD pipelines.'
        ],
        skills: [
            'AWS, GCP, Azure',
            'Kubernetes, Docker',
            'Terraform, Ansible',
            'Jenkins, GitLab CI',
            'Python, Bash, Go',
            'Prometheus, Grafana',
            'ELK Stack',
            'Linux System Administration'
        ],
        experience: [
            {
                company: 'TechCorp Inc.',
                position: 'Senior DevOps Engineer',
                period: '2021-Present',
                details: [
                    'Led migration of 200+ microservices to Kubernetes',
                    'Reduced deployment time by 70% through CI/CD optimization',
                    'Implemented infrastructure as code using Terraform'
                ]
            },
            {
                company: 'CloudSys Solutions',
                position: 'DevOps Engineer',
                period: '2019-2021',
                details: [
                    'Managed AWS infrastructure for 50+ applications',
                    'Implemented monitoring and alerting using Prometheus',
                    'Automated backup and disaster recovery procedures'
                ]
            }
        ],
        contact: {
            email: 'srivastava.sumi3@gmail.com',
            linkedin: 'www.linkedin.com/in/timustcp'
        },
        blogs: [
            {
                title: "GRPC Loadbalancing in GKE using Nginx Ingress Controller",
                date: "December 2020",
                link: "https://faun.pub/grpc-loadbalancing-in-gke-using-nginx-ingress-controller-40d0b1971c3c"
            },
            {
                title: "K8s Microservice Monitoring using Prometheus and Grafana",
                date: "March 2021",
                link: "https://faun.pub/k8s-microservice-monitoring-using-prometheus-and-grafana-106d0397b01b"
            },
            {
                title: "How do we calculate the IOPS of AWS GP2 type volume?",
                date: "April 2024",
                link: "https://timusri.medium.com/how-do-we-calculate-the-iops-of-aws-gp2-type-volume-289f365649a2"
            }
        ]
    };

    const typeText = async (text) => {
        setIsTyping(true);
        let currentText = '';
        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setHistory(prev => [...prev.slice(0, -1), currentText]);
            await new Promise(resolve => setTimeout(resolve, 20));
        }
        setIsTyping(false);
    };

    const commands = {
        help: async () => {
            const text = `
Available commands:
  about     - Display information about me
  skills    - List technical skills
  experience- Show work experience
  contact   - Display contact information
  passions  - What I'm passionate about
  clear     - Clear terminal
  help      - Show this help message
            `;
            await typeText(text);
            return text;
        },
        about: async () => {
            const text = resumeData.about.join('\n');
            await typeText(text);
            return text;
        },
        skills: async () => {
            const text = resumeData.skills.join('\n');
            await typeText(text);
            return text;
        },
        experience: async () => {
            const text = resumeData.experience.map(exp => `
${exp.company} - ${exp.position}
${exp.period}
${exp.details.map(detail => `• ${detail}`).join('\n')}
            `).join('\n');
            await typeText(text);
            return text;
        },
        contact: async () => {
            const text = `
Email: ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}
            `;
            await typeText(text);
            return text;
        },
        passions: async () => {
            const text = `
What I'm passionate about:
• Cloud Architecture
• Infrastructure as Code
• Automation
• DevOps Culture
• Continuous Learning
• Problem Solving
            `;
            await typeText(text);
            return text;
        },
        clear: () => {
            setHistory(['']);
            return '';
        }
    };

    const handleCommand = async (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        if (trimmedCmd === '') return '';

        if (commands[trimmedCmd]) {
            return await commands[trimmedCmd]();
        }

        const text = `Command not found: ${cmd}. Type 'help' for available commands.`;
        await typeText(text);
        return text;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isTyping) return; // Prevent new commands while typing
        const currentInput = input;
        setInput('');
        setHistory(prev => [...prev, `$ ${currentInput}`]);
        const result = await handleCommand(currentInput);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const messages = [
            "Hey! I'm Sumit Srivastava",
            "Type 'help' to see available commands"
        ];

        setTyping('');
        setShowPrompt(false);

        let messageIndex = 0;
        let charIndex = 0;
        let currentText = '';

        const typeWriter = () => {
            if (messageIndex < messages.length) {
                const currentMessage = messages[messageIndex];

                if (charIndex < currentMessage.length) {
                    currentText += currentMessage[charIndex];
                    setTyping(currentText);
                    charIndex++;
                } else {
                    currentText += '\n';
                    setTyping(currentText);
                    messageIndex++;
                    charIndex = 0;
                }
            } else {
                setShowPrompt(true);
                return;
            }
        };

        const intervalId = setInterval(typeWriter, 50);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e]">
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-[#25262b] rounded-xl shadow-2xl p-8 border border-[#2c2e33]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column - About */}
                        <div className="md:col-span-1 space-y-8">
                            {/* Profile Photo */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-2 ring-[#2c2e33] shadow-lg">
                                    <img
                                        src="/profile-placeholder.jpg" // Make sure to add your profile image to the public folder
                                        alt="Sumit Srivastava"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-[#e6e6e6] mb-2">Sumit Srivastava</h2>
                                <p className="text-[#a6a7ab] mb-4">
                                    DevOps Engineer with expertise in cloud infrastructure, automation, and scalable solutions.
                                    Currently working on optimizing deployment processes and infrastructure management in Invdeo.
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.linkedin.com/in/timustcp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                    <a
                                        href="https://timusri.medium.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        <BookOpen size={20} />
                                    </a>
                                    <a
                                        href="/blog"
                                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        <Rss size={20} />
                                    </a>
                                    <a
                                        href="https://github.com/timusri"
                                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a
                                        href="https://x.com/timus__"
                                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-[#e6e6e6]">Latest Blog Posts</h3>
                                    <Link
                                        href="/blog"
                                        className="text-sm text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                                    >
                                        View All →
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.blogs.map((blog, index) => (
                                        <div key={index} className="group">
                                            <a
                                                href={blog.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block group-hover:bg-[#2c2e33] rounded-lg p-3 transition-colors duration-200"
                                            >
                                                <h4 className="text-[#98c379] font-medium mb-1 group-hover:text-[#b5e890]">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-[#a6a7ab] text-sm">
                                                    {blog.date}
                                                </p>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Terminal */}
                        <div className="md:col-span-2">
                            <div className="bg-[#1e2127] rounded-lg shadow-xl overflow-hidden border border-[#2a2e37]">
                                {/* Terminal Header */}
                                <div className="bg-[#2a2e37] p-3 flex items-center border-b border-[#363b44]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex-1 text-center text-sm text-[#98c379] font-mono">
                                        ⌘ resume.sh
                                    </div>
                                </div>

                                {/* Terminal Content */}
                                <div
                                    ref={terminalRef}
                                    className="p-6 h-[600px] overflow-y-auto text-[#98c379] font-mono"
                                >
                                    <div className="whitespace-pre-line mb-4">
                                        {typing}
                                    </div>
                                    {showPrompt && (
                                        <>
                                            {history.slice(1).map((line, i) => (
                                                <div key={i} className="whitespace-pre-wrap mb-2">
                                                    {line}
                                                </div>
                                            ))}
                                            <form onSubmit={handleSubmit} className="flex items-center">
                                                <span className="mr-2">~ $</span>
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    className="flex-1 bg-transparent outline-none text-[#98c379]"
                                                    autoFocus
                                                    disabled={isTyping}
                                                />
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Resume;

