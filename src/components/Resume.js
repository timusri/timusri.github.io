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
            'DevOps and Cloud Platform Engineer with extensive experience in cloud infrastructure, automation, and scalable solutions.',
            'Specializing in AWS, GCP, Kubernetes, and Infrastructure as Code.',
            'Passionate about building resilient systems and optimizing development workflows.'
        ],
        contact: {
            email: 'srivastava.sumi3@gmail.com',
            linkedin: 'timusritcp',
            twitter: 'timus_',
            github: 'timusri',
            blog: 'timusri.medium.com'
        },
        experience: [
            {
                company: 'Invideo',
                location: 'Mumbai',
                position: 'Head of DevOps',
                period: 'November 2023 - Present',
                details: [
                    'Responsible for leading the DevOps team and overseeing the development and deployment of our products',
                    'Responsible for security and compliance of the infrastructure and applications',
                    'Responsible for the observability and monitoring of the infrastructure and applications'
                ]
            },
            {
                company: 'Invideo',
                location: 'Mumbai',
                position: 'Senior DevOps Engineer',
                period: 'May 2022 - November 2023',
                details: [
                    'IAP based SSO implementation using Pomerium to securely access private databases inside a VPC',
                    'Responsible for maintaining and writing IAC using Terraform',
                    'Secret management within AWS EKS using AWS Parameter Store and CSI driver',
                    'Data Archiving pipelines with AWS Backup',
                    'End to End CI/CD Pipelines using custom composite GitHub actions for EKS deployments with linting and security check pipelines',
                    'Implemented Scalable LGTM Observability stack for continuous logging and tracing of EKS Applications',
                    'Added Synthetic monitoring for all the public APIs in order to monitor the Uptime and internal SLAs',
                    'Managing the On-call process and the escalation policies with Pagerduty and slack'
                ]
            },
            {
                company: 'Invideo',
                location: 'Mumbai',
                position: 'DevOps Engineer',
                period: 'May 2021 - April 2022',
                details: [
                    'Build the ETL Pipeline using AWS Glue and Redshift',
                    'Build automated vulnerability scan pipelines using Checkov and Tfscans',
                    'AWS AMI build automation using Ansible and Packer'
                ]
            },
            {
                company: 'Radware',
                location: 'Bangalore',
                position: 'Software Engineer R&D - DevOps',
                period: 'Feb 2019 - May 2021',
                details: [
                    'Designed a scalable infrastructure to load balance GRPC traffic over multiple microservices using Nginx and Envoy ingress controllers and reduced the latency by 20%',
                    'Designed an infrastructure matrix in GCP over a private shared-network, to deploy applications and hold data in more than 10 different regions to maintain GDPR policies using terraform and helm',
                    'Developed a cloud independent middleware wrapper, which interacts between ML modules and cloud',
                    'Developed an auto-scalable scheduling framework to submit ML jobs using AI platform and K8s APIs',
                    'Responsible for managing TLS/SASL enabled Kafka clusters to handle 100K RPS of live traffic',
                    'Developed alerting and monitoring system using Prometheus, Slack and ELK stack',
                    'Responsible for managing more than 10 GKE clusters with 50+ microservices',
                    'Responsible for optimizing K8s node-pools and applications to run in the preemptible environment to reduce 30% cloud cost',
                    'Developed pipeline to configure HPA on external or custom metrics using Prometheus and Stackdriver adaptor',
                    'Responsible for managing Redis clusters in Kubernetes for the caching system to store 600+ GB of data',
                    'Automated CI/CD pipelines for backend/ml modules using Jenkins, Bitbucket and helm'
                ]
            },
            {
                company: 'Shieldsquare',
                location: 'Bangalore',
                position: 'DevOps Engineer',
                period: 'Feb 2017 - Feb 2019',
                details: [
                    'Setup a private VPN server to access staging and production machines using OpenVPN',
                    'Managed IAM, Firewall rules, Cloud Armour policies and Kubernetes Cluster Roles in the organization',
                    'Designed an archiving system to store production data in GCP storage bucket and BigQuery',
                    'Streamed live traffic in BigQuery using Python and Kafka for real-time analysis',
                    'Managed sharded Mongo cluster to handle 10K RPS of traffic with fault tolerance and high availability',
                    'Developed a CDN based front-end infrastructure to host custom JavaScript files globally',
                    'Migrated production infrastructure from AWS to GCP',
                    'Managed production domain names hosted zones in Route53'
                ]
            },
            {
                company: 'ChrisDev Limited',
                location: 'Trinidad & Tobago',
                position: 'Front-end Intern',
                period: 'June 2016 - July 2016',
                details: [
                    'Developed front-end templates using Zurb Foundation, Django and Python'
                ]
            },
            {
                company: 'Creatella',
                location: 'Singapore',
                position: 'App Developer Intern',
                period: 'May 2016 - August 2016',
                details: [
                    'Developed UI/UX of a language learning application using Framework7'
                ]
            }
        ],
        skills: {
            languages: ['Python', 'Bash', 'Go'],
            cicd: ['Terraform', 'Ansible', 'Helm', 'Packer', 'Atlantis', 'Jenkins', 'Github Action'],
            cloud: ['GCP', 'AWS'],
            containers: ['Kubernetes', 'Docker', 'GKE', 'EKS', 'FLY.IO'],
            monitoring: ['ELK stack', 'Prometheus', 'Stackdriver', 'DataDog', 'Signoz', 'Grafana LGTM stack'],
            databases: ['Redis', 'Kafka', 'MongoDB', 'BigQuery', 'DynamoDB', 'RDS', 'RedShift'],
            versionControl: ['Github', 'Bitbucket', 'GitLab'],
            os: ['Ubuntu', 'Centos7', 'Redhat7']
        },
        education: [
            {
                institution: 'Shri Mata Vaishno Devi University',
                location: 'Jammu',
                degree: 'B.Tech in Computer Science and Engineering',
                period: '2013-2017',
                details: ['CGPA: 7.04/10']
            }
        ],
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
            await new Promise(resolve => setTimeout(resolve, 10));
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
Phone: ${resumeData.contact.phone}
LinkedIn: ${resumeData.contact.linkedin}
Twitter: ${resumeData.contact.twitter}
Github: ${resumeData.contact.github}
Blog: ${resumeData.contact.blog}
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

