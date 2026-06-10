import React from 'react';
import { designSystem } from '../../styles/designSystem/constants';

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  icon = null, 
  isLoading = false, 
  disabled = false, 
  onClick, 
  children, 
  className = '',
  type = 'button'
}) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const variantStyle = designSystem.buttonVariants[variant] || designSystem.buttonVariants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyle} ${className}`}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
      ) : icon ? (
        <span className="material-symbols-outlined text-lg" aria-hidden="true">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
