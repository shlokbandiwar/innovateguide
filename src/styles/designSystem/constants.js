import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { animations } from './animations';

export const designSystem = {
  colors,
  typography,
  spacing,
  animations,
  
  // Responsive Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  
  // Reusable Card Shadow Presets
  shadows: {
    sm: "shadow-[0px_2px_8px_rgba(27,85,115,0.04)]",
    md: "shadow-[0px_4px_20px_rgba(27,85,115,0.05)]",
    lg: "shadow-[0px_12px_32px_rgba(27,85,115,0.12)]",
    inset: "shadow-[inset_0px_2px_4px_rgba(0,0,0,0.06)]"
  },
  
  // Reusable Button Config Styles
  buttonVariants: {
    primary: "bg-primary text-white hover:bg-primary-container shadow-sm hover:shadow-md",
    accent: "bg-secondary text-white hover:bg-secondary-container shadow-md hover:shadow-lg",
    secondary: "bg-transparent text-primary border-2 border-primary hover:bg-primary/5",
    text: "bg-transparent text-neutral-muted hover:text-primary hover:bg-surface-container-low"
  }
};

export default designSystem;
