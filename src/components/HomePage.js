import React from 'react';
import { Box, Typography, Button, Stack, Alert, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
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
        border: '2px solid #ffb74d',
        background: 'linear-gradient(135deg, #ffe0b2 0%, #ffd1dc 50%, #fffde7 100%)',
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
          background: 'linear-gradient(90deg, #ff9800 10%, #ffb74d 60%, #ff80ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 12px #ffd180',
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
          color: '#ad1457',
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
        <Typography variant="h6" sx={{ mb: 2, color: '#ff9800', fontWeight: 700 }}>
          אירועים קרובים להרשמה
        </Typography>
        {upcomingEvents.length === 0 && (
          <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
        )}
        <Stack spacing={2}>
          {upcomingEvents.map(event => (
            <Card key={event.id} sx={{ background: '#fffde7', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
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
                  color="success"
                  sx={{ mt: 2, borderRadius: 99, fontWeight: 700 }}
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
            boxShadow: '0 4px 24px 0 #ffb74d55',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
            color: '#fff',
            border: 'none',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #ffb74d99',
              background: 'linear-gradient(90deg, #ffa726 0%, #ff80ab 100%)',
            },
          }}
        >
          כניסת מנהלים
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
            borderColor: '#ffb74d',
            color: '#ad1457',
            background: '#fffde7',
            boxShadow: '0 2px 12px 0 #ffd18055',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 4px 20px 0 #ffb74d99',
              borderColor: '#ff80ab',
              background: '#ffe0b2',
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
            borderColor: '#ffb74d',
            color: '#1976d2',
            background: '#fffde7',
            boxShadow: '0 2px 12px 0 #ffd18055',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 4px 20px 0 #ffb74d99',
              borderColor: '#ff80ab',
              background: '#ffe0b2',
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
