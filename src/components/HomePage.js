import React from 'react';
import { Box, Typography, Button, Stack, Alert, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import { useEvents } from '../context/EventsContext';

const HomePage = () => {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;
  const { events } = useEvents();

  // הצג רק אירועים עתידיים
  const upcomingEvents = events.filter(
    e => new Date(e.date) >= new Date()
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box
      sx={{
        fontFamily: 'Heebo, Assistant, sans-serif',
        textAlign: 'center',
        mt: { xs: 2, sm: 8 },
        minHeight: { xs: '70vh', sm: '80vh' },
        px: { xs: 1, sm: 6 },
        py: { xs: 2, sm: 8 },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 3, sm: 8 },
        boxShadow: { xs: 3, sm: 8 },
        border: '2px solid #64B5F6',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
        zIndex: 1,
        transition: 'background 1s',
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: { xs: 1, sm: 2 },
          letterSpacing: 1,
          fontFamily: 'Heebo, Assistant, sans-serif',
          background: 'linear-gradient(90deg, #1976d2 10%, #42A5F5 60%, #64B5F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 12px #90caf9',
          zIndex: 2,
          position: 'relative',
          fontSize: { xs: '2rem', sm: '2.5rem' },
        }}
      >
        ברוכים הבאים למערכת ניהול האירועים של YJCC
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 2, sm: 4 },
          color: '#1976d2',
          opacity: 0.92,
          zIndex: 2,
          position: 'relative',
          fontWeight: 500,
          fontFamily: 'Assistant, Heebo, sans-serif',
          fontSize: { xs: '1.1rem', sm: '1.5rem' },
        }}
      >
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      {/* הצגת אירועים פתוחים להרשמה */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 700 }}>
          אירועים קרובים להרשמה
        </Typography>
        {upcomingEvents.length === 0 && (
          <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
        )}
        <Stack spacing={2}>
          {upcomingEvents.map(event => (
            <Card key={event.id} sx={{ background: '#fff', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {event.title}
                </Typography>
                <Typography color="text.secondary">
                  {new Date(event.date).toLocaleDateString('he-IL')}
                </Typography>
                <Typography color="text.secondary">
                  📍 {event.location}
                </Typography>
                {event.price && (
                  <Typography color="text.secondary">
                    💸 מחיר: {event.price} CZK
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 99, fontWeight: 700, background: 'linear-gradient(90deg, #1976d2 0%, #64B5F6 100%)' }}
                  onClick={() => navigate(`/participants?eventId=${event.id}`)}
                >
                  להרשמה
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      {/* כפתורי ניווט נוספים */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: { xs: 2, sm: 4 }, zIndex: 2, position: 'relative' }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => navigate('/admin-login')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            boxShadow: '0 4px 24px 0 #64B5F655',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #1976d2 0%, #64B5F6 100%)',
            color: '#fff',
            border: 'none',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #64B5F699',
              background: 'linear-gradient(90deg, #42A5F5 0%, #1976d2 100%)',
            },
          }}
        >
          כניסת מנהלים
        </Button>
        <Button
          variant="contained"
          color="info"
          size="large"
          startIcon={<GroupIcon />}
          onClick={() => navigate('/community')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            boxShadow: '0 4px 24px 0 #64B5F655',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #42A5F5 0%, #E3F2FD 100%)',
            color: '#1976d2',
            border: 'none',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #64B5F699',
              background: 'linear-gradient(90deg, #1976d2 0%, #E3F2FD 100%)',
            },
          }}
        >
          כניסת חבר קהילה
        </Button>
        <Button
          variant="outlined"
          color="success"
          size="large"
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate('/signup')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderWidth: 2,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            borderColor: '#64B5F6',
            color: '#1976d2',
            background: '#fff',
            boxShadow: '0 2px 12px 0 #64B5F655',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 4px 20px 0 #64B5F699',
              borderColor: '#42A5F5',
              background: '#E3F2FD',
            },
          }}
        >
          יצירת חשבון חדש
        </Button>
        <Button
          variant="outlined"
          color="info"
          size="large"
          startIcon={<LoginIcon />}
          onClick={() => navigate('/login')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderWidth: 2,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            borderColor: '#64B5F6',
            color: '#1976d2',
            background: '#fff',
            boxShadow: '0 2px 12px 0 #64B5F655',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 4px 20px 0 #64B5F699',
              borderColor: '#42A5F5',
              background: '#E3F2FD',
            },
          }}
        >
          התחברות לחשבון קיים
        </Button>
      </Stack>
      <Box sx={{ mt: { xs: 2, sm: 4 } }}>
        <Alert severity={isOnline ? 'success' : 'warning'} sx={{ fontSize: { xs: '0.95rem', sm: '1.08rem' } }}>
          {isOnline
            ? 'המערכת מחוברת לאינטרנט ומסונכרנת ☁️'
            : 'אין חיבור לאינטרנט - הנתונים לא יסונכרנו!'}
        </Alert>
      </Box>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;700&display=swap');
        `}
      </style>
    </Box>
  );
};

export default HomePage;
