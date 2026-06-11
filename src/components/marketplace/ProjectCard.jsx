import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designSystem } from '../../styles/designSystem/constants';

export default function ProjectCard({ project }) {
  const {
    id,
    title,
    description,
    category,
    techStack = [],
    difficulty = "Intermediate",
    price,
    rating,
    imageUrl
  } = project;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={designSystem.animations.transitions.smooth}
      className="bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#263244] rounded-2xl border border-gray-200 dark:border-[#334155] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div>
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-[#0F172A]">
          <img
            src={imageUrl}
            alt={`Screenshot thumbnail layout for ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 bg-primary/80 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
            {difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-wide">
            {category.replace('-', ' ')}
          </span>
          <h3 className="font-bold text-base text-neutral-dark dark:text-[#E2E8F0] line-clamp-1 leading-snug">
            {title}
          </h3>
          <p className="text-xs text-neutral-muted dark:text-[#94A3B8] line-clamp-2 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {techStack.map((tag, idx) => (
              <span
                key={idx}
                className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-[#334155] flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <span className="material-symbols-outlined text-sm">star</span>
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-lg font-bold text-neutral-dark dark:text-[#F1F5F9]">
            ${price}
          </span>
        </div>
        <Link
          to={`/project/${id}`}
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}