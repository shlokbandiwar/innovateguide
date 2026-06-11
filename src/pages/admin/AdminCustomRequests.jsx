import React, { useState } from 'react';

const mockRequests = [
  { id: 1, title: 'Custom E-Commerce with AR', user: 'sarah_j', budget: '$500', submitted: 'Jun 1, 2025', status: 'Open' },
  { id: 2, title: 'AI Chatbot Integration', user: 'marcus_t', budget: '$300', submitted: 'Jun 3, 2025', status: 'In Progress' },
  { id: 3, title: 'Mobile Banking UI Kit', user: 'elena_r', budget: '$750', submitted: 'Jun 5, 2025', status: 'Open' },
  { id: 4, title: 'Real-time Chat App', user: 'james_o', budget: '$400', submitted: 'Jun 7, 2025', status: 'Completed' },
  { id: 5, title: 'NFT Marketplace Clone', user: 'priya_s', budget: '$600', submitted: 'Jun 9, 2025', status: 'Open' },
];

const statusColors = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function AdminCustomRequests() {
  const [requests, setRequests] = useState(mockRequests);

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Custom Requests</h1>
        <p className="text-xs text-neutral-muted mt-1">Manage and update status of custom build requests.</p>
      </div>

      <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-outline/10 text-xs text-neutral-muted">
              <th className="text-left px-5 py-3 font-semibold">Title</th>
              <th className="text-left px-5 py-3 font-semibold">User</th>
              <th className="text-left px-5 py-3 font-semibold">Budget</th>
              <th className="text-left px-5 py-3 font-semibold">Submitted</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Update</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-b border-neutral-outline/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <td className="px-5 py-3 font-semibold text-neutral-dark dark:text-white">{r.title}</td>
                <td className="px-5 py-3 text-neutral-muted">{r.user}</td>
                <td className="px-5 py-3 font-bold text-neutral-dark dark:text-white">{r.budget}</td>
                <td className="px-5 py-3 text-neutral-muted">{r.submitted}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={r.status}
                    onChange={e => updateStatus(r.id, e.target.value)}
                    className="text-xs border border-neutral-outline/20 rounded-lg px-2 py-1 bg-white dark:bg-neutral-dark text-neutral-dark dark:text-white focus:outline-none focus:border-primary"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}