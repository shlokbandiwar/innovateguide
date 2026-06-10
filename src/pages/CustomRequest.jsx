import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Stepper from '../components/common/Stepper';
import Modal from '../components/common/Modal';

export default function CustomRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Project Scope', 'Technologies', 'Budget & Contact'];

  // Form Fields State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    techStack: [],
    budget: '',
    deadline: '',
    name: '',
    email: '',
    details: ''
  });

  // Validation Error States
  const [errors, setErrors] = useState({});

  // Success Modal State
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Common technologies to select
  const TECH_TAGS = ['React', 'Vue', 'Next.js', 'Flutter', 'Python', 'Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'];

  const validateStep = (step) => {
    const stepErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) stepErrors.title = 'Project title is required.';
      else if (formData.title.trim().length < 5) stepErrors.title = 'Title must be at least 5 characters.';
      
      if (!formData.description.trim()) stepErrors.description = 'Description is required.';
      else if (formData.description.trim().length < 20) stepErrors.description = 'Provide a brief summary of at least 20 characters.';
    } else if (step === 2) {
      if (!formData.category) stepErrors.category = 'Please select a domain category.';
      if (formData.techStack.length === 0) stepErrors.techStack = 'Please select at least one technology.';
    } else if (step === 3) {
      if (!formData.budget) stepErrors.budget = 'Please select your target budget.';
      if (!formData.deadline) stepErrors.deadline = 'Please select your target timeline.';
      
      if (!formData.name.trim()) stepErrors.name = 'Contact name is required.';
      if (!formData.email.trim()) {
        stepErrors.email = 'Contact email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = 'Provide a valid email address.';
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Complete form submission
        setIsSuccessOpen(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleTechTag = (tag) => {
    const isSelected = formData.techStack.includes(tag);
    const updated = isSelected 
      ? formData.techStack.filter(t => t !== tag) 
      : [...formData.techStack, tag];
    
    handleFieldChange('techStack', updated);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      techStack: [],
      budget: '',
      deadline: '',
      name: '',
      email: '',
      details: ''
    });
    setCurrentStep(1);
    setErrors({});
    setIsSuccessOpen(false);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full flex flex-col gap-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-white">
          Post Custom Project Specification
        </h1>
        <p className="text-sm text-neutral-muted dark:text-gray-300">
          Match with verified developer squads and industry mentors who will design, code, and document your bespoke system.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
        {/* Stepper Progress Bar */}
        <Stepper currentStep={currentStep} steps={steps} />

        {/* Wizard Form Container */}
        <div className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 text-neutral-dark dark:text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* STEP 1: SCOPE */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-extrabold text-lg border-b border-neutral-outline/10 pb-2">Step 1: Project Scope</h3>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-neutral-muted">Project Title *</label>
                    <input 
                      type="text"
                      placeholder="e.g. Real-Time Logistics Routing Dashboard"
                      value={formData.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                        errors.title 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    {errors.title && <span className="text-[10px] text-red-500 font-semibold">{errors.title}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-neutral-muted">Core Requirements & Description *</label>
                    <textarea 
                      rows={5}
                      placeholder="Detail what the code needs to accomplish, key integration APIs, target users, and dashboard pages needed..."
                      value={formData.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 resize-y ${
                        errors.description 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    {errors.description && <span className="text-[10px] text-red-500 font-semibold">{errors.description}</span>}
                  </div>
                </div>
              )}

              {/* STEP 2: TECH */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-extrabold text-lg border-b border-neutral-outline/10 pb-2">Step 2: Domain & Technology</h3>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-neutral-muted">Industry Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                        errors.category 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                      }`}
                    >
                      <option value="">-- Choose Category --</option>
                      <option value="web-dev">Web Development</option>
                      <option value="app-dev">Mobile Applications</option>
                      <option value="ai-ml">Artificial Intelligence / Machine Learning</option>
                      <option value="embedded">Embedded / IoT Hardware</option>
                      <option value="cloud">Cloud Architecture / DevOps</option>
                    </select>
                    {errors.category && <span className="text-[10px] text-red-500 font-semibold">{errors.category}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-muted">Target Frameworks & Systems (Select multiple) *</label>
                    <div className="flex flex-wrap gap-2">
                      {TECH_TAGS.map(tag => {
                        const selected = formData.techStack.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTechTag(tag)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              selected 
                                ? 'bg-primary border-primary text-white font-bold'
                                : 'bg-neutral-outline/5 border-neutral-outline/20 text-neutral-muted hover:border-neutral-outline'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                    {errors.techStack && <span className="text-[10px] text-red-500 font-semibold">{errors.techStack}</span>}
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & BUDGET */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-extrabold text-lg border-b border-neutral-outline/10 pb-2">Step 3: Budget & Timeline</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-muted">Approximate Budget (USD) *</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleFieldChange('budget', e.target.value)}
                        className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                          errors.budget
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                        }`}
                      >
                        <option value="">-- Choose Budget Range --</option>
                        <option value="under-100">Under $100</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1500">$500 - $1,500</option>
                        <option value="above-1500">Above $1,500</option>
                      </select>
                      {errors.budget && <span className="text-[10px] text-red-500 font-semibold">{errors.budget}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-muted">Expected Timeline *</label>
                      <select
                        value={formData.deadline}
                        onChange={(e) => handleFieldChange('deadline', e.target.value)}
                        className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                          errors.deadline
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                        }`}
                      >
                        <option value="">-- Choose Timeline --</option>
                        <option value="1-week">Within 1 Week</option>
                        <option value="2-4-weeks">2 - 4 Weeks</option>
                        <option value="1-2-months">1 - 2 Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      {errors.deadline && <span className="text-[10px] text-red-500 font-semibold">{errors.deadline}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-muted">Contact Name *</label>
                      <input 
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-muted">Contact Email *</label>
                      <input 
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                        }`}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls button actions */}
          <div className="flex justify-between items-center pt-4 border-t border-neutral-outline/10">
            <Button
              variant="text"
              size="md"
              onClick={handleBack}
              className={currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}
            >
              Back
            </Button>
            <Button
              variant={currentStep === 3 ? 'accent' : 'primary'}
              size="md"
              onClick={handleNext}
            >
              {currentStep === 3 ? 'Submit Request' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      <Modal isOpen={isSuccessOpen} onClose={resetForm} title="Specification Received">
        <div className="flex flex-col items-center text-center gap-4 py-4 text-neutral-dark dark:text-white">
          <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">task_alt</span>
          <div className="flex flex-col gap-1">
            <h3 className="font-extrabold text-lg">Custom Specification Posted</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
              Your system requirements have been compiled and sent to our expert mentor panel. A developer squad lead will reach out to you within 24 hours to schedule your consultation.
            </p>
          </div>
          <div className="mt-4 w-full bg-surface-container-low p-4 rounded-xl border border-neutral-outline/10 text-left flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
              <span className="text-neutral-muted">Project ID:</span>
              <span className="font-mono font-bold">REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
              <span className="text-neutral-muted">Subject:</span>
              <span className="font-bold truncate max-w-[180px]">{formData.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-muted">Selected Tech:</span>
              <span className="font-bold">{formData.techStack.join(', ')}</span>
            </div>
          </div>
          <Button variant="primary" size="md" onClick={resetForm} className="mt-4 w-full">
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}
