import React, { useState } from 'react';

export default function SearchBar({ 
  placeholder = "Search projects, technologies, or keywords...", 
  onSearch, 
  initialValue = "",
  className = "" 
}) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center bg-white dark:bg-neutral-dark border border-neutral-outlineVariant rounded-xl focus-within:border-primary shadow-sm hover:shadow transition-all duration-300 ${className}`}


      role="search"
    >
      <span className="material-symbols-outlined text-neutral-muted pl-4 pointer-events-none" aria-hidden="true">
        search
      </span>
      <input 
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-3 pr-24 py-3 bg-transparent text-sm text-neutral-dark dark:text-white placeholder-neutral-muted focus:ring-0 focus:border-transparent"
        aria-label="Search Marketplace Projects"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        Search
      </button>
    </form>
  );
}
