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

// Services Layer
import { projectsService } from '../services/projectsService';
import { categoriesService } from '../services/categoriesService';

// Design system constants
import { designSystem } from '../styles/designSystem/constants';

export default function Homepage() {
  const navigate = useNavigate();

  // Async States
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [newlyAddedProjects, setNewlyAddedProjects] = useState([]);
  const [topSellingProjects, setTopSellingProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingTopSelling, setLoadingTopSelling] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch mock data asynchronously
  useEffect(() => {
    // 1. Trending Projects (Sorted by highest rating)
    projectsService.getProjects({ sort: 'trending' })
      .then(res => {
        setTrendingProjects(res.slice(0, 3));
        setLoadingTrending(false);
      });

    // 2. Newly Added Projects (First 3 from default list)
    projectsService.getProjects()
      .then(res => {
        setNewlyAddedProjects(res.slice(0, 3));
        setLoadingNew(false);
      });

    // 3. Top Selling Projects (Sorted by highest price / volume)
    projectsService.getProjects({ sort: 'price-desc' })
      .then(res => {
        setTopSellingProjects(res.slice(0, 3));
        setLoadingTopSelling(false);
      });

    // 4. Categories
    categoriesService.getCategories()
      .then(res => {
        setCategories(res);
        setLoadingCategories(false);
      });
  }, []);

  const handleSearch = (term) => {
    if (term) {
      navigate(`/browse?q=${encodeURIComponent(term)}`);
    }
  };

  // Render Skeleton Placeholders
  const renderCardSkeleton = () => (
    <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/25 p-4 flex flex-col gap-4 animate-pulse shadow-sm h-72">
      <div className="w-full h-36 bg-neutral-outline/20 rounded-lg" />
      <div className="h-4 bg-neutral-outline/20 rounded w-3/4" />
      <div className="h-3 bg-neutral-outline/20 rounded w-5/6" />
      <div className="h-8 bg-neutral-outline/20 rounded w-full mt-auto" />
    </div>
  );

  // Hardcoded premium testimonials
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
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Search Projects Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full text-center flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-white">
            Find the Template You Need
          </h2>
          <p className="text-xs md:text-sm text-neutral-muted dark:text-gray-300">
            Type project topics, languages, frameworks, or specific components below.
          </p>
        </div>
        <div className="max-w-2xl mx-auto w-full">
          <SearchBar onSearch={handleSearch} placeholder="e.g. Next.js, Stripe, Admin Dashboard..." />
        </div>
      </section>

      {/* 3. Statistics Section */}
      <StatsSection />

      {/* 4. Why Choose InnovateGuide Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Platform Benefits
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark dark:text-white">
            Why Developers Choose InnovateGuide
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
            <h3 className="font-bold text-lg text-neutral-dark dark:text-white">Vetted Code Quality</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Every template undergoes strict engineering reviews to ensure zero runtime issues, proper file layout structure, and optimized dependencies.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
            <h3 className="font-bold text-lg text-neutral-dark dark:text-white">Developer-on-Demand Support</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Need custom integrations or custom feature builds? Post a custom project request and match with verified engineers ready to customize your template.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl flex flex-col gap-3">
            <span className="material-symbols-outlined text-3xl text-primary">currency_exchange</span>
            <h3 className="font-bold text-lg text-neutral-dark dark:text-white">14-Day Code Guarantee</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Purchase with confidence. If a template codebase fails to build as described and the author cannot resolve it, you get a full refund.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Trending Projects Section */}
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
              {renderCardSkeleton()}
              {renderCardSkeleton()}
              {renderCardSkeleton()}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trendingProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Newly Added Projects Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-neutral-outline/10 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Fresh Code</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark">Newly Added Projects</h2>
          </div>
          <Link to="/browse" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Browse Newest <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loadingNew ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCardSkeleton()}
            {renderCardSkeleton()}
            {renderCardSkeleton()}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newlyAddedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Categories Section */}
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
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {/* 8. Top Selling Projects Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-neutral-outline/10 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Bestsellers</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark">Top Selling Packages</h2>
          </div>
          <Link to="/browse?sort=price-desc" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Browse Bestsellers <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loadingTopSelling ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCardSkeleton()}
            {renderCardSkeleton()}
            {renderCardSkeleton()}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topSellingProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 9. Testimonials Section */}
      <section className="w-full bg-primary-container text-white py-16 bg-grid-dots-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Reviews</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">What Developers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA Section & Newsletter */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full py-12 bg-primary-container rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-12 relative overflow-hidden bg-grid-dots-white">
        <div className="flex flex-col gap-3 max-w-xl text-center md:text-left z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Have a codebase to sell, or need customization?</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            List your project for passive income, or match with developer squads ready to help customize existing repositories.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 z-10">
          <Link to="/sell">
            <Button variant="accent" size="lg">List Your Project</Button>
          </Link>
          <Link to="/custom-request">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/10">Request Custom Build</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full pb-16">
        <NewsletterForm />
      </section>
    </div>
  );
}

