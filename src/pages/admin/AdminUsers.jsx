import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah@devflow.com', role: 'Seller', joined: 'Jan 12, 2025', status: 'Active' },
  { id: 2, name: 'Marcus Aurelius', email: 'marcus@coliseum.ai', role: 'Buyer', joined: 'Feb 3, 2025', status: 'Active' },
  { id: 3, name: 'Elena Rostova', email: 'elena@fitsync.com', role: 'Seller', joined: 'Mar 18, 2025', status: 'Banned' },
  { id: 4, name: 'James Okafor', email: 'james@webcraft.io', role: 'Seller', joined: 'Apr 5, 2025', status: 'Active' },
  { id: 5, name: 'Priya Sharma', email: 'priya@aidevs.com', role: 'Buyer', joined: 'May 1, 2025', status: 'Active' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);

  const toggleBan = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' } : u
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Manage Users</h1>
        <p className="text-xs text-neutral-muted mt-1">View, ban, or unban platform users.</p>
      </div>

      <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-outline/10 text-xs text-neutral-muted">
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Email</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">Joined</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-neutral-outline/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <td className="px-5 py-3 font-semibold text-neutral-dark dark:text-white">{u.name}</td>
                <td className="px-5 py-3 text-neutral-muted">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${u.role === 'Seller' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-muted">{u.joined}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleBan(u.id)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${
                      u.status === 'Banned'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {u.status === 'Banned' ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}