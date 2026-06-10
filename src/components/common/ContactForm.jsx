import React, { useState } from 'react';
import { validateEmail } from '../../utils/validation';
import Button from './Button';

export default function ContactForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleValidate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <div className="bg-white dark:bg-neutral-dark p-6 rounded-xl border border-neutral-outline/25 shadow-sm">
      {submitted ? (
        <div className="text-center py-8 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
          <h3 className="font-bold text-neutral-dark dark:text-white text-lg">Ticket Created Successfully</h3>
          <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
            Thank you for reaching out. A developer support specialist will contact you in less than 24 hours.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)} className="mt-4">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1" htmlFor="contact-name">Full Name</label>
            <input 
              id="contact-name"
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Alice Developer"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/35 focus:ring-primary'}`}
            />
            {errors.name && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1" htmlFor="contact-email">Email Address</label>
            <input 
              id="contact-email"
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alice@example.com"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/35 focus:ring-primary'}`}
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</p>}
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1" htmlFor="contact-subject">Subject</label>
            <input 
              id="contact-subject"
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Bespoke Flutter customization"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/35 focus:ring-primary'}`}
            />
            {errors.subject && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.subject}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-muted mb-1" htmlFor="contact-message">Message Details</label>
            <textarea 
              id="contact-message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Explain what customization or support you require..."
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/35 focus:ring-primary'}`}
            />
            {errors.message && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            isLoading={loading}
            className="w-full mt-2"
          >
            Submit Request
          </Button>
        </form>
      )}
    </div>
  );
}
