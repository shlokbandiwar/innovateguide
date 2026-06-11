import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] dark:bg-[#1E293B] text-neutral-muted dark:text-[#94A3B8] py-12 border-t border-gray-200 dark:border-[#334155] transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        {/* Column 1: About */}
        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2" aria-label="InnovateGuide Home">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" className="fill-primary" />
              <polygon points="30,40 70,50 30,60" className="fill-secondary" />
            </svg>
            <span className="font-bold text-lg text-neutral-dark dark:text-[#F1F5F9]">InnovateGuide</span>
          </Link>
          <p className="text-sm text-neutral-muted dark:text-[#94A3B8] max-w-sm">
            InnovateGuide is the leading trusted hub for vetted, pre-built software templates and custom development. Bootstrap your business with clean engineering source codes.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-neutral-dark dark:text-[#E2E8F0] text-sm tracking-wider uppercase">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/about" className="text-primary hover:text-secondary transition-colors">About Us</Link></li>
            <li><Link to="/how-it-works" className="text-primary hover:text-secondary transition-colors">How It Works</Link></li>
            <li><Link to="/faq" className="text-primary hover:text-secondary transition-colors">FAQ</Link></li>
            <li><Link to="/sell" className="text-primary hover:text-secondary transition-colors">Sell Your Project</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-neutral-dark dark:text-[#E2E8F0] text-sm tracking-wider uppercase">Categories</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/browse?category=mobile-apps" className="text-primary hover:text-secondary transition-colors">Mobile Apps</Link></li>
            <li><Link to="/browse?category=e-commerce" className="text-primary hover:text-secondary transition-colors">E-Commerce</Link></li>
            <li><Link to="/browse?category=admin-dashboards" className="text-primary hover:text-secondary transition-colors">Dashboards</Link></li>
            <li><Link to="/browse?category=ai-ml" className="text-primary hover:text-secondary transition-colors">AI & Machine Learning</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Socials */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-neutral-dark dark:text-[#E2E8F0] text-sm tracking-wider uppercase">Contact</h3>
            <ul className="flex flex-col gap-1 text-sm text-neutral-muted dark:text-[#94A3B8]">
              <li>support@innovateguide.com</li>
              <li>+1 (800) 555-0199</li>
              <li><Link to="/contact" className="text-primary hover:text-secondary underline transition-colors">Open Support Ticket</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-neutral-dark dark:text-[#E2E8F0] text-sm tracking-wider uppercase">Social Media</h3>
            <div className="flex items-center gap-3 text-primary">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                <span className="material-symbols-outlined text-lg">code</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                <span className="material-symbols-outlined text-lg">contacts</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-10 pt-6 border-t border-gray-200 dark:border-[#334155] flex items-center justify-between text-xs text-neutral-muted dark:text-[#64748B]">
        <span>&copy; {new Date().getFullYear()} InnovateGuide Marketplace. All rights reserved.</span>
        <Link to="/admin/login" className="text-neutral-muted/40 dark:text-[#475569] hover:text-neutral-muted dark:hover:text-[#94A3B8] transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  );
}