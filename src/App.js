import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useEvents } from './context/EventsContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventDashboard from './components/EventDashboard';
import CommunityEvents from './components/CommunityEvents';
import BudgetDashboard from './components/BudgetDashboard';
import './App.css';

// Branding colors
const YJCC_COLORS = {
  primary: '#64B5F6',
  secondary: '#90CAF9',
  accent: '#42A5F5',
  light: '#E3F2FD',
  background: '#F5F9FF',
  text: '#2C3E50',
  success: '#4CAF50',
  warning: '#FFA726',
};

const YJCCLogo = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontFamily: 'Heebo',
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '2.5rem' },
        background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 2,
        letterSpacing: '-0.02em',
      }}
    >
      YJCC Events
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Assistant',
        fontWeight: 500,
        color: YJCC_COLORS.text,
        letterSpacing: '0.02em',
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        lineHeight: 1.4,
      }}
    >
      הקהילה הישראלית הצעירה בפראג 🌟
    </Typography>
  </Box>
);

function App() {
  const { events } = useEvents();
  const [showBudget, setShowBudget] = useState(false);

  const ADMIN_CODE = '071024';

  const handleAdminLogin = useCallback((code) => {
    if (code === ADMIN_CODE) {
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    } else {
      alert('Invalid admin code. Please try again.');
      return false;
    }
  }, [ADMIN_CODE]);

  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin-login"
          element={
            isAdmin ? (
              <EventDashboard onNavigateBudget={() => setShowBudget(true)} />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        {/* Show budget dashboard only if admin and showBudget is true */}
        {isAdmin && showBudget && (
          <Route
            path="/budget"
            element={
              <BudgetDashboard onBack={() => setShowBudget(false)} />
            }
          />
        )}
        <Route path="/community" element={<CommunityEvents />} />
        {/* ...add more routes as needed... */}
      </Routes>
    </Router>
  );
}

// REQUIRED ENV VARIABLE FOR ADMIN ACCESS (optional fallback to '071024'):
// REACT_APP_ADMIN_CODE=your_admin_code

export default App;