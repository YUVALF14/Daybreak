import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createCache, StyleProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyleProvider value={cacheRtl}>
      <App />
    </StyleProvider>
  </React.StrictMode>
); 
