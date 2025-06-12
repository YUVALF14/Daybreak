import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventDashboard from './components/EventDashboard';
import EventList from './components/EventList';
import Signup from './components/Signup';
import Login from './components/Login';
import CommunityEvents from './components/CommunityEvents';
import ParticipantList from './components/ParticipantList';
import BudgetDashboard from './components/BudgetDashboard';
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
        {isAdmin && showBudget && (
          <Route
            path="/budget"
            element={
              <BudgetDashboard onBack={() => setShowBudget(false)} />
            }
          />
        )}
        <Route path="/community" element={<CommunityEvents />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/participants" element={<ParticipantList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;