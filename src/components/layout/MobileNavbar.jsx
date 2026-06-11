import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileNavbar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-dark z-50 shadow-2xl p-6 flex flex-col justify-between md:hidden"
        role="dialog"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex flex-col gap-6">
          {/* Close Button */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-dark dark:text-white">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-neutral-muted hover:text-primary focus:outline-none rounded"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/browse', label: 'Browse Projects' },
              { to: '/sell', label: 'Sell Your Project' },
              { to: '/custom-request', label: 'Custom Project' },
              { to: '/about', label: 'About' },
              { to: '/how-it-works', label: 'How It Works' },
              { to: '/faq', label: 'FAQ' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `text-base font-semibold transition-colors py-1 ${isActive ? 'text-secondary' : 'text-neutral-dark'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Auth */}
        <div className="border-t border-neutral-outline/20 pt-4 flex flex-col gap-3">
          {user ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-dark dark:text-gray-200">
                Logged in as: <span className="text-primary">{user.name}</span>
              </span>
              <button
                type="button"
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
      </div>
    </>
  );
}