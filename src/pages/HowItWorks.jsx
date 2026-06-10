import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I verify the quality of a guide or template?",
      a: "Every listing includes a comprehensive Code Preview, full tech specs, and is backed by our technical review board's certification badge."
    },
    {
      q: "What happens if a script or package doesn't work?",
      a: "We offer a 48-hour 'Tech-Assure' escrow window. If a script fails to execute as described, we hold funds in escrow until the developer squad resolves the issue."
    },
    {
      q: "How are codebase listing authors paid?",
      a: "Sellers can withdraw earnings directly to Stripe, PayPal, or via direct bank transfer once the buyer confirms delivery and configuration."
    },
    {
      q: "Is there a student or institutional discount available?",
      a: "Yes! Verified students from partner educational institutions receive a 15% instant credit back on all marketplace blueprint purchases."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 py-10">
      
      {/* Hero Header */}
      <section className="max-w-3xl mx-auto px-margin-mobile text-center flex flex-col gap-4 text-neutral-dark dark:text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">System Guide</span>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          How InnovateGuide Works
        </h1>
        <p className="text-sm md:text-base text-neutral-muted dark:text-gray-300 leading-relaxed">
          Whether you're looking to acquire enterprise-grade IT solutions or share your technical expertise, InnovateGuide provides the precision tools you need to succeed.
        </p>
      </section>

      {/* Grid columns - Buyer Journey vs Seller Journey */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Journey 1: Buyers */}
        <div className="flex flex-col gap-8 bg-primary-container border border-white/10 p-6 md:p-8 rounded-2xl shadow-sm text-white">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Buyer Journey</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Acquiring Project Blueprints</h2>
            <p className="text-xs text-gray-200">Follow these steps to download clean code templates.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Browse Catalog</h4>
                <p className="text-gray-200 leading-relaxed">
                  Explore our curated marketplace of verified IT frameworks, automation scripts, and technical guides developed by industry veterans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Secure Purchase</h4>
                <p className="text-gray-200 leading-relaxed">
                  Our encrypted escrow system ensures your transaction is safe. Funds are only released once the technical requirements are met.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Instant Access</h4>
                <p className="text-gray-200 leading-relaxed">
                  Gain immediate access to your assets and documentation. Start implementing your new IT solutions within minutes of purchase.
                </p>
              </div>
            </div>
          </div>
          
          <Link to="/browse" className="mt-4">
            <Button variant="accent" size="md" className="w-full">Browse Blueprints</Button>
          </Link>
        </div>

        {/* Journey 2: Sellers */}
        <div className="flex flex-col gap-8 bg-primary-container border border-white/10 p-6 md:p-8 rounded-2xl shadow-sm text-white">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Seller Journey</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Listing Your Codebase</h2>
            <p className="text-xs text-gray-200">Monetize your verified software templates.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Submit Listing</h4>
                <p className="text-gray-200 leading-relaxed">
                  Upload your IT guides or software solutions. Provide clear documentation and metadata to help potential buyers understand your value.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Expert Vetting</h4>
                <p className="text-gray-200 leading-relaxed">
                  Our technical experts review your submission to ensure quality, security, and adherence to our precision IT standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div className="flex flex-col gap-1 text-xs">
                <h4 className="font-extrabold text-sm text-white">Earn Revenue</h4>
                <p className="text-gray-200 leading-relaxed">
                  Reach a global audience of IT professionals and students. Receive payments directly to your account with our low-fee commission model.
                </p>
              </div>
            </div>
          </div>

          <Link to="/sell" className="mt-4">
            <Button variant="accent" size="md" className="w-full">List Your Template</Button>
          </Link>
        </div>
      </section>


      {/* Why Choose Section with metrics */}
      <section className="bg-primary py-12 md:py-16 text-white overflow-hidden bg-grid-dots">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Benefits</span>
            <h2 className="text-2xl md:text-3xl font-extrabold">Enterprise-Grade Standards</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every transaction, project package, and asset customization request is backed by strict quality and escrow policies.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 lg:col-span-2 justify-around">
            <div className="flex flex-col gap-1 items-center text-center">
              <span className="text-4xl font-black text-secondary">24/7</span>
              <span className="text-xs font-bold text-gray-200">Priority Support</span>
            </div>
            <div className="flex flex-col gap-1 items-center text-center">
              <span className="text-4xl font-black text-secondary">99%</span>
              <span className="text-xs font-bold text-gray-200">Buyer Satisfaction</span>
            </div>
            <div className="flex flex-col gap-1 items-center text-center">
              <span className="text-4xl font-black text-secondary">100%</span>
              <span className="text-xs font-bold text-gray-200">Escrow Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Common FAQ accordion */}
      <section className="max-w-3xl mx-auto px-margin-mobile w-full flex flex-col gap-8 pb-10 text-neutral-dark dark:text-white">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Questions</span>
          <h2 className="text-2xl font-extrabold">Common Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-4 px-5 text-xs font-bold flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  {faq.q}
                  <span className={`material-symbols-outlined transition-transform duration-200 text-neutral-muted ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-xs text-neutral-muted dark:text-gray-300 leading-relaxed border-t border-neutral-outline/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
