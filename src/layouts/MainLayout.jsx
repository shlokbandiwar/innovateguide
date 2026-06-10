import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import MobileNavbar from '../components/layout/MobileNavbar';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-neutral-dark/95 transition-colors duration-300">
      {/* Top Header Navigation */}
      <TopNavbar 
        onToggleMobileMenu={handleToggleMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />

      {/* Slide-in Mobile Drawer */}
      <MobileNavbar 
        isOpen={isMobileMenuOpen} 
        onClose={handleCloseMenu} 
      />

      {/* Main Content Area */}
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Global Footer (Desktop & Tablet) */}
      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  );
}
