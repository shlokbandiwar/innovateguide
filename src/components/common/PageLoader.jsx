import React from 'react';

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface" role="alert" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary/25 border-t-primary rounded-full animate-spin"></div>
        <span className="text-sm font-medium text-neutral-dark">Loading InnovateGuide...</span>
      </div>
    </div>
  );
}
