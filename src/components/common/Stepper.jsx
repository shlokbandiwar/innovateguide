import React from 'react';

export default function Stepper({ steps = [], activeStep = 0 }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4" aria-label="Progress tracker steps">
      <div className="relative flex items-center justify-between">
        {/* Background Track Line */}
        <div className="absolute left-0 right-0 h-1 bg-neutral-outline/30 z-0 top-1/2 -translate-y-1/2" />
        
        {/* Dynamic Active Line */}
        <div 
          className="absolute left-0 h-1 bg-primary z-0 top-1/2 -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, idx) => {
          const isCompleted = idx < activeStep;
          const isActive = idx === activeStep;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              {/* Step Circle */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-white' 
                    : isActive 
                    ? 'bg-white border-primary text-primary shadow' 
                    : 'bg-white border-neutral-outline text-neutral-muted'
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 hidden sm:block ${isActive ? 'text-primary' : 'text-neutral-muted'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
