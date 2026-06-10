import { useState, useEffect } from 'react';

/**
  * Custom hook to debounce rapid value updates (such as input searches).
  * @param {any} value
  * @param {number} delay
  * @returns {any}
  */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
