import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function MobileNavbar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm z-40 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-dark z-50 shadow-2xl p-6 flex flex-col justify-between md:hidden"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-6">
              {/* Close Button Row */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-dark dark:text-white">Menu</span>
                <button 
                  onClick={onClose} 
                  className="p-1 text-neutral-muted hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4" aria-label="Mobile Menu Navigation">
                <NavLink 
                  to="/" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/browse" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  Browse Projects
                </NavLink>
                <NavLink 
                  to="/sell" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  Sell Your Project
                </NavLink>
                <NavLink 
                  to="/custom-request" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  Custom Project
                </NavLink>
                <NavLink 
                  to="/about" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  About
                </NavLink>
                <NavLink 
                  to="/how-it-works" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  How It Works
                </NavLink>
                <NavLink 
                  to="/faq" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  FAQ
                </NavLink>
                <NavLink 
                  to="/contact" 
                  onClick={onClose}
                  className={({ isActive }) => `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`}
                >
                  Contact
                </NavLink>
              </nav>

            </div>

            {/* Bottom Section Auth */}
            <div className="border-t border-neutral-outline/20 pt-4 flex flex-col gap-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-neutral-dark dark:text-gray-200">
                    Logged in as: <span className="text-primary">{user.name}</span>
                  </span>
                  <button 
                    onClick={() => { logout(); onClose(); }}
                    className="w-full py-2 border border-red-500 text-red-500 rounded font-semibold hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login-mock" 
                  onClick={onClose}
                  className="w-full text-center py-2 bg-primary text-white font-semibold rounded hover:bg-primary-container"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
