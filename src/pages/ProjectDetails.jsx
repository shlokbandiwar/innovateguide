import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsService } from '../services/projectsService';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProjectCard from '../components/marketplace/ProjectCard';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Async States
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tabs Control
  const [activeTab, setActiveTab] = useState('overview');

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('summary'); // summary -> processing -> success

  useEffect(() => {
    setLoading(true);
    // Fetch project details
    projectsService.getProjectById(id).then(res => {
      if (res) {
        setProject(res);
        // Fetch related projects from the same category (excluding current)
        projectsService.getProjects({ category: res.category }).then(all => {
          setRelatedProjects(all.filter(p => p.id !== res.id).slice(0, 3));
          setLoading(false);
        });
      } else {
        // Redirect to 404 if not found
        navigate('/404', { replace: true });
      }
    });
  }, [id, navigate]);

  const handlePurchase = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 1800);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    // Reset stepper state
    setTimeout(() => setCheckoutStep('summary'), 300);
  };

  if (loading || !project) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full flex flex-col gap-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-muted dark:text-gray-400">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/browse" className="hover:text-primary">Browse</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-neutral-dark dark:text-white truncate max-w-xs">{project.title}</span>
      </div>

      {/* Hero Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Media Banner */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-neutral-outline/25 bg-neutral-outline/5 shadow-sm">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Price Badge over Image (Mobile only) */}
            <span className="absolute top-4 right-4 lg:hidden bg-primary text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
              ${project.price}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-outline/20">
            {['overview', 'documentation', 'tech-spec', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-xs font-bold capitalize relative cursor-pointer ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-neutral-muted hover:text-neutral-dark dark:hover:text-white'
                }`}
              >
                {tab.replace('-', ' ')}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-2xl p-6 shadow-sm min-h-64 flex flex-col gap-4 text-neutral-dark dark:text-white">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-extrabold text-base border-b border-neutral-outline/10 pb-2">Project Overview</h3>
                <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
                  This blueprint is built following modular folder configurations, clean component separations, and best practices in code reuse. Setup instructions are detailed in the repository documentation.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <div className="p-3 bg-surface-container-low rounded-lg border border-neutral-outline/10 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-neutral-muted">Code Vetting</span>
                    <span className="text-xs font-extrabold text-primary flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">verified</span> Passed
                    </span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg border border-neutral-outline/10 flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-neutral-muted">License type</span>
                    <span className="text-xs font-extrabold text-primary mt-1">Commercial/Personal</span>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-lg border border-neutral-outline/10 flex flex-col col-span-2 md:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-muted">Author support</span>
                    <span className="text-xs font-extrabold text-primary mt-1">6 Months Free</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documentation' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-extrabold text-base border-b border-neutral-outline/10 pb-2">Setup & Documentation</h3>
                <ul className="list-decimal pl-5 flex flex-col gap-2 text-xs text-neutral-muted dark:text-gray-300">
                  <li>Clone repository and navigate into directory.</li>
                  <li>Run npm install to configure dependencies.</li>
                  <li>Rename .env.example to .env and configure your environment API keys.</li>
                  <li>Execute npm run dev to start dev environments.</li>
                  <li>Use npm run build to audit code linting and verify output assets.</li>
                </ul>
              </div>
            )}

            {activeTab === 'tech-spec' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-extrabold text-base border-b border-neutral-outline/10 pb-2">Technical Specifications</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs py-1 border-b border-neutral-outline/10">
                    <span className="text-neutral-muted">Framework Version</span>
                    <span className="font-bold">Latest LTS release</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1 border-b border-neutral-outline/10">
                    <span className="text-neutral-muted">Responsive Engine</span>
                    <span className="font-bold">Tailwind CSS v3 / Flex-Grid grid systems</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1 border-b border-neutral-outline/10">
                    <span className="text-neutral-muted">Layout Paradigms</span>
                    <span className="font-bold">Fluid container grids, Mobile-First structure</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1">
                    <span className="text-neutral-muted">Accessibility compliance</span>
                    <span className="font-bold">WCAG compliant buttons & text contrasts</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-extrabold text-base border-b border-neutral-outline/10 pb-2">Reviews ({project.reviewsCount})</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 border-b border-neutral-outline/10 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">Dev_Alpha_99</span>
                      <span className="text-[10px] text-neutral-muted">June 2026</span>
                    </div>
                    <p className="text-xs text-neutral-muted dark:text-gray-300 italic">
                      "Clean architecture layout. Integrating the API modules took less than 2 hours. Very solid code structure."
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">CodeCrafter_Sarah</span>
                      <span className="text-[10px] text-neutral-muted">May 2026</span>
                    </div>
                    <p className="text-xs text-neutral-muted dark:text-gray-300 italic">
                      "Stripe gateway configured out-of-the-box. Made testing checkout checkout processes extremely easy."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Price Details & Mentor Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Price checkout box */}
          <div className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-neutral-outline/10 pb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-neutral-muted">Price Package</span>
                <span className="text-3xl font-extrabold text-neutral-dark dark:text-white">${project.price}</span>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">bolt</span> Instant Download
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs text-neutral-muted dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                Fully customizable source code repository
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                Complete step-by-step setup guides
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                14-day replacement/troubleshooting guarantee
              </div>
            </div>

            <Button 
              variant="accent" 
              size="lg" 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full mt-2"
            >
              Get Template Now
            </Button>
          </div>

          {/* Tech Stack card list */}
          <div className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-neutral-dark dark:text-white">
            <h4 className="font-bold text-sm">Tech Stack & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span 
                  key={i} 
                  className="bg-surface-container-low text-primary border border-neutral-outline/10 px-2.5 py-1 rounded-lg text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Mentor Support Card */}
          <div className="bg-white dark:bg-neutral-dark border border-neutral-outline/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4 text-neutral-dark dark:text-white">
            <h4 className="font-bold text-sm">Need Customization Help?</h4>
            <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-neutral-outline/10">
              <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-extrabold">Industry Mentor Support</span>
                <span className="text-[10px] text-neutral-muted">Direct assistance for configuration</span>
              </div>
            </div>
            <p className="text-xs text-neutral-muted dark:text-gray-300 leading-relaxed">
              Match with a verified developer squad member to help customize this codebase to match your specific organizational layout.
            </p>
            <Link to="/custom-request">
              <Button variant="secondary" size="sm" className="w-full">
                Hire Custom Developer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="flex flex-col gap-6 mt-6">
          <h3 className="text-xl font-extrabold text-neutral-dark dark:text-white">Related Project Blueprints</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Checkout Wizard Modal */}
      <Modal isOpen={isCheckoutOpen} onClose={handleCloseCheckout} title="Complete Template Purchase">
        <div className="flex flex-col gap-6 min-h-64 text-neutral-dark dark:text-white">
          {checkoutStep === 'summary' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-neutral-outline/10">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-16 h-12 rounded object-cover border border-neutral-outline/10"
                />
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs font-bold line-clamp-1">{project.title}</h4>
                  <span className="text-[10px] text-neutral-muted">Category: {project.category}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl text-xs border border-neutral-outline/10">
                <div className="flex justify-between items-center font-semibold text-neutral-muted">
                  <span>Standard License</span>
                  <span>${project.price}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-neutral-muted">
                  <span>Platform Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center font-extrabold text-neutral-dark dark:text-white pt-2 border-t border-neutral-outline/10 text-sm">
                  <span>Total Amount</span>
                  <span>${project.price}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-muted cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-outline text-primary focus:ring-primary h-4 w-4" />
                  I agree to the terms of service and license conditions.
                </label>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="text" size="md" onClick={handleCloseCheckout}>Cancel</Button>
                  <Button variant="accent" size="md" onClick={handlePurchase}>Confirm & Pay</Button>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 'processing' && (
            <div className="flex flex-col items-center justify-center gap-4 flex-grow my-8">
              <LoadingSpinner />
              <div className="text-center flex flex-col gap-1">
                <h4 className="font-bold text-sm">Processing Escrow Payment</h4>
                <p className="text-[11px] text-neutral-muted">Securing transaction parameters with merchant...</p>
              </div>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="flex flex-col items-center justify-center gap-4 text-center my-6">
              <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">check_circle</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-extrabold text-lg">Transaction Success!</h3>
                <p className="text-xs text-neutral-muted dark:text-gray-300 max-w-sm">
                  Your codebase file download is ready. We have also sent a secure package download link to your registered developer email address.
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={() => {
                    handleCloseCheckout();
                    // trigger file download simulation
                    alert('Downloading project source code package zip...');
                  }}
                >
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">download</span> Download ZIP
                  </span>
                </Button>
                <Button variant="text" size="md" onClick={handleCloseCheckout}>Close Panel</Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
