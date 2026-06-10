import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_FAQS } from '../data/mockData';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Extend FAQs with more details from the Stitch project guidelines
  const EXTENDED_FAQS = [
    ...MOCK_FAQS,
    {
      id: "faq-5",
      question: "Are the custom projects subject to the same escrow guidelines?",
      answer: "Yes. All bespoke developer contracts require upfront escrow deposits. Funds are structured into delivery milestones (e.g., UI build, core API integration, final delivery) and are released only upon your verification."
    },
    {
      id: "faq-6",
      question: "What tech stacks are supported on the platform?",
      answer: "We support listing projects and custom requests across all modern tech stacks: React/Next.js, Flutter/Dart, Python/Django/FastAPI, cloud templates (Terraform/Kubernetes/AWS), and smart contract development."
    },
    {
      id: "faq-7",
      question: "What is the standard commission fee structure?",
      answer: "We charge a low 10% commission on blueprint sales to cover transaction processing, verification pipelines, and cloud delivery. The remaining 90% is settled directly with the seller."
    }
  ];

  const filteredFaqs = EXTENDED_FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full flex flex-col gap-10">
      
      {/* Header text */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-neutral-muted dark:text-gray-300">
          Have queries about code downloads, listing requirements, or custom developer support? Find the answers below.
        </p>
      </div>

      {/* Search Bar container */}
      <div className="max-w-md mx-auto w-full">
        <SearchBar 
          placeholder="Search FAQs..." 
          onSearch={(term) => setSearchQuery(term)} 
          initialValue={searchQuery}
        />
      </div>

      {/* FAQ Accordion list */}
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-4 text-neutral-dark dark:text-white">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-dark border border-neutral-outline/25 rounded-2xl flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-neutral-outline">sentiment_dissatisfied</span>
            <span className="text-xs font-bold text-neutral-muted">No matching questions found.</span>
            <Button variant="text" size="sm" onClick={() => setSearchQuery('')}>Clear Search</Button>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-primary-container border border-white/10 rounded-xl overflow-hidden shadow-sm text-white"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left py-4 px-5 text-xs font-bold flex items-center justify-between cursor-pointer focus:outline-none hover:text-secondary transition-colors"
                >
                  {faq.question}
                  <span className={`material-symbols-outlined transition-transform duration-200 text-white ${isOpen ? 'rotate-180' : ''}`}>
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
                      <p className="px-5 pb-4 text-xs text-gray-200 leading-relaxed border-t border-white/10 pt-3">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA card */}
      <div className="max-w-3xl mx-auto w-full bg-primary-container border border-white/10 p-6 rounded-2xl text-center flex flex-col items-center gap-3 mt-4 text-white">
        <h3 className="font-extrabold text-sm">Still have questions?</h3>
        <p className="text-xs text-gray-200 max-w-sm">
          If you can't find what you need in the FAQs, feel free to submit a support ticket to our developer team.
        </p>
        <Link to="/contact">
          <Button variant="accent" size="sm" className="mt-1">
            Get In Touch
          </Button>
        </Link>
      </div>

    </div>
  );
}
