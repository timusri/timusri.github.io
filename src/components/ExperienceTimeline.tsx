'use client';

import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const ExperienceTimeline = () => {
    const experiences = [
        {
            company: 'Invideo',
            location: 'Mumbai',
            position: 'Head of DevOps',
            period: 'November 2023 - Present',
            current: true,
            highlights: [
                'Leading DevOps team and overseeing product deployment strategy',
                'Managing security and compliance of infrastructure and applications',
                'Implementing comprehensive observability and monitoring solutions'
            ]
        },
        {
            company: 'Invideo',
            location: 'Mumbai',
            position: 'Senior DevOps Engineer',
            period: 'May 2022 - November 2023',
            current: false,
            highlights: [
                'Implemented IAP-based SSO using Pomerium for secure VPC database access',
                'Built end-to-end CI/CD pipelines with custom GitHub Actions for EKS deployments',
                'Implemented scalable LGTM observability stack for EKS applications',
                'Added synthetic monitoring for all public APIs to monitor uptime and internal SLAs',
                'Managed on-call process and escalation policies with PagerDuty and Slack'
            ]
        },
        {
            company: 'Invideo',
            location: 'Mumbai',
            position: 'DevOps Engineer',
            period: 'May 2021 - April 2022',
            current: false,
            highlights: [
                'Built ETL pipeline using AWS Glue and Redshift',
                'Built automated vulnerability scan pipelines using Checkov and Tfscans',
                'Implemented AWS AMI build automation using Ansible and Packer'
            ]
        },
        {
            company: 'Radware',
            location: 'Bangalore',
            position: 'Software Engineer R&D - DevOps',
            period: 'Feb 2019 - May 2021',
            current: false,
            highlights: [
                'Designed scalable infrastructure for GRPC load balancing using Nginx and Envoy (20% latency reduction)',
                'Designed infrastructure matrix in GCP across 10+ regions to maintain GDPR policies',
                'Developed cloud-independent middleware wrapper between ML modules and cloud',
                'Managed 10+ GKE clusters with 50+ microservices',
                'Optimized K8s node-pools to run in preemptible environment (30% cloud cost reduction)'
            ]
        },
        {
            company: 'Shieldsquare',
            location: 'Bangalore',
            position: 'DevOps Engineer',
            period: 'Feb 2017 - Feb 2019',
            current: false,
            highlights: [
                'Setup private VPN server using OpenVPN for secure access',
                'Managed IAM, Firewall rules, Cloud Armour policies and Kubernetes Cluster Roles',
                'Designed archiving system to store production data in GCP storage and BigQuery',
                'Managed sharded MongoDB cluster to handle 10K RPS with high availability',
                'Migrated production infrastructure from AWS to GCP'
            ]
        },
        {
            company: 'ChrisDev Limited',
            location: 'Trinidad & Tobago',
            position: 'Front-end Intern',
            period: 'June 2016 - July 2016',
            current: false,
            highlights: [
                'Developed front-end templates using Zurb Foundation, Django and Python'
            ]
        },
        {
            company: 'Creatella',
            location: 'Singapore',
            position: 'App Developer Intern',
            period: 'May 2016 - August 2016',
            current: false,
            highlights: [
                'Developed UI/UX of a language learning application using Framework7'
            ]
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#25262b]/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-4">
                        Career <span className="text-[#98c379]">Journey</span>
                    </h2>
                    <p className="text-[#a6a7ab] text-lg">
                        Building and scaling infrastructure at leading companies
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#2c2e33] hidden md:block"></div>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative pl-0 md:pl-20">
                                {/* Timeline Dot */}
                                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${
                                    exp.current 
                                        ? 'bg-[#98c379] border-[#98c379] shadow-lg shadow-[#98c379]/50' 
                                        : 'bg-[#25262b] border-[#2c2e33]'
                                } hidden md:block`}></div>

                                <div className="bg-[#25262b] rounded-xl p-6 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#98c379]/5">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-xl font-bold text-[#e6e6e6]">
                                                    {exp.position}
                                                </h3>
                                                {exp.current && (
                                                    <span className="px-2 py-1 bg-[#98c379]/10 text-[#98c379] text-xs font-medium rounded-md">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-[#a6a7ab] text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>{exp.company}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#a6a7ab] text-sm whitespace-nowrap">
                                            <Calendar className="w-4 h-4" />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-2">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="flex gap-2 text-[#a6a7ab]">
                                                <span className="text-[#98c379] mt-1.5">•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;

