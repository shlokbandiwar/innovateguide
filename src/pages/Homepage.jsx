import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import StatsSection from '../components/sections/StatsSection';
import SearchBar from '../components/common/SearchBar';
import ProjectCard from '../components/marketplace/ProjectCard';
import CategoryCard from '../components/marketplace/CategoryCard';
import TestimonialCard from '../components/common/TestimonialCard';
import Carousel from '../components/common/Carousel';
import Button from '../components/common/Button';
import NewsletterForm from '../components/common/NewsletterForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { projectsService } from '../services/projectsService';
import { categoriesService } from '../services/categoriesService';
import { designSystem } from '../styles/designSystem/constants';

export default function Homepage() {
  const navigate = useNavigate();

  const [trendingProjects, setTrendingProjects] = useState([]);
  const [newlyAddedProjects, setNewlyAddedProjects] = useState([]);
  const [topSellingProjects, setTopSellingProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingTopSelling, setLoadingTopSelling] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    projectsService.getProjects({ sort: 'trending' }).then(res => {
      setTrendingProjects(res.slice(0, 3));
      setLoadingTrending(false);
    });
    projectsService.getProjects().then(res => {
      setNewlyAddedProjects(res.slice(0, 3));
      setLoadingNew(false);
    });
    projectsService.getProjects({ sort: 'price-desc' }).then(res => {
      setTopSellingProjects(res.slice(0, 3));
      setLoadingTopSelling(false);
    });
    categoriesService.getCategories().then(res => {
      setCategories(res);
      setLoadingCategories(false);
    });
  }, []);

  const handleSearch = (term) => {
    if (term) navigate(`/browse?q=${encodeURIComponent(term)}`);
  };

  const renderCardSkeleton = () => (
    <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-200 dark:border-[#334155] p-4 flex flex-col gap-4 animate-pulse shadow-sm h-72">
      <div className="w-full h-36 bg-gray-200 dark:bg-[#334155] rounded-lg" />
      <div className="h-4 bg-gray-200 dark:bg-[#334155] rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-[#334155] rounded w-5/6" />
      <div className="h-8 bg-gray-200 dark:bg-[#334155] rounded w-full mt-auto" />
    </div>
  );

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Lead Front-end Dev",
      company: "Devflow",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      quote: "The SaaS Dashboard template saved us at least 60 hours of frontend assembly. Highly clean, modular code.",
      rating: 5
    },
    {
      name: "Marcus Aurelius",
      role: "CTO",
      company: "Coliseum AI",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "Vetted source files mean I don't need to review code compliance. Standard layout templates integrate smoothly.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Solopreneur",
      company: "FitSync Mobile",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      quote: "The delivery app template was flawless. Native Flutter components compiled with Zero modification errors.",
      rating: 5
    }
  ];

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Search */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full text-center flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-[#F1F5F9]">
            Find the Template You Need
          </h2>
          <p className="text-xs md:text-sm text-neutral-muted dark:text-[#94A3B8]">
            Type project topics, languages, frameworks, or specific components below.
          </p>
        </div>
        <div className="max-w-2xl mx-auto w-full">
          <SearchBar onSearch={handleSearch} placeholder="e.g. Next.js, Stripe, Admin Dashboard..." />
        </div>
      </section>

      {/* 3. Stats */}
      <StatsSection />

      {/* 4. Why Choose */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Platform Benefits</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-[#F1F5F9]">
            Why Developers Choose InnovateGuide
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: 'verified_user',
              title: 'Vetted Code Quality',
              body: 'Every template undergoes strict engineering reviews to ensure zero runtime issues, proper file layout structure, and optimized dependencies.'
            },
            {
              icon: 'support_agent',
              title: 'Developer-on-Demand Support',
              body: 'Need custom integrations or custom feature builds? Post a custom project request and match with verified engineers ready to customize your template.'
            },
            {
              icon: 'currency_exchange',
              title: '14-Day Code Guarantee',
              body: 'Purchase with confidence. If a template codebase fails to build as described and the author cannot resolve it, you get a full refund.'
            }
          ].map(({ icon, title, body }) => (
            <div key={title} className="p-6 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl flex flex-col gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
              <h3 className="font-bold text-lg text-neutral-dark dark:text-[#E2E8F0]">{title}</h3>
              <p className="text-xs text-neutral-muted dark:text-[#94A3B8] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trending Projects */}
      <section className="w-full bg-primary-container text-white py-16 bg-grid-dots-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Hot Releases</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Trending Templates</h2>
            </div>
            <Link to="/browse?sort=trending" className="text-xs font-bold text-white hover:underline flex items-center gap-1">
              Browse All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          {loadingTrending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {renderCardSkeleton()}{renderCardSkeleton()}{renderCardSkeleton()}
            </div>
          ) : (
            <>
              <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden">
                {trendingProjects.map(project => (
                  <div key={project.id} className="flex-none w-[85vw] snap-start">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProjects.map(project => <ProjectCard key={project.id} project={project} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 6. Newly Added */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-gray-200 dark:border-[#334155] pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Fresh Code</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-[#F1F5F9]">Newly Added Projects</h2>
          </div>
          <Link to="/browse" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Browse Newest <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        {loadingNew ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCardSkeleton()}{renderCardSkeleton()}{renderCardSkeleton()}
          </div>
        ) : (
          <>
            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden">
              {newlyAddedProjects.map(project => (
                <div key={project.id} className="flex-none w-[85vw] snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newlyAddedProjects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          </>
        )}
      </section>

      {/* 7. Categories */}
      <section className="w-full bg-primary-container text-white py-16 bg-grid-dots-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Explore Catalog</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Browse by Category</h2>
          </div>
          {loadingCategories ? (
            <LoadingSpinner />
          ) : (
            <Carousel>
              {categories.map(category => <CategoryCard key={category.id} category={category} />)}
            </Carousel>
          )}
        </div>
      </section>

      {/* 8. Top Selling */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-gray-200 dark:border-[#334155] pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Bestsellers</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-[#F1F5F9]">Top Selling Packages</h2>
          </div>
          <Link to="/browse?sort=price-desc" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Browse Bestsellers <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        {loadingTopSelling ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCardSkeleton()}{renderCardSkeleton()}{renderCardSkeleton()}
          </div>
        ) : (
          <>
            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden">
              {topSellingProjects.map(project => (
                <div key={project.id} className="flex-none w-[85vw] snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSellingProjects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          </>
        )}
      </section>

      {/* 9. Testimonials */}
      <section className="w-full bg-primary-container text-white py-16 bg-grid-dots-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Reviews</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">What Developers Say</h2>
          </div>
          <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-none w-[85vw] snap-start">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
        </div>
      </section>

      {/* 10. CTA & Newsletter */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop w-full">
        <div className="py-12 bg-primary-container rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-12 relative overflow-hidden bg-grid-dots-white">
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left z-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Have a codebase to sell, or need customization?</h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              List your project for passive income, or match with developer squads ready to help customize existing repositories.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 z-10">
            <Link to="/sell"><Button variant="accent" size="lg">List Your Project</Button></Link>
            <Link to="/custom-request">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">Request Custom Build</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full pb-16">
        <NewsletterForm />
      </section>
    </div>
  );
}