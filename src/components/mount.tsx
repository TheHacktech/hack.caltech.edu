import { StrictMode } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export function mount(page: ReactNode) {
  const root = document.getElementById('root');
  if (!root) throw new Error('The page is missing its React root.');
  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}
