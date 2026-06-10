import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  const mentors = [
    {
      name: "Marcus Chen",
      role: "Senior Architect @ FinTech",
      bio: "Expert in Distributed Systems & Scalable Microservices architecture design patterns.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sarah Williams",
      role: "Lead Designer @ CreativeFlow",
      bio: "Specializing in UX Strategy, Design Systems patterns, and high-velocity interface flows.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Miller",
      role: "DevOps Engineer @ CloudBase",
      bio: "Master of CI/CD orchestration, Docker/Kubernetes container infrastructure, and security compliance.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Elena Rossi",
      role: "Data Science Lead @ AI.io",
      bio: "Guiding research and deployment of complex Machine Learning models and Big Data pipelines.",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 py-10">
      
      {/* Hero Banner Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col gap-4 text-neutral-dark dark:text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Our Purpose</span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            The Bridge Between Theory and Reality
          </h1>
          <p className="text-sm md:text-base text-neutral-muted dark:text-gray-300 leading-relaxed max-w-xl">
            InnovateGuide was born from a simple realization: the distance between university textbooks and actual industry codebases is a chasm. We exist to build the bridge.
          </p>
          <p className="text-xs md:text-sm text-neutral-muted dark:text-gray-300 leading-relaxed max-w-xl">
            For decades, tech education has focused on the 'what'—the syntax, the definitions, the academic theories. But modern industry demands the 'how'—how to scale, how to maintain, and how to innovate within complex systems. We curate production-grade projects designed by industry veterans.
          </p>
          <div className="flex gap-4 mt-2">
            <Link to="/browse">
              <Button variant="primary" size="md">Explore Blueprints</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary" size="md">Learn More</Button>
            </Link>
          </div>
        </div>
        
        {/* Metric Graphics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm">
            <span className="text-3xl md:text-4xl font-extrabold text-white">500+</span>
            <span className="text-[10px] uppercase font-bold text-gray-200 mt-2">Active Mentors</span>
          </div>
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm">
            <span className="text-3xl md:text-4xl font-extrabold text-white">15k+</span>
            <span className="text-[10px] uppercase font-bold text-gray-200 mt-2">Students Placed</span>
          </div>
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm col-span-2">
            <span className="text-3xl md:text-4xl font-extrabold text-secondary">99%</span>
            <span className="text-[10px] uppercase font-bold text-gray-200 mt-2">Compilation Success Rate</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Guiding Standards</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-white">Our Core Values</h2>
          <p className="text-xs text-neutral-muted max-w-md mx-auto">
            The principles that guide our platform, our team, and our curriculum every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-xl flex flex-col gap-3 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary">psychology</span>
            <h3 className="font-bold text-base text-white">Innovation</h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              We constantly evolve our curriculum to match the blistering pace of the tech industry. Standing still is the same as moving backward.
            </p>
          </div>
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-xl flex flex-col gap-3 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary">gavel</span>
            <h3 className="font-bold text-base text-white">Integrity</h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              We provide honest feedback and production-grade assessments. We value deep understanding over quick, superficial completions.
            </p>
          </div>
          <div className="p-6 bg-primary-container text-white border border-white/10 rounded-xl flex flex-col gap-3 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary">rocket_launch</span>
            <h3 className="font-bold text-base text-white">Impact</h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Our success is measured solely by our students' career breakthroughs. We build for long-term professional results.
            </p>
          </div>
        </div>

      </section>

      {/* Path to Mastery Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">The Process</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-white">The Path to Mastery</h2>
          <p className="text-xs text-neutral-muted max-w-md mx-auto">
            A straightforward three-step process to transform your technical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Flow Cards */}
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-2 text-neutral-dark dark:text-white shadow-sm">
            <span className="text-3xl font-black text-secondary">01</span>
            <h3 className="font-extrabold text-base">Browse</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Explore our curated collection of real-world project blueprints across various tech stacks and industries.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-2 text-neutral-dark dark:text-white shadow-sm">
            <span className="text-3xl font-black text-secondary">02</span>
            <h3 className="font-extrabold text-base">Purchase</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Secure lifetime access to comprehensive documentation, starter kits, and implementation guides for your chosen path.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-2 text-neutral-dark dark:text-white shadow-sm">
            <span className="text-3xl font-black text-secondary">03</span>
            <h3 className="font-extrabold text-base">Implement</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Build and deploy the project with expert support, adding a verified, high-impact piece to your professional portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Mentor Network section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Elite Architects</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-white">The Mentor Network</h2>
          <p className="text-xs text-neutral-muted max-w-md mx-auto">
            Learn directly from the architects of today's most successful tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((m, i) => (
            <div key={i} className="bg-white dark:bg-neutral-dark border border-neutral-outline/25 p-5 rounded-2xl flex flex-col items-center text-center gap-4 text-neutral-dark dark:text-white shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={m.avatarUrl} 
                alt={m.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
              />
              <div className="flex flex-col gap-0.5">
                <h4 className="font-extrabold text-sm">{m.name}</h4>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">{m.role}</span>
              </div>
              <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
