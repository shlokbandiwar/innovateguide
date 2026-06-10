import React from 'react';
import { Link } from 'react-router-dom';
import { designSystem } from '../../styles/designSystem/constants';

export default function CategoryCard({ category }) {
  const { label, iconName, projectsCount, slug } = category;

  return (
    <Link 
      to={`/browse?category=${slug}`}
      className={`flex flex-col items-center justify-center p-6 bg-[#0B2740] hover:bg-[#0E3150] rounded-2xl border border-white/10 cursor-pointer text-center ${designSystem.shadows.md} hover:${designSystem.shadows.lg} hover:border-white/20 hover:-translate-y-1 transition-all duration-300`}
      aria-label={`Browse ${label} category - ${projectsCount} template packages available`}
    >
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-white mb-3">
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          {iconName}
        </span>
      </div>
      <h3 className="font-bold text-sm text-white mb-1">
        {label}
      </h3>
      <span className="text-xs text-gray-300">
        {projectsCount} Projects
      </span>
    </Link>
  );
}
