'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const Resume = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(['']);
    const [currentDir, setCurrentDir] = useState('~');
    const [typing, setTyping] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    const resumeData = {
        about: `
    Skilled DevOps Engineer with 5+ years of hands-on experience supporting, automating, and optimizing mission-critical deployments in GCP, and AWS, leveraging configuration management, CI/CD, and DevOps processes. Serving as a key member of the engineering department and aids in deploying shared infrastructure and traffic management services.
    `,
        skills: [
            'Python (Programming Language)',
            'Prometheus.io',
            'Bash'
        ],
        experience: [
            {
                company: 'InVideo',
                position: 'DevOps Lead',
                period: 'November 2023 - Present (1 year 4 months)',
                details: [
                    'Led DevOps team to optimize deployments and infrastructure.',
                    'Implemented CI/CD pipelines and automated processes.'
                ]
            },
            {
                company: 'InVideo',
                position: 'Senior DevOps Engineer',
                period: 'May 2022 - November 2023 (1 year 7 months)',
                details: [
                    'Managed cloud infrastructure and deployment processes.',
                    'Optimized Kubernetes clusters for cost efficiency.'
                ]
            },
            {
                company: 'InVideo',
                position: 'DevOps Engineer',
                period: 'May 2021 - April 2022 (1 year)',
                details: [
                    'Developed scalable infrastructure solutions.',
                    'Implemented monitoring and alerting systems.'
                ]
            },
            {
                company: 'Radware Bot Manager',
                position: 'Software Engineer - R&D',
                period: 'February 2019 - April 2021 (2 years 3 months)',
                details: [
                    'Designed scalable infrastructure for GRPC traffic.',
                    'Developed cloud-independent middleware for ML modules.'
                ]
            },
            {
                company: 'Radware Bot Manager',
                position: 'DevOps Engineer',
                period: 'March 2018 - February 2019 (1 year)',
                details: [
                    'Setup private VPN server and managed IAM policies.',
                    'Streamed live traffic for real-time analysis.'
                ]
            },
            {
                company: 'Radware Bot Manager',
                position: 'Associate DevOps Engineer',
                period: 'February 2017 - March 2018 (1 year 2 months)',
                details: [
                    'Managed production infrastructure and domain names.',
                    'Developed CDN-based front-end infrastructure.'
                ]
            },
            {
                company: 'ChrisDev',
                position: 'Full Stack Engineer',
                period: 'June 2016 - August 2016 (3 months)',
                details: [
                    'Developed front-end templates using Zurb Foundation and Django.'
                ]
            },
            {
                company: 'Creatella',
                position: 'Frontend Developer',
                period: 'May 2016 - August 2016 (4 months)',
                details: [
                    'Developed UI/UX for a language learning application.'
                ]
            }
        ],
        contact: {
            email: 'srivastava.sumi3@gmail.com',
            linkedin: 'www.linkedin.com/in/timustcp',
            blog: 'timusri.medium.com'
        }
    };

    const commands = {
        help: () => `
Available commands:
  about     - Display information about me
  skills    - List technical skills
  experience- Show work experience
  contact   - Display contact information
  clear     - Clear terminal
  help      - Show this help message
    `,
        about: () => resumeData.about,
        skills: () => resumeData.skills.join('\n'),
        experience: () => resumeData.experience.map(exp => `
${exp.company} - ${exp.position}
${exp.period}
${exp.details.map(detail => `• ${detail}`).join('\n')}
    `).join('\n'),
        contact: () => `
Email: ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}
Blog: ${resumeData.contact.blog}
    `,
        clear: () => {
            setHistory(['']);
            return '';
        }
    };

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    const typeText = async (text) => {
        let currentText = '';
        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            setHistory(prev => [...prev.slice(0, -1), currentText]);
            setTimeout(scrollToBottom, 0);
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    };

    const handleCommand = async (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        if (trimmedCmd === '') return '';

        setHistory(prev => [...prev, `${currentDir} $ ${cmd}`, '']);
        setTimeout(scrollToBottom, 0);

        if (commands[trimmedCmd]) {
            const output = commands[trimmedCmd]();
            await typeText(output);
        } else {
            await typeText(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInput('');
        await handleCommand(input);
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
    }, [typing, showPrompt]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column - About */}
                        <div className="md:col-span-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">About Me</h2>
                                <p className="text-gray-600">
                                    DevOps Engineer with expertise in cloud infrastructure, automation, and scalable solutions.
                                    Currently working on optimizing deployment processes and infrastructure management.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">Life so far...</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Started as DevOps Engineer in 2017</li>
                                    <li>Led DevOps team at InVideo</li>
                                    <li>Managed cloud infrastructure since 2018</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">Passionate about...</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Cloud Architecture</li>
                                    <li>Infrastructure as Code</li>
                                    <li>Automation</li>
                                    <li>DevOps Culture</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Terminal */}
                        <div className="md:col-span-2">
                            <div className="bg-[#1e2127] rounded-lg shadow-xl overflow-hidden">
                                {/* Terminal Header */}
                                <div className="bg-[#2a2e37] p-3 flex items-center">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="flex-1 text-center text-sm text-green-400 font-mono">
                                        ⌘ timux.sh
                                    </div>
                                </div>

                                {/* Terminal Content */}
                                <div
                                    ref={terminalRef}
                                    className="p-6 h-[600px] overflow-y-auto text-green-400 font-mono"
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
                                                    className="flex-1 bg-transparent outline-none text-green-400"
                                                    autoFocus
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

