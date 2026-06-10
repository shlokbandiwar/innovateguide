import React from 'react';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className={`flex items-center justify-center py-6 ${className}`} role="status" aria-label="Loading content">
      <div className={`${sizeClasses[size] || sizeClasses.md} border-primary/20 border-t-primary rounded-full animate-spin`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
