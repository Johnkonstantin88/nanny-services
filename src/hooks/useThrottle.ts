import { useCallback, useRef } from 'react';

const useThrottle = (callback: Function, limit: number) => {
  const lastCallRef = useRef<number>(0);
  const throttledCallback = useCallback(
    (...args: unknown[]) => {
      const now = Date.now();
      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, limit]
  );
  return throttledCallback;
};
export default useThrottle;
