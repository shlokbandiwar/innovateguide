import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/admin/projects', label: 'Projects', icon: 'folder_open' },
  { path: '/admin/users', label: 'Users', icon: 'group' },
  { path: '/admin/custom-requests', label: 'Custom Requests', icon: 'build' },
  { path: '/admin/analytics', label: 'Analytics', icon: 'bar_chart' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#F1F5F9] dark:bg-[#0F172A] transition-colors duration-300">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar — always primary-container, looks good in both modes */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-primary-container text-white z-30
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
          <span className="font-extrabold text-lg tracking-tight">IG Admin</span>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white w-full transition-all"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-[#334155] px-4 py-3 flex items-center gap-4 sticky top-0 z-10 transition-colors duration-300">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-neutral-dark dark:text-[#F1F5F9]">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-bold text-neutral-dark dark:text-[#F1F5F9] text-sm">InnovateGuide Admin</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-neutral-muted dark:text-[#94A3B8]">admin@innovateguide.com</span>
            <span className="w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">A</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}