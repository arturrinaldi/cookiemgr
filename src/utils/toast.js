import { useState, useEffect } from 'react';

let listeners = [];
let toasts = [];
let nextId = 0;

const notify = () => listeners.forEach(fn => fn([...toasts]));

export const addToast = (message, type = 'default', duration = 2500) => {
  const id = nextId++;
  const toast = { id, message, type };
  toasts = [...toasts, toast];
  notify();
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    notify();
  }, duration);
};

export const useToasts = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    listeners.push(setState);
    return () => { listeners = listeners.filter(l => l !== setState); };
  }, []);
  return state;
};
