import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) nextErrors.subject = 'Please choose or type a subject.';
    
    if (!formData.message.trim()) {
      nextErrors.message = 'Please type your message.';
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSuccessOpen(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setIsSuccessOpen(false);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full flex flex-col gap-10">
      
      {/* Page Header */}
      <div className="text-left flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-white">
          Contact Developer Support
        </h1>
        <p className="text-sm text-neutral-muted dark:text-gray-300">
          Have queries about technical listing issues, escrow payments, or bulk university licenses? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-neutral-dark dark:text-white">
          
          {/* Quick Address Card */}
          <div className="bg-primary-container text-white border border-white/10 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-extrabold text-sm border-b border-white/10 pb-2">Support Channels</h3>
            
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">mail</span>
                <div className="flex flex-col">
                  <span className="font-bold">General Support Email</span>
                  <a href="mailto:support@innovateguide.com" className="text-white hover:text-secondary hover:underline font-semibold mt-0.5">
                    support@innovateguide.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">shield_person</span>
                <div className="flex flex-col">
                  <span className="font-bold">Escrow & Account Safety</span>
                  <a href="mailto:escrow@innovateguide.com" className="text-white hover:text-secondary hover:underline font-semibold mt-0.5">
                    escrow@innovateguide.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">domain</span>
                <div className="flex flex-col">
                  <span className="font-bold">Headquarters Address</span>
                  <p className="text-gray-200 leading-relaxed mt-0.5">
                    InnovateGuide Labs LLC, Suite 400<br />
                    100 Pine Street, San Francisco, CA 94111
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-primary-container text-white border border-white/10 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-extrabold text-sm border-b border-white/10 pb-2">Developer Communities</h3>
            <div className="flex gap-3 text-xs">
              <a href="#" className="font-semibold text-white hover:text-secondary flex items-center gap-1">
                GitHub
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="font-semibold text-white hover:text-secondary flex items-center gap-1">
                Discord
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="font-semibold text-white hover:text-secondary flex items-center gap-1">
                LinkedIn
              </a>
            </div>
          </div>


        </div>

        {/* Right Side: Message Submission Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white dark:bg-neutral-dark border border-neutral-outline/25 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col gap-5 text-neutral-dark dark:text-white">
          <h2 className="font-extrabold text-lg border-b border-neutral-outline/10 pb-2">Send Message</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-muted">Your Name *</label>
              <input 
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-muted">Email Address *</label>
              <input 
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-muted">Subject / Category *</label>
            <input 
              type="text"
              placeholder="e.g. Escrow Refund Query / Template Issue"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
              }`}
            />
            {errors.subject && <span className="text-[10px] text-red-500 font-semibold">{errors.subject}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-muted">Detailed Message *</label>
            <textarea 
              rows={5}
              placeholder="Please detail your query, listing ID, or account details..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 resize-y ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
              }`}
            />
            {errors.message && <span className="text-[10px] text-red-500 font-semibold">{errors.message}</span>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-outline/10">
            <Button variant="text" size="md" type="button" onClick={handleReset}>Clear</Button>
            <Button variant="accent" size="md" type="submit">Submit Support Ticket</Button>
          </div>
        </form>
      </div>

      {/* Success Confirmation Modal */}
      <Modal isOpen={isSuccessOpen} onClose={handleReset} title="Ticket Created">
        <div className="flex flex-col items-center text-center gap-4 py-4 text-neutral-dark dark:text-white">
          <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">check_circle</span>
          <div className="flex flex-col gap-1">
            <h3 className="font-extrabold text-lg">Support Ticket Received</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
              We have created a support ticket and assigned it to our tech support squad. You will receive an email verification summary shortly.
            </p>
          </div>
          <div className="mt-4 w-full bg-surface-container-low p-4 rounded-xl border border-neutral-outline/10 text-left flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
              <span className="text-neutral-muted">Ticket ID:</span>
              <span className="font-mono font-bold">TIC-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
              <span className="text-neutral-muted">Name:</span>
              <span className="font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-muted">Subject:</span>
              <span className="font-bold truncate max-w-[180px]">{formData.subject}</span>
            </div>
          </div>
          <Button variant="primary" size="md" onClick={handleReset} className="mt-4 w-full">
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}
