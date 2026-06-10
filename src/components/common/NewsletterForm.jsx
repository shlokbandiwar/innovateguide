import React, { useState } from 'react';
import { validateEmail } from '../../utils/validation';
import Button from './Button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email address');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setEmail('');
  };

  return (
    <div className="bg-surface-container-low dark:bg-neutral-dark/80 p-8 rounded-2xl border border-neutral-outline/25 max-w-xl mx-auto text-center flex flex-col gap-4">
      {success ? (
        <div className="flex flex-col items-center gap-2 py-4">
          <span className="material-symbols-outlined text-4xl text-green-500">mail</span>
          <h3 className="font-bold text-neutral-dark dark:text-white text-lg">You are on the list!</h3>
          <p className="text-xs text-neutral-muted dark:text-gray-300">
            We've sent a verification link to your inbox. Check back for custom template releases.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-neutral-dark dark:text-white">
            Get Release Notifications
          </h3>
          <p className="text-xs md:text-sm text-neutral-muted dark:text-gray-300">
            Subscribe to receive alerts when vetting engineers upload new templates or core updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="flex-grow text-left">
              <input 
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="developer@example.com"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/35 focus:ring-primary'}`}
                aria-label="Newsletter Subscription Email"
              />
              {error && <p className="text-[10px] text-red-500 mt-1 font-semibold">{error}</p>}
            </div>
            <Button type="submit" isLoading={loading} className="shrink-0">
              Subscribe
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
