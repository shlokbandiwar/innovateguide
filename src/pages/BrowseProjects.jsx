import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsService } from '../services/projectsService';
import { categoriesService } from '../services/categoriesService';
import ProjectCard from '../components/marketplace/ProjectCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';

export default function BrowseProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [difficulty, setDifficulty] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  // Async Data
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Common technologies for tags filter
  const TECH_OPTIONS = ['React', 'Next.js', 'Python', 'Flutter', 'TypeScript', 'Docker', 'Firebase', 'Tailwind CSS'];

  // Update query states if searchParams change
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Fetch Categories
  useEffect(() => {
    categoriesService.getCategories().then(res => setCategories(res));
  }, []);

  // Fetch & Filter Projects
  useEffect(() => {
    setLoading(true);
    
    // Pass filters directly to the mock backend service
    const filterParams = {
      q: searchQuery,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      budgetMin: priceMin,
      budgetMax: priceMax,
      sort: sortBy
    };

    projectsService.getProjects(filterParams).then(res => {
      let filtered = res;

      // Apply client-side filters for difficulty and tech stack
      if (difficulty !== 'all') {
        // Mock difficulty matches on specific criteria if not in schema:
        // We'll simulate by matching keywords/price ranges for demo richness
        if (difficulty === 'beginner') {
          filtered = filtered.filter(p => p.price < 50);
        } else if (difficulty === 'intermediate') {
          filtered = filtered.filter(p => p.price >= 50 && p.price < 100);
        } else if (difficulty === 'advanced') {
          filtered = filtered.filter(p => p.price >= 100);
        }
      }

      if (selectedTech.length > 0) {
        filtered = filtered.filter(p => 
          selectedTech.every(tech => 
            p.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
          )
        );
      }

      setProjects(filtered);
      setLoading(false);
    });
  }, [searchQuery, selectedCategory, difficulty, priceMin, priceMax, selectedTech, sortBy]);

  const handleSearchSubmit = (term) => {
    setSearchQuery(term);
    const newParams = new URLSearchParams(searchParams);
    if (term) newParams.set('q', term);
    else newParams.delete('q');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug !== 'all') newParams.set('category', slug);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  const toggleTech = (tech) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDifficulty('all');
    setPriceMin('');
    setPriceMax('');
    setSelectedTech([]);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full">
      {/* Header Banner */}
      <div className="mb-10 text-left flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-white">
          Browse Project Blueprint Library
        </h1>
        <p className="text-sm text-neutral-muted dark:text-gray-300">
          Discover verified templates, automation configurations, and developer-built micro-products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 bg-white dark:bg-neutral-dark border border-neutral-outline p-6 rounded-2xl h-fit flex flex-col gap-6 shadow-sm">

          <div className="flex items-center justify-between border-b border-neutral-outline/10 pb-4">
            <h2 className="font-bold text-lg text-neutral-dark dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">filter_list</span> Filters
            </h2>
            <button 
              onClick={clearAllFilters}
              className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-white">Category</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-muted dark:text-gray-300 cursor-pointer">
                <input 
                  type="radio" 
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                  className="rounded border-neutral-outline text-primary focus:ring-primary h-4 w-4"
                />
                All Categories
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 text-xs font-semibold text-neutral-muted dark:text-gray-300 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === cat.slug}
                    onChange={() => handleCategoryChange(cat.slug)}
                    className="rounded border-neutral-outline text-primary focus:ring-primary h-4 w-4"
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Level Filter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-white">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all border ${
                    difficulty === level
                      ? 'bg-primary border-primary text-white'
                      : 'bg-neutral-outline/5 border-neutral-outline/20 text-neutral-muted dark:text-gray-300 hover:border-neutral-outline'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-white">Price Range (USD)</h3>
            <div className="flex gap-2 items-center">
              <input 
                type="number" 
                placeholder="Min" 
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full bg-neutral-outline/5 border border-neutral-outline/25 rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="text-neutral-outline text-xs">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full bg-neutral-outline/5 border border-neutral-outline/25 rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Tech Stack Filter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map(tech => {
                const isSelected = selectedTech.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-secondary/10 border-secondary text-secondary font-bold'
                        : 'bg-transparent border-neutral-outline/20 text-neutral-muted dark:text-gray-300 hover:border-neutral-outline'
                    }`}
                  >
                    {tech}
                    {isSelected && <span className="material-symbols-outlined text-xs">close</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          {/* Top Search bar & Sort controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:max-w-md">
              <SearchBar 
                onSearch={handleSearchSubmit} 
                initialValue={searchQuery}
                placeholder="Search catalog blueprints..." 
              />
            </div>
            
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <label className="text-xs font-bold text-neutral-muted dark:text-gray-300">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="trending">Rating & Popularity</option>
              </select>
            </div>
          </div>

          {/* Listing Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/25 p-4 flex flex-col gap-4 animate-pulse h-80">
                  <div className="w-full h-40 bg-neutral-outline/20 rounded-lg" />
                  <div className="h-4 bg-neutral-outline/20 rounded w-3/4" />
                  <div className="h-3 bg-neutral-outline/20 rounded w-5/6" />
                  <div className="h-8 bg-neutral-outline/20 rounded w-full mt-auto" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-neutral-dark rounded-2xl border border-neutral-outline/20 flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-neutral-outline">search_off</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-neutral-dark dark:text-white">No Blueprints Found</h3>
                <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
                  Try clearing some filters, selecting a different category, or adjusting your search term query.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={clearAllFilters} className="mt-2">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
