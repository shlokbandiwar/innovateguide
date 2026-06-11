import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@innovateguide.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin@innovateguide.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-primary-container flex items-center justify-center px-4">
      <div className="bg-white dark:bg-neutral-dark rounded-2xl p-8 w-full max-w-sm flex flex-col gap-6 shadow-xl">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-extrabold text-neutral-dark dark:text-white">Admin Login</h1>
          <p className="text-xs text-neutral-muted">InnovateGuide Admin Panel</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-neutral-outline/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-neutral-outline/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-primary text-white rounded-lg py-2.5 text-sm font-bold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          <Link to="/" className="text-xs text-neutral-muted/50 hover:text-neutral-muted transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}