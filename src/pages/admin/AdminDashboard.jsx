import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Projects', value: '48', icon: 'folder_open', color: 'bg-blue-500' },
  { label: 'Total Users', value: '1,204', icon: 'group', color: 'bg-green-500' },
  { label: 'Total Sellers', value: '87', icon: 'storefront', color: 'bg-purple-500' },
  { label: 'Total Sales', value: '$24,380', icon: 'payments', color: 'bg-orange-500' },
  { label: 'Pending Approvals', value: '6', icon: 'pending_actions', color: 'bg-red-500' },
  { label: 'Custom Requests', value: '13', icon: 'build', color: 'bg-teal-500' },
];

const pendingProjects = [
  { id: 1, title: 'React CRM Dashboard', seller: 'dev_marco', price: '$79', submitted: '2 hours ago' },
  { id: 2, title: 'Flutter Delivery App', seller: 'flutter_king', price: '$129', submitted: '5 hours ago' },
  { id: 3, title: 'Next.js Blog Starter', seller: 'webcraft_io', price: '$39', submitted: '1 day ago' },
];

const recentRequests = [
  { id: 1, title: 'Custom E-Commerce with AR', user: 'sarah_j', budget: '$500', status: 'Open' },
  { id: 2, title: 'AI Chatbot Integration', user: 'marcus_t', budget: '$300', status: 'In Progress' },
  { id: 3, title: 'Mobile Banking UI Kit', user: 'elena_r', budget: '$750', status: 'Open' },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Dashboard</h1>
        <p className="text-xs text-neutral-muted mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-4 flex items-center gap-4">
            <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-white text-xl">{s.icon}</span>
            </div>
            <div>
              <p className="text-xs text-neutral-muted">{s.label}</p>
              <p className="text-lg font-extrabold text-neutral-dark dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pending Project Approvals */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-neutral-dark dark:text-white">Pending Approvals</h2>
            <Link to="/admin/projects" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="flex flex-col gap-3">
            {pendingProjects.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-neutral-outline/10 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-neutral-dark dark:text-white">{p.title}</p>
                  <p className="text-xs text-neutral-muted">by {p.seller} · {p.submitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-dark dark:text-white">{p.price}</span>
                  <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold hover:bg-green-200 transition">
                    Approve
                  </button>
                  <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg font-semibold hover:bg-red-200 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Custom Requests */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-neutral-dark dark:text-white">Recent Custom Requests</h2>
            <Link to="/admin/custom-requests" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentRequests.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-neutral-outline/10 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-neutral-dark dark:text-white">{r.title}</p>
                  <p className="text-xs text-neutral-muted">by {r.user} · Budget: {r.budget}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                  r.status === 'Open'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}