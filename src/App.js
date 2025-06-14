import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventDashboard from './components/EventDashboard';
import CommunityEvents from './components/CommunityEvents';
import BudgetDashboard from './components/BudgetDashboard';
import ErrorBoundary from './ErrorBoundary';
import { EventsProvider } from './context/EventsContext';
import './App.css';

function App() {
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
    <ErrorBoundary>
      <div>
        <EventsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} /><Route
              path="/admin-login"
              element={
                isAdmin ? (
                  <EventDashboard />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                isAdmin ? (
                  <EventDashboard />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              }
            />            <Route
              path="/budget"
              element={
                isAdmin ? (
                  <BudgetDashboard onBack={() => window.history.back()} />
                ) : (
                  // Non-admins or direct access: redirect to home or events
                  <HomePage />
                )
              }
            />
            {/* Non-admins see only the event list */}
            <Route path="/community" element={<CommunityEvents />} />
            {/* fallback: non-admins see CommunityEvents for /events */}            <Route path="/events" element={<CommunityEvents />} />
          </Routes>
        </Router>
      </EventsProvider>
    </div>
    </ErrorBoundary>
  );
}

export default App;