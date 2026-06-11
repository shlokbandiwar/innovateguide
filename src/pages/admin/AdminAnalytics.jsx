import React from 'react';

const monthlyRevenue = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2400 },
  { month: 'Apr', revenue: 2100 },
  { month: 'May', revenue: 3200 },
  { month: 'Jun', revenue: 2800 },
];

const topProjects = [
  { title: 'Fully Featured E-Commerce', sales: 48, revenue: '$4,752' },
  { title: 'AI Chatbot Integration', sales: 35, revenue: '$4,515' },
  { title: 'Kubernetes CI/CD Setup', sales: 29, revenue: '$4,321' },
  { title: 'Flutter Delivery App', sales: 31, revenue: '$3,999' },
  { title: 'SaaS Analytics Dashboard', sales: 40, revenue: '$1,960' },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

export default function AdminAnalytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Analytics</h1>
        <p className="text-xs text-neutral-muted mt-1">Revenue trends and top performing projects.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$24,380', icon: 'payments', color: 'bg-green-500' },
          { label: 'This Month', value: '$2,800', icon: 'trending_up', color: 'bg-blue-500' },
          { label: 'Total Orders', value: '183', icon: 'shopping_cart', color: 'bg-purple-500' },
          { label: 'Avg Order Value', value: '$133', icon: 'insights', color: 'bg-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-4 flex items-center gap-3">
            <div className={`${s.color} w-9 h-9 rounded-lg flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-white text-lg">{s.icon}</span>
            </div>
            <div>
              <p className="text-xs text-neutral-muted">{s.label}</p>
              <p className="text-base font-extrabold text-neutral-dark dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-5 flex flex-col gap-4">
          <h2 className="font-bold text-sm text-neutral-dark dark:text-white">Monthly Revenue</h2>
          <div className="flex items-end gap-3 h-40">
            {monthlyRevenue.map(m => (
              <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs text-neutral-muted">${(m.revenue/1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-primary rounded-t-md transition-all"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-neutral-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top projects */}
        <div className="bg-white dark:bg-neutral-dark rounded-xl border border-neutral-outline/20 p-5 flex flex-col gap-4">
          <h2 className="font-bold text-sm text-neutral-dark dark:text-white">Top Selling Projects</h2>
          <div className="flex flex-col gap-3">
            {topProjects.map((p, i) => (
              <div key={p.title} className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-muted w-4">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-neutral-dark dark:text-white">{p.title}</p>
                  <p className="text-xs text-neutral-muted">{p.sales} sales</p>
                </div>
                <span className="text-xs font-bold text-green-600">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}