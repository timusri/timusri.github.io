'use client';

import React, { useState, useEffect, useRef } from 'react';

const Resume = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(['Welcome to DevOps_Engineer.resume']);
    const [currentDir, setCurrentDir] = useState('~');
    const inputRef = useRef < HTMLInputElement > (null);

    const resumeData = {
        about: `
    Senior DevOps Engineer with 5+ years of experience in implementing and maintaining CI/CD pipelines, 
    container orchestration, and cloud infrastructure. Passionate about automation and infrastructure as code.
    `,
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
            email: 'devops@example.com',
            github: 'github.com/devops-engineer',
            linkedin: 'linkedin.com/in/devops-engineer'
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
GitHub: ${resumeData.contact.github}
LinkedIn: ${resumeData.contact.linkedin}
    `,
        clear: () => {
            setHistory(['Welcome to DevOps_Engineer.resume']);
            return '';
        }
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        if (trimmedCmd === '') return '';

        if (commands[trimmedCmd as keyof typeof commands]) {
            return commands[trimmedCmd as keyof typeof commands]();
        }

        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const output = handleCommand(input);
        setHistory(prev => [...prev, `${currentDir} $ ${input}`, output]);
        setInput('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Profile Section */}
                    <div className="space-y-6">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                                <img
                                    src="/profile-placeholder.jpg"
                                    alt="Profile"
                                    width={192}
                                    height={192}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-gray-500 mb-2">DevOps Engineer</div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Alex Smith</h1>
                                <p className="text-gray-600 mb-6">
                                    Passionate DevOps engineer specializing in cloud infrastructure,
                                    automation, and continuous delivery pipelines.
                                </p>
                                <div className="flex gap-4">
                                    <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                        Download CV
                                    </button>
                                    <button className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-gray-400 transition">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Section */}
                    <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-gray-800 p-2 flex items-center gap-2">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex-1 text-center text-sm text-gray-400">
                                <span className="mr-2">></span>
                                resume.sh
                            </div>
                        </div>
                        <div className="p-4 h-96 overflow-y-auto text-green-400 font-mono">
                            {history.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap mb-2">
                                    {line}
                                </div>
                            ))}
                            <form onSubmit={handleSubmit} className="flex items-center">
                                <span className="mr-2">{currentDir} $</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-green-400"
                                    autoFocus
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;