import React from 'react';
import { designSystem } from '../../styles/designSystem/constants';

export default function TestimonialCard({ testimonial }) {
  const { name, role, quote, company, avatarUrl, rating } = testimonial;

  return (
    <article className={`p-6 bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/25 flex flex-col justify-between ${designSystem.shadows.md} hover:${designSystem.shadows.lg} hover:-translate-y-1 transition-all duration-300`}>

      <div>
        {/* Five Star rating */}
        <div className="flex items-center gap-0.5 text-amber-500 mb-4" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-sm fill-amber-500">star</span>
          ))}
        </div>
        {/* Quote */}
        <blockquote className="text-sm text-neutral-muted dark:text-gray-300 italic leading-relaxed mb-6">
          "{quote}"
        </blockquote>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3">
        <img 
          src={avatarUrl} 
          alt={`Profile portrait for ${name}`}
          className="w-10 h-10 rounded-full object-cover bg-neutral-outline/20"
          loading="lazy"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-neutral-dark dark:text-white leading-none">
            {name}
          </span>
          <span className="text-xs text-neutral-muted dark:text-gray-400">
            {role}, {company}
          </span>
        </div>
      </div>
    </article>
  );
}
