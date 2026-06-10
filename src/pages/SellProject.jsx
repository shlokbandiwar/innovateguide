import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { projectsService } from '../services/projectsService';

export default function SellProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    techStack: '',
    price: '',
    imageUrl: '',
  });

  // Simulated upload status
  const [codeFile, setCodeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Form Validation Errors
  const [errors, setErrors] = useState({});

  // Success state Modal toggle
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [createdProject, setCreatedProject] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCodeFile(file);
      setUploading(true);
      setUploadProgress(10);
      
      // Simulate file upload progress
      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setUploading(false);
            return 100;
          }
          return prev + 15;
        });
      }, 150);
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = 'Project title is required.';
    else if (formData.title.trim().length < 8) nextErrors.title = 'Title must be at least 8 characters.';
    
    if (!formData.description.trim()) nextErrors.description = 'Description summary is required.';
    else if (formData.description.trim().length < 20) nextErrors.description = 'Provide a description of at least 20 characters.';
    
    if (!formData.category) nextErrors.category = 'Please select a catalog category.';
    
    if (!formData.techStack.trim()) nextErrors.techStack = 'Please input technology tags.';
    
    if (!formData.price) {
      nextErrors.price = 'Please specify a target price.';
    } else if (Number(formData.price) < 5) {
      nextErrors.price = 'Price must be at least $5.';
    }

    if (!formData.imageUrl.trim()) {
      nextErrors.imageUrl = 'Please provide a preview cover image URL.';
    }

    if (!codeFile && !uploading) {
      nextErrors.codeFile = 'Please attach your codebase package ZIP.';
    } else if (uploading) {
      nextErrors.codeFile = 'Please wait for the codebase zip to finish uploading.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Split techStack comma string into array
      const tags = formData.techStack.split(',').map(t => t.trim()).filter(Boolean);
      
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        techStack: tags,
        price: Number(formData.price),
        imageUrl: formData.imageUrl
      };

      // Call service layer simulation
      projectsService.createProject(payload).then(res => {
        setCreatedProject(res);
        setIsSuccessOpen(true);
      });
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      techStack: '',
      price: '',
      imageUrl: '',
    });
    setCodeFile(null);
    setUploadProgress(0);
    setErrors({});
    setIsSuccessOpen(false);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full flex flex-col gap-10">
      {/* Page Header */}
      <div className="text-left flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-neutral-dark dark:text-white">
          List Your Project Template
        </h1>
        <p className="text-sm text-neutral-muted dark:text-gray-300">
          Upload your tested and verified source code repository to begin generating passive income from developers globally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Listing Form (2 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white dark:bg-neutral-dark border border-neutral-outline/25 p-6 md:p-8 rounded-2xl flex flex-col gap-6 shadow-sm text-neutral-dark dark:text-white">
          <h2 className="font-extrabold text-lg border-b border-neutral-outline/10 pb-2">Listing Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-neutral-muted">Listing Title *</label>
              <input 
                type="text"
                placeholder="e.g. Next.js SaaS Authentication Boilerplate"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.title && <span className="text-[10px] text-red-500 font-semibold">{errors.title}</span>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-neutral-muted">Features Summary & Details *</label>
              <textarea 
                rows={4}
                placeholder="Explain the features of this codebase, how to configure it, and how to verify operation..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 resize-y ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.description && <span className="text-[10px] text-red-500 font-semibold">{errors.description}</span>}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-muted">Marketplace Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.category ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              >
                <option value="">-- Choose Category --</option>
                <option value="websites">Websites</option>
                <option value="mobile-apps">Mobile Apps</option>
                <option value="e-commerce">E-Commerce</option>
                <option value="admin-dashboards">Admin Dashboards</option>
                <option value="ai-ml">AI & ML</option>
                <option value="cloud-devops">Cloud & DevOps</option>
              </select>
              {errors.category && <span className="text-[10px] text-red-500 font-semibold">{errors.category}</span>}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-neutral-muted">Listing Price (USD) *</label>
              <input 
                type="number"
                placeholder="e.g. 49"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.price ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.price && <span className="text-[10px] text-red-500 font-semibold">{errors.price}</span>}
            </div>

            {/* Tech stack */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-neutral-muted">Tech Stack Tags (Comma separated) *</label>
              <input 
                type="text"
                placeholder="e.g. Next.js, Tailwind CSS, TypeScript, Prisma"
                value={formData.techStack}
                onChange={(e) => handleInputChange('techStack', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.techStack ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.techStack && <span className="text-[10px] text-red-500 font-semibold">{errors.techStack}</span>}
            </div>

            {/* Preview image URL */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-bold text-neutral-muted">Preview Cover Image URL *</label>
              <input 
                type="text"
                placeholder="e.g. https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className={`bg-neutral-outline/5 border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 ${
                  errors.imageUrl ? 'border-red-500 focus:ring-red-500' : 'border-neutral-outline/25 focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.imageUrl && <span className="text-[10px] text-red-500 font-semibold">{errors.imageUrl}</span>}
            </div>
          </div>

          {/* Codebase File Upload simulator */}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-bold text-xs text-neutral-muted">Codebase Archive Upload *</h3>
            <div className="border-2 border-dashed border-neutral-outline/25 bg-neutral-outline/5 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 relative overflow-hidden">
              <span className="material-symbols-outlined text-4xl text-neutral-outline">folder_zip</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-extrabold text-neutral-dark dark:text-white">Drag & drop your codebase ZIP here</span>
                <span className="text-[10px] text-neutral-muted">Maximum file size: 50MB (Include all source, exclude node_modules)</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCodeFile({ name: 'mock_codebase_archive.zip', size: 1245862 });
                  }}
                  className="text-[10px] text-secondary font-bold underline cursor-pointer mt-1 hover:text-secondary-container"
                >
                  Or click here to load a mock project archive
                </button>
              </div>
              <input 
                type="file" 
                accept=".zip"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              {codeFile && (
                <div className="mt-2 bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-lg px-4 py-2 text-xs flex items-center gap-2 max-w-xs shadow-sm">
                  <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                  <span className="truncate max-w-[150px] font-bold">{codeFile.name}</span>
                  <span className="text-[10px] text-neutral-muted font-bold">({(codeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
              {uploading && (
                <div className="w-full max-w-xs flex flex-col gap-1 mt-2">
                  <div className="w-full bg-neutral-outline/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <span className="text-[9px] text-neutral-muted font-bold">Uploading repository... {uploadProgress}%</span>
                </div>
              )}
            </div>
            {errors.codeFile && <span className="text-[10px] text-red-500 font-semibold">{errors.codeFile}</span>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-outline/10">
            <Button variant="text" size="md" type="button" onClick={handleReset}>Reset</Button>
            <Button variant="accent" size="md" type="submit">Submit Template Listing</Button>
          </div>
        </form>

        {/* Right Side: Vetting Guidelines (1 col) */}
        <aside className="bg-primary-container border border-white/10 p-6 rounded-2xl flex flex-col gap-6 shadow-sm text-white h-fit">
          <h3 className="font-extrabold text-sm border-b border-white/10 pb-2">Vetting Compliance Checklist</h3>
          
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-secondary text-base">rule</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-white">No hardcoded API credentials</span>
                <p className="text-[10px] text-gray-200">Verify all credentials read from .env configuration files.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="material-symbols-outlined text-secondary text-base">rule</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-white">Provide clean readme guidelines</span>
                <p className="text-[10px] text-gray-200">Define steps to launch, dependencies layout, and build scripts.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="material-symbols-outlined text-secondary text-base">rule</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-white">Complies with WCAG accessibility</span>
                <p className="text-[10px] text-gray-200">Make sure text contrast conforms and UI labels feature labels.</p>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccessOpen} onClose={handleReset} title="Listing Submitted">
        <div className="flex flex-col items-center text-center gap-4 py-4 text-neutral-dark dark:text-white">
          <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">published_with_changes</span>
          <div className="flex flex-col gap-1">
            <h3 className="font-extrabold text-lg">Listing Sent to Technical Vetting</h3>
            <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
              Our engineering panel reviews all templates before they are published. Vetting is usually completed within 12 hours. We will email you once the listing is live.
            </p>
          </div>
          {createdProject && (
            <div className="mt-4 w-full bg-surface-container-low p-4 rounded-xl border border-neutral-outline/10 text-left flex flex-col gap-2 text-xs">
              <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
                <span className="text-neutral-muted">Listing ID:</span>
                <span className="font-mono font-bold">{createdProject.id}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-outline/5 pb-1">
                <span className="text-neutral-muted">Title:</span>
                <span className="font-bold truncate max-w-[180px]">{createdProject.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-muted">Price:</span>
                <span className="font-bold text-primary">${createdProject.price}</span>
              </div>
            </div>
          )}
          <Button variant="primary" size="md" onClick={handleReset} className="mt-4 w-full">
            Great, Thanks
          </Button>
        </div>
      </Modal>
    </div>
  );
}
