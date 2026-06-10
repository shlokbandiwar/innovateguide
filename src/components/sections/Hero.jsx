import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../common/SearchBar';
import { designSystem } from '../../styles/designSystem/constants';

export default function Hero() {
  const navigate = useNavigate();

  const handleSearch = (term) => {
    if (term) {
      navigate(`/browse?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary-container py-16 md:py-24 border-b border-neutral-outline/10 bg-grid-dots-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-center text-center">
        
        {/* Entrance animations using Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={designSystem.animations.transitions.slow}
          className="max-w-3xl flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider self-center">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            Verified IT Project Templates & Bespoke Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Bootstrap Your Next SaaS with Vetted Source Code
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Skip building database layers, auth hooks, and styling structures from scratch. Download production-ready templates built by top engineers.
          </p>
        </motion.div>

        {/* Central Searchbar container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...designSystem.animations.transitions.default, delay: 0.2 }}
          className="w-full max-w-xl mt-8"
        >
          <SearchBar onSearch={handleSearch} />
          {/* Quick tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-gray-300">
            <span>Popular:</span>
            <button onClick={() => navigate('/browse?q=Next.js')} className="text-white hover:underline">Next.js</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/browse?q=Flutter')} className="text-white hover:underline">Flutter</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/browse?q=AI')} className="text-white hover:underline">OpenAI</button>
            <span>&bull;</span>
            <button onClick={() => navigate('/browse?q=Stripe')} className="text-white hover:underline">Stripe</button>
          </div>
        </motion.div>

      </div>
    </section>
  );

}
