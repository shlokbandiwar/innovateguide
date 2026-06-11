import React, { useState } from 'react';

const mockProjects = [
  { id: 1, title: 'React CRM Dashboard', seller: 'dev_marco', category: 'Admin Dashboards', price: '$79', status: 'Pending' },
  { id: 2, title: 'Flutter Delivery App', seller: 'flutter_king', category: 'Mobile Apps', price: '$129', status: 'Pending' },
  { id: 3, title: 'Next.js Blog Starter', seller: 'webcraft_io', category: 'Websites', price: '$39', status: 'Pending' },
  { id: 4, title: 'Fully Featured E-Commerce', seller: 'shopmaster', category: 'E-Commerce', price: '$99', status: 'Approved' },
  { id: 5, title: 'AI Chatbot Integration', seller: 'ai_devs', category: 'AI & ML', price: '$129', status: 'Approved' },
  { id: 6, title: 'Kubernetes CI/CD Setup', seller: 'devops_pro', category: 'Cloud DevOps', price: '$149', status: 'Rejected' },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState(mockProjects);
  const [filter, setFilter] = useState('All');

  const updateStatus = (id, newStatus) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const filtered = filter === 'All' ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Manage Projects</h1>
        <p className="text-xs text-neutral-muted mt-1">Approve, reject, or remove project listings.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
              filter === f
                ? 'bg-primary text-white border-primary'
                : 'bg-white dark:bg-neutral-dark border-neutral-outline/20 text-neutral-muted hover:border-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-outline/10 text-xs text-neutral-muted">
              <th className="text-left px-5 py-3 font-semibold">Project</th>
              <th className="text-left px-5 py-3 font-semibold">Seller</th>
              <th className="text-left px-5 py-3 font-semibold">Category</th>
              <th className="text-left px-5 py-3 font-semibold">Price</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-neutral-outline/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <td className="px-5 py-3 font-semibold text-neutral-dark dark:text-white">{p.title}</td>
                <td className="px-5 py-3 text-neutral-muted">{p.seller}</td>
                <td className="px-5 py-3 text-neutral-muted">{p.category}</td>
                <td className="px-5 py-3 font-bold text-neutral-dark dark:text-white">{p.price}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    {p.status !== 'Approved' && (
                      <button onClick={() => updateStatus(p.id, 'Approved')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold hover:bg-green-200 transition">Approve</button>
                    )}
                    {p.status !== 'Rejected' && (
                      <button onClick={() => updateStatus(p.id, 'Rejected')} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg font-semibold hover:bg-yellow-200 transition">Reject</button>
                    )}
                    <button onClick={() => deleteProject(p.id)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg font-semibold hover:bg-red-200 transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}