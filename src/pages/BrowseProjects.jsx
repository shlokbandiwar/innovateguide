import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsService } from '../services/projectsService';
import { categoriesService } from '../services/categoriesService';
import ProjectCard from '../components/marketplace/ProjectCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import { useScrollSlider } from '../hooks/useScrollSlider';
import SliderDots from '../components/common/SliderDots';

export default function BrowseProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [difficulty, setDifficulty] = useState('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const TECH_OPTIONS = ['React', 'Next.js', 'Python', 'Flutter', 'TypeScript', 'Docker', 'Firebase', 'Tailwind CSS'];

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  useEffect(() => {
    categoriesService.getCategories().then(res => setCategories(res));
  }, []);

  useEffect(() => {
    setLoading(true);
    projectsService.getProjects({
      q: searchQuery,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      budgetMin: priceMin,
      budgetMax: priceMax,
      sort: sortBy
    }).then(res => {
      let filtered = res;
      if (difficulty !== 'all') {
        if (difficulty === 'beginner') filtered = filtered.filter(p => p.price < 50);
        else if (difficulty === 'intermediate') filtered = filtered.filter(p => p.price >= 50 && p.price < 100);
        else if (difficulty === 'advanced') filtered = filtered.filter(p => p.price >= 100);
      }
      if (selectedTech.length > 0) {
        filtered = filtered.filter(p =>
          selectedTech.every(tech => p.techStack.some(t => t.toLowerCase() === tech.toLowerCase()))
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
    setSelectedTech(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
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
   const browse = useScrollSlider(projects.length);
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-[#F1F5F9]">
          Browse Project Blueprint Library
        </h1>
        <p className="text-sm text-neutral-muted dark:text-[#94A3B8]">
          Discover verified templates, automation configurations, and developer-built micro-products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] p-6 rounded-2xl h-fit flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#334155] pb-4">
            <h2 className="font-bold text-lg text-neutral-dark dark:text-[#F1F5F9] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">filter_list</span> Filters
            </h2>
            <button onClick={clearAllFilters} className="text-xs font-semibold text-secondary hover:underline cursor-pointer">
              Clear All
            </button>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-[#E2E8F0]">Category</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-muted dark:text-[#94A3B8] cursor-pointer">
                <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => handleCategoryChange('all')}
                  className="rounded border-gray-300 dark:border-[#334155] text-primary focus:ring-primary h-4 w-4" />
                All Categories
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 text-xs font-semibold text-neutral-muted dark:text-[#94A3B8] cursor-pointer">
                  <input type="radio" name="category" checked={selectedCategory === cat.slug} onChange={() => handleCategoryChange(cat.slug)}
                    className="rounded border-gray-300 dark:border-[#334155] text-primary focus:ring-primary h-4 w-4" />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-[#E2E8F0]">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
                <button key={level} onClick={() => setDifficulty(level)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all border ${
                    difficulty === level
                      ? 'bg-primary border-primary text-white'
                      : 'bg-transparent border-gray-200 dark:border-[#334155] text-neutral-muted dark:text-[#94A3B8] hover:border-gray-400 dark:hover:border-[#475569]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-[#E2E8F0]">Price Range (USD)</h3>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-[#F1F5F9] focus:outline-none focus:border-primary" />
              <span className="text-neutral-muted dark:text-[#64748B] text-xs">-</span>
              <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-[#F1F5F9] focus:outline-none focus:border-primary" />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-neutral-dark dark:text-[#E2E8F0]">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map(tech => {
                const isSelected = selectedTech.includes(tech);
                return (
                  <button key={tech} onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-secondary/10 border-secondary text-secondary'
                        : 'bg-transparent border-gray-200 dark:border-[#334155] text-neutral-muted dark:text-[#94A3B8] hover:border-gray-400 dark:hover:border-[#475569]'
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

        {/* Main Content */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:max-w-md">
              <SearchBar onSearch={handleSearchSubmit} initialValue={searchQuery} placeholder="Search catalog blueprints..." />
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <label className="text-xs font-bold text-neutral-muted dark:text-[#94A3B8]">Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-xs text-neutral-dark dark:text-[#F1F5F9] focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest Listings</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="trending">Rating & Popularity</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-200 dark:border-[#334155] p-4 flex flex-col gap-4 animate-pulse h-80">
                  <div className="w-full h-40 bg-gray-200 dark:bg-[#334155] rounded-lg" />
                  <div className="h-4 bg-gray-200 dark:bg-[#334155] rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-[#334155] rounded w-5/6" />
                  <div className="h-8 bg-gray-200 dark:bg-[#334155] rounded w-full mt-auto" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-[#334155] flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-[#475569]">search_off</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-neutral-dark dark:text-[#F1F5F9]">No Blueprints Found</h3>
                <p className="text-xs text-neutral-muted dark:text-[#94A3B8] max-w-sm">
                  Try clearing some filters, selecting a different category, or adjusting your search term query.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={clearAllFilters} className="mt-2">Reset All Filters</Button>
            </div>
          ) : (
            <>
              <div ref={browse.scrollRef} onScroll={browse.onScroll} className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [&::-webkit-scrollbar]:hidden px-1">
  <AnimatePresence mode="popLayout">
    {projects.map(project => (
      <motion.div key={project.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="flex-none w-[85vw] snap-start">
        <ProjectCard project={project} />
      </motion.div>
    ))}
  </AnimatePresence>
</div>
<SliderDots count={projects.length} activeIndex={browse.activeIndex} />
              <motion.div layout className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {projects.map(project => (
                    <motion.div key={project.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}