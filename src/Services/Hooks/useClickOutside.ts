import { RefObject, useRef, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(callback: () => void): RefObject<T> => {
  const ref = useRef<T>(null);

  const handleEvent = (e: Event): void => {
    if (ref.current && e.target !== null && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleEvent, true);
    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  });

  return ref;
};

export default useClickOutside;
