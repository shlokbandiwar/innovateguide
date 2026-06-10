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
    difficulty = "Intermediate", // Default fallback difficulty
    price,
    rating,
    imageUrl
  } = project;

  return (
    <motion.article 
      whileHover={{ y: -4 }}
      transition={designSystem.animations.transitions.smooth}
      className={`bg-[#0B2740] hover:bg-[#0E3150] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between ${designSystem.shadows.md} hover:${designSystem.shadows.lg} h-full transition-all duration-300`}
    >
      <div>
        {/* Card Thumbnail Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-outline/10">
          <img 
            src={imageUrl} 
            alt={`Screenshot thumbnail layout for ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Difficulty Badge overlay */}
          <span className="absolute top-3 right-3 bg-primary/80 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
            {difficulty}
          </span>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col gap-2">
          {/* Category Label */}
          <span className="text-xs font-bold text-secondary uppercase tracking-wide">
            {category.replace('-', ' ')}
          </span>
          {/* Title */}
          <h3 className="font-bold text-base text-white line-clamp-1 leading-snug">
            {title}
          </h3>
          {/* Description */}
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Required technical stack">
            {techStack.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-primary/20 text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Meta Info */}
      <div className="px-4 pb-4 pt-2 border-t border-white/10 flex items-center justify-between mt-auto">
        {/* Rating and Price */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500" aria-label={`Rating: ${rating} out of 5 stars`}>
            <span className="material-symbols-outlined text-sm fill-amber-500">star</span>
            <span>{rating.toFixed(1)}</span>
          </div>
          <span className="text-lg font-bold text-white">
            ${price}
          </span>
        </div>

        {/* Action Button */}
        <Link 
          to={`/project/${id}`} 
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={`View full details of ${title}`}
        >
          View Details
        </Link>
      </div>
    </motion.article>

  );
}
