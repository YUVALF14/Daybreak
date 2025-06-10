import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import fonts
import '@fontsource/assistant/400.css';
import '@fontsource/assistant/500.css';
import '@fontsource/assistant/600.css';
import '@fontsource/assistant/700.css';
import '@fontsource/heebo/400.css';
import '@fontsource/heebo/500.css';
import '@fontsource/heebo/700.css';
import '@fontsource/heebo/800.css';

import reportWebVitals from './reportWebVitals';
import { EventsProvider } from './context/EventsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.documentElement.setAttribute('dir', 'rtl'); // Ensure RTL globally
root.render(
  <React.StrictMode>
    <EventsProvider>
      <App />
    </EventsProvider>
  </React.StrictMode>
);

// Optional: Log web vitals to the console or send to analytics
reportWebVitals();
