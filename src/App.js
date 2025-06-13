import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import AdminLogin from './components/AdminLogin.js';
import EventDashboard from './components/EventDashboard.js';
import CommunityEvents from './components/CommunityEvents.js';
import BudgetDashboard from './components/BudgetDashboard.js';
import { EventsProvider } from './context/EventsContext';
import './App.css';

function App() {
  const ADMIN_CODE = '071024';
  const [showBudget, setShowBudget] = useState(false);

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
          <Route
            path="/budget"
            element={
              isAdmin && showBudget ? (
                <BudgetDashboard onBack={() => setShowBudget(false)} />
              ) : (
                // Non-admins or direct access: redirect to home or events
                <HomePage />
              )
            }
          />
          {/* Non-admins see only the event list */}
          <Route path="/community" element={<CommunityEvents />} />
          {/* fallback: non-admins see CommunityEvents for /events */}
          <Route path="/events" element={<CommunityEvents />} />
        </Routes>
      </Router>
    </EventsProvider>
  );
}

export default App;