import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Container,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  Close as CloseIcon,
  Assessment as AssessmentIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
} from '@mui/icons-material';
import { loadEventsFromCloud, saveEventsToCloud } from './services/database';
import { useEvents } from './context/EventsContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import EventDashboard from './components/EventDashboard';
import ParticipantLogin from './components/ParticipantLogin';
import ParticipantList from './components/ParticipantList';
import EventList from './components/EventList';
import Signup from './components/Signup';
import Login from './components/Login';
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
        <Route path="/participant-list" element={<ParticipantList />} />
        <Route path="/participant-login" element={<ParticipantLogin />} />
      </Routes>
    </Router>
  );
}

export default App;