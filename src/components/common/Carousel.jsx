import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Carousel({ children }) {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [children]);

  return (
    <div className="relative w-full overflow-hidden" ref={carouselRef}>
      {/* Scrollable drag container using Framer Motion */}
      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
        className="flex gap-6 cursor-grab px-1 py-4"
        style={{ width: 'max-content' }}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="w-[280px] sm:w-[320px] shrink-0 select-none">
            {child}
          </div>
        ))}
      </motion.div>
      
      {/* Visual swipe helper indicator for mobile users */}
      <div className="flex justify-center gap-1 mt-4 text-xs font-semibold text-neutral-muted md:hidden">
        <span className="material-symbols-outlined text-sm">swipe_left</span>
        <span>Swipe to browse</span>
      </div>
    </div>
  );
}
