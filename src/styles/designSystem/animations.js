export const animations = {
  // Framer Motion transition definitions
  transitions: {
    smooth: {
      type: "spring",
      stiffness: 100,
      damping: 15
    },
    default: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    },
    slow: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  
  // Reusable Framer Motion animation presets
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 }
    },
    slideInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30 }
    }
  }
};
