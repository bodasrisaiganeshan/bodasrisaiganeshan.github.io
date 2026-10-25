import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque/standard.css';
import '@fontsource-variable/geist';
import './index.css';
import './sections.css';
import App from './App.jsx';

// Scroll reveals hide content only when they can also show it again.
if (typeof IntersectionObserver !== 'undefined') {
  document.documentElement.classList.add('can-reveal');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
