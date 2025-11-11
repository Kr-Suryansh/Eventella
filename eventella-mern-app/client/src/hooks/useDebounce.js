import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Returns a debounced value that only updates after the specified delay
 * without changing the immediate UI-bound value.
 * @param {*} value - The raw input value to debounce
 * @param {number} delay - Milliseconds to wait before updating debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}
