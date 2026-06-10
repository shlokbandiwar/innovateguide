import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-4 text-neutral-dark">Page Not Found</h2>
      <p className="mt-2 text-neutral-muted max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow hover:bg-secondary/90 transition-all"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
