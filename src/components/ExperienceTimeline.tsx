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
                'Managing security and compliance of infrastructure and applications'
            ]
        },
        {
            company: 'Invideo',
            location: 'Mumbai',
            position: 'Senior DevOps Engineer',
            period: 'May 2022 - November 2023',
            current: false,
            highlights: [
                'Built end-to-end CI/CD pipelines with custom GitHub Actions for EKS deployments',
                'Implemented scalable LGTM observability stack for EKS applications'
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
                'Designed scalable infrastructure for GRPC load balancing (20% latency reduction)',
                'Managed 10+ GKE clusters with 50+ microservices'
            ]
        },
        {
            company: 'Shieldsquare',
            location: 'Bangalore',
            position: 'DevOps Engineer',
            period: 'Feb 2017 - Feb 2019',
            current: false,
            highlights: [
                'Managed sharded MongoDB cluster to handle 10K RPS with high availability',
                'Migrated production infrastructure from AWS to GCP'
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

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative pl-0 md:pl-20">
                                {/* Timeline Dot */}
                                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${
                                    exp.current 
                                        ? 'bg-[#98c379] border-[#98c379] shadow-lg shadow-[#98c379]/50' 
                                        : 'bg-[#25262b] border-[#2c2e33]'
                                } hidden md:block`}></div>

                                <div className="bg-[#25262b] rounded-xl p-5 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#98c379]/5">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-[#e6e6e6]">
                                                    {exp.position}
                                                </h3>
                                                {exp.current && (
                                                    <span className="px-2 py-0.5 bg-[#98c379]/10 text-[#98c379] text-xs font-medium rounded-md">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-[#a6a7ab] text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="w-3.5 h-3.5" />
                                                    <span>{exp.company}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#a6a7ab] text-sm whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-1.5">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="flex gap-2 text-[#a6a7ab] text-sm">
                                                <span className="text-[#98c379] mt-1">•</span>
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

