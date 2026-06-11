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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold hover:text-secondary transition-colors ${
      isActive
        ? 'text-secondary border-b-2 border-secondary pb-1'
        : 'text-neutral-dark dark:text-[#E2E8F0]'
    }`;

  return (
    <motion.header className={`sticky top-0 z-50 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#334155] transition-all duration-300 ${isScrolled ? 'h-14 shadow-md' : 'h-16 shadow-sm'}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="InnovateGuide Home">
  <img src="/src/assets/IG_LOGO.png" alt="InnovateGuide" className="h-8 w-auto block dark:hidden" />
  <img src="/src/assets/IG_whiteLOGO.png" alt="InnovateGuide" className="h-8 w-auto hidden dark:block" />
  <span className="font-bold text-lg tracking-tight text-neutral-dark dark:text-[#F1F5F9]">InnovateGuide</span>
</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/browse" className={linkClass}>Browse Projects</NavLink>
          <NavLink to="/sell" className={linkClass}>Sell Your Project</NavLink>
          <NavLink to="/custom-request" className={linkClass}>Custom Project</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/how-it-works" className={linkClass}>How It Works</NavLink>
          <NavLink to="/faq" className={linkClass}>FAQ</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#334155] text-neutral-muted dark:text-[#94A3B8] hover:text-primary transition-colors focus:outline-none"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-dark dark:text-[#F1F5F9]">{user.name}</span>
            </div>
          ) : (
            <Link
              to="/login-mock"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary border border-primary hover:bg-primary/5 dark:hover:bg-primary/20 rounded-lg transition-all"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={onToggleMobileMenu}
            className="p-2 md:hidden text-neutral-muted dark:text-[#94A3B8] hover:text-primary focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
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