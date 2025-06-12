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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { EventsProvider } from './context/EventsContext';
import { WhatsAppProvider } from './context/WhatsAppContext';

document.documentElement.setAttribute('dir', 'rtl');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WhatsAppProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </WhatsAppProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
