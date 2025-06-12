import React, { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '../styles/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminLogin from './AdminLogin';
import CommunityEvents from './CommunityEvents';
import Layout from './Layout';
import { WhatsAppProvider } from '../context/WhatsAppContext';
import { EventsProvider } from '../context/EventsContext';

function App() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    localStorage.getItem('adminAuthenticated') === 'true'
  );

  const ADMIN_CODE = '071024';

  const handleAdminLogin = useCallback((code: string) => {
    if (code === ADMIN_CODE) {
      setAdminAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WhatsAppProvider>
        <EventsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="admin-login"
                  element={
                    <AdminLogin
                      onLogin={handleAdminLogin}
                    />
                  }
                />
                <Route path="community" element={<CommunityEvents />} />
                {/* אפשר להוסיף כאן עוד ראוטים בעתיד */}
              </Route>
            </Routes>
          </BrowserRouter>
        </EventsProvider>
      </WhatsAppProvider>
    </ThemeProvider>
  );
}

export default App;