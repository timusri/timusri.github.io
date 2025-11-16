'use client';

import React from 'react';
import { 
    Cloud, Server, Boxes, Database, Activity, GitBranch, 
    Terminal, Workflow, Shield, Eye, Brain, AlertTriangle
} from 'lucide-react';

const SkillsGrid = () => {
    const skillCategories = [
        {
            title: 'Cloud Platforms',
            icon: Cloud,
            skills: ['AWS', 'GCP', 'FLY.IO'],
            color: '#61afef'
        },
        {
            title: 'Containers & Orchestration',
            icon: Boxes,
            skills: ['Kubernetes', 'Docker', 'GKE', 'EKS', 'Traefik'],
            color: '#56b6c2'
        },
        {
            title: 'CI/CD & IaC',
            icon: GitBranch,
            skills: ['Terraform', 'Ansible', 'Helm', 'GitHub Actions', 'Jenkins'],
            color: '#98c379'
        },
        {
            title: 'GitOps',
            icon: Workflow,
            skills: ['ArgoCD', 'Argo Workflows'],
            color: '#61afef'
        },
        {
            title: 'Monitoring & Observability',
            icon: Activity,
            skills: ['Prometheus', 'Grafana LGTM', 'Mimir', 'Beyla', 'DataDog', 'ELK Stack', 'Signoz'],
            color: '#e5c07b'
        },
        {
            title: 'Incident Response',
            icon: AlertTriangle,
            skills: ['PagerDuty', 'On-call Management'],
            color: '#e06c75'
        },
        {
            title: 'LLM & AI Ops',
            icon: Brain,
            skills: ['TensorZero', 'Langfuse', 'LiteLLM', 'Cursor'],
            color: '#d19a66'
        },
        {
            title: 'Databases',
            icon: Database,
            skills: ['Redis', 'MongoDB', 'PostgreSQL', 'Kafka', 'BigQuery', 'DynamoDB'],
            color: '#c678dd'
        },
        {
            title: 'Programming',
            icon: Terminal,
            skills: ['Python', 'Bash', 'Go', 'Elixir'],
            color: '#e06c75'
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1b1e]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#e6e6e6] mb-4">
                        Technical <span className="text-[#98c379]">Arsenal</span>
                    </h2>
                    <p className="text-[#a6a7ab] text-lg">
                        Tools and technologies I work with
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-[#25262b] rounded-xl p-6 border border-[#2c2e33] hover:border-[#98c379]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#98c379]/10"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-[#2c2e33] rounded-lg group-hover:bg-[#98c379]/10 transition-colors">
                                        <Icon className="w-6 h-6 text-[#98c379]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#e6e6e6]">
                                        {category.title}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 bg-[#2c2e33] text-[#a6a7ab] text-sm rounded-md hover:bg-[#363b44] hover:text-[#98c379] transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillsGrid;

