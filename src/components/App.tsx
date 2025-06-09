import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '../styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { WhatsAppProvider } from '../context/WhatsAppContext';
import { EventsProvider } from '../context/EventsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WhatsAppProvider>
        <EventsProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </EventsProvider>
      </WhatsAppProvider>
    </ThemeProvider>
  );
}

export default App;