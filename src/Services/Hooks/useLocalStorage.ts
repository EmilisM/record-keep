import { useState, useCallback } from 'react';

const { localStorage } = window;

const useLocalStorage = <T>(key: string, initialValue?: T | (() => T)): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T): void => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        throw new Error(`Failed to set localStorage with key: ${key}`);
      }
    },
    [key, storedValue],
  );

  const removeKey = useCallback((): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw new Error(`Failed to remove localStorage with key: ${key}`);
    }
  }, [key]);

  return [storedValue, setValue, removeKey];
};

export default useLocalStorage;
