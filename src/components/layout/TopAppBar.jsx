import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function TopAppBar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-dark/95 backdrop-blur-md border-b border-neutral-outline/20 shadow-sm transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:rounded" aria-label="InnovateGuide Home">
  <img src="/src/assets/IG_LOGO.png" alt="InnovateGuide" className="h-8 w-auto block dark:hidden" />
  <img src="/src/assets/IG_whiteLOGO.png" alt="InnovateGuide" className="h-8 w-auto hidden dark:block" />
  <span className="font-bold text-lg tracking-tight text-neutral-dark dark:text-white">InnovateGuide</span>
</Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Desktop Main Navigation">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            Home
          </NavLink>
          <NavLink to="/browse" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            Browse
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            How It Works
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            About
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            FAQ
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-neutral-muted dark:text-gray-300'}`}>
            Contact
          </NavLink>
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-neutral-dark/10 text-neutral-muted dark:text-gray-300"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Sell Button (Desktop) */}
          <Link 
            to="/sell" 
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-lg shadow-sm hover:shadow transition-all"
          >
            Sell Project
          </Link>

          {/* Custom Request CTA (Desktop) */}
          <Link 
            to="/custom-request" 
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary border border-primary hover:bg-primary/5 rounded-lg transition-all"
          >
            Custom Request
          </Link>

          {/* Mock Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-dark dark:text-gray-200 hidden lg:inline">
                {user.name}
              </span>
              <button 
                onClick={logout} 
                className="text-xs px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login-mock" 
              className="text-sm font-semibold text-primary hover:text-primary-container"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
