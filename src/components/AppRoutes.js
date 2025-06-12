import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminLogin from './AdminLogin';
import EventDashboard from './EventDashboard';
import ParticipantList from './ParticipantList';
import EventList from './EventList';
import Signup from './Signup';
import Login from './Login';
import CommunityEvents from './CommunityEvents';
import BudgetDashboard from './BudgetDashboard';

const ADMIN_CODE = '071024';

const AppRoutes = () => {
  const [showBudget, setShowBudget] = useState(false);

  // Return boolean for success/failure, but do NOT navigate here
  const handleAdminLogin = useCallback((code) => {
    if (code === ADMIN_CODE) {
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    } else {
      alert('Invalid admin code. Please try again.');
      return false;
    }
  }, []);

  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

  return (
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
          element={<BudgetDashboard onBack={() => setShowBudget(false)} />}
        />
      )}
      <Route path="/community" element={<CommunityEvents />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/participants" element={<ParticipantList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
