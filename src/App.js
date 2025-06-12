import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventDashboard from './components/EventDashboard';
import CommunityEvents from './components/CommunityEvents';
import BudgetDashboard from './components/BudgetDashboard';
import { EventsProvider } from './context/EventsContext'; // <-- add this import
import './App.css';

function App() {
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
    <EventsProvider>
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
    </EventsProvider>
  );
}

// REQUIRED ENV VARIABLE FOR ADMIN ACCESS (optional fallback to '071024'):
// REACT_APP_ADMIN_CODE=your_admin_code

export default App;