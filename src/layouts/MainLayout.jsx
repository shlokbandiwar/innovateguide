import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNavbar from '../components/layout/TopNavbar';
import MobileNavbar from '../components/layout/MobileNavbar';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const handleToggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <TopNavbar onToggleMobileMenu={handleToggleMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <MobileNavbar isOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}