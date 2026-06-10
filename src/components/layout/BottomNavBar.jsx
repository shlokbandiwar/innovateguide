import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNavBar() {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-neutral-dark border-t border-neutral-outline/20 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] flex items-center justify-around z-40 md:hidden transition-colors"
      aria-label="Mobile Navigation Bar"
    >
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-semibold ${isActive ? 'text-primary' : 'text-neutral-muted'}`}
      >
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </NavLink>

      <NavLink 
        to="/browse" 
        className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-semibold ${isActive ? 'text-primary' : 'text-neutral-muted'}`}
      >
        <span className="material-symbols-outlined">search</span>
        <span>Browse</span>
      </NavLink>

      <NavLink 
        to="/custom-request" 
        className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-semibold ${isActive ? 'text-primary' : 'text-neutral-muted'}`}
      >
        <span className="material-symbols-outlined">rate_review</span>
        <span>Request</span>
      </NavLink>

      <NavLink 
        to="/sell" 
        className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-semibold ${isActive ? 'text-primary' : 'text-neutral-muted'}`}
      >
        <span className="material-symbols-outlined">sell</span>
        <span>Sell</span>
      </NavLink>

      <NavLink 
        to="/faq" 
        className={({ isActive }) => `flex flex-col items-center gap-1 text-xs font-semibold ${isActive ? 'text-primary' : 'text-neutral-muted'}`}
      >
        <span className="material-symbols-outlined">help</span>
        <span>FAQ</span>
      </NavLink>
    </nav>
  );
}
