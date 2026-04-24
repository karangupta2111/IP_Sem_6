import { useEffect, useRef, useCallback } from 'react';

/**
 * A custom hook that creates a debounced version of a callback function.
 * @param {Function} callback The function to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {Function} A debounced version of the callback.
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Cleanup the timeout if the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (callbackRef.current) {
        callbackRef.current(...args);
      }
    }, delay);
  }, [delay]);

  return debouncedCallback;
}
