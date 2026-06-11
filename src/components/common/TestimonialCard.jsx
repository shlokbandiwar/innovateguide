import React from 'react';
import { designSystem } from '../../styles/designSystem/constants';

export default function TestimonialCard({ testimonial }) {
  const { name, role, quote, company, avatarUrl, rating } = testimonial;

  return (
    <article className={`p-6 bg-white dark:bg-[#1E293B] rounded-xl border border-gray-200 dark:border-[#334155] flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
      <div>
        <div className="flex items-center gap-0.5 text-amber-500 mb-4" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-sm">star</span>
          ))}
        </div>
        <blockquote className="text-sm text-neutral-muted dark:text-[#94A3B8] italic leading-relaxed mb-6">
          "{quote}"
        </blockquote>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={`Profile portrait for ${name}`}
          className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-[#334155]"
          loading="lazy"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-neutral-dark dark:text-[#E2E8F0] leading-none">
            {name}
          </span>
          <span className="text-xs text-neutral-muted dark:text-[#64748B]">
            {role}, {company}
          </span>
        </div>
      </div>
    </article>
  );
}