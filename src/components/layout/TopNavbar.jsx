import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export default function TopNavbar({ onToggleMobileMenu, isMobileMenuOpen }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-outline/20 transition-all duration-300 ${isScrolled ? 'h-14 shadow-md' : 'h-16 shadow-sm'}`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:rounded" aria-label="InnovateGuide Home">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" className="fill-primary" />
            <polygon points="30,40 70,50 30,60" className="fill-secondary" />
          </svg>
          <span className="font-bold text-lg tracking-tight text-neutral-dark">InnovateGuide</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Desktop Main Navigation">
          <NavLink to="/" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            Home
          </NavLink>
          <NavLink to="/browse" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            Browse Projects
          </NavLink>
          <NavLink to="/sell" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            Sell Your Project
          </NavLink>
          <NavLink to="/custom-request" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            Custom Project
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            About
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            How It Works
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            FAQ
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `text-sm font-semibold hover:text-secondary transition-colors ${isActive ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-neutral-dark'}`}>
            Contact
          </NavLink>
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-surface-container-low text-neutral-muted hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* User Status / Login link */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-dark">
                {user.name}
              </span>
            </div>
          ) : (
            <Link 
              to="/login-mock" 
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary border border-primary hover:bg-primary/5 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-primary"
            >
              Sign In
            </Link>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            onClick={onToggleMobileMenu}
            className="p-2 md:hidden text-neutral-muted hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>
    </motion.header>

  );
}
