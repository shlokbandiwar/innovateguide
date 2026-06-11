import React from 'react';

export default function SliderDots({ count, activeIndex }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3 md:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex
              ? 'w-4 h-1.5 bg-primary'
              : 'w-1.5 h-1.5 bg-gray-300 dark:bg-[#334155]'
          }`}
        />
      ))}
    </div>
  );
}