import { useState, useRef, useCallback, useEffect } from 'react';

export function useScrollSlider(count) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Reset to 0 when count changes (e.g. data loads in)
  useEffect(() => {
    setActiveIndex(0);
  }, [count]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIndex(Math.min(index, count - 1));
  }, [count]);

  return { scrollRef, activeIndex, onScroll };
}