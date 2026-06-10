import React from 'react';

export default function StatsSection() {
  const stats = [
    { value: "12,400+", label: "Successful Deployments", icon: "deployed_code" },
    { value: "450+", label: "Vetted Templates", icon: "source" },
    { value: "99.8%", label: "Platform Uptime", icon: "check_circle" },
    { value: "4.9/5", label: "Average Developer Rating", icon: "star" }
  ];

  return (
    <section className="bg-primary-container text-white py-12">

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-2">
            <span className="material-symbols-outlined text-3xl text-secondary" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-3xl font-extrabold tracking-tight">
              {item.value}
            </span>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
