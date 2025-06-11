import React from 'react';
import { Box, Typography, Button, Stack, Alert, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import { useEvents } from '../context/EventsContext';

const HomePage = () => {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;
  const { events } = useEvents();

  // הצג רק אירועים עתידיים
  const upcomingEvents = events.filter(
    e => {
      if (!e.date) return false;
      return new Date(e.date) >= new Date();
    }
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box
      sx={{
        fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
        textAlign: 'right', // RTL alignment
        direction: 'rtl',
        mt: { xs: 4, sm: 10 },
        minHeight: { xs: '70vh', sm: '80vh' },
        px: { xs: 2, sm: 8 },
        py: { xs: 3, sm: 10 },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 4, sm: 10 },
        boxShadow: { xs: 2, sm: 8 },
        border: 'none',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #fff 100%)',
        zIndex: 1,
        transition: 'background 1s',
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      {/* Animated emoji for welcome */}
      <Box sx={{ mb: 2 }}>
        <span className="emoji" style={{ fontSize: '2.5rem', animation: 'float 2.5s ease-in-out infinite' }}>🌅</span>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: { xs: 1, sm: 2 },
          letterSpacing: '-0.02em',
          fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
          color: '#1d1d1f',
          zIndex: 2,
          position: 'relative',
          fontSize: { xs: '1.5rem', sm: '2rem' }, // smaller headline
          lineHeight: 1.2,
          textShadow: '0 1px 0 #fff, 0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        ברוכים הבאים למערכת ניהול האירועים של YJCC
      </Typography>
      {/* Gradient divider */}
      <Box sx={{
        width: '60%',
        height: 4,
        mx: 'auto',
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
        opacity: 0.25
      }} />
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 2, sm: 4 },
          color: '#6e6e73',
          opacity: 0.92,
          zIndex: 2,
          position: 'relative',
          fontWeight: 500,
          fontFamily: 'Assistant, Heebo, sans-serif',
          fontSize: { xs: '1.15rem', sm: '1.5rem' },
        }}
      >
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      {/* הצגת אירועים פתוחים להרשמה */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#0071e3', fontWeight: 700 }}>
          אירועים קרובים להרשמה
        </Typography>
        {upcomingEvents.length === 0 && (
          <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
        )}
        <Stack spacing={2}>
          {upcomingEvents.map(event => (
            <Card key={event.id} sx={{ background: '#fff', borderRadius: 4, boxShadow: 2, px: 2, py: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0071e3', fontFamily: 'SF Pro Display' }}>
                  {event.title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontFamily: 'Assistant' }}>
                  {new Date(event.date).toLocaleDateString('he-IL')}
                </Typography>
                <Typography color="text.secondary" sx={{ fontFamily: 'Assistant' }}>
                  📍 {event.location}
                </Typography>
                {event.price && (
                  <Typography color="text.secondary" sx={{ fontFamily: 'Assistant' }}>
                    💸 מחיר: {event.price} CZK
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    borderRadius: 99,
                    fontWeight: 700,
                    fontFamily: 'SF Pro Display',
                    fontSize: '1.08rem',
                    boxShadow: '0 2px 8px rgba(0,113,227,0.07)',
                    background: 'linear-gradient(90deg, #0071e3 0%, #005bb5 100%)',
                  }}
                  onClick={() => navigate(`/participants?eventId=${event.id}`)}
                >
                  להרשמה
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      {/* כפתורי ניווט בלבד */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="center"
        sx={{
          mt: { xs: 2, sm: 4 },
          zIndex: 2,
          position: 'relative',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={
            <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
              <AdminPanelSettingsIcon fontSize="medium" />
            </span>
          }
          onClick={() => navigate('/admin-login')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'SF Pro Display',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            boxShadow: '0 2px 8px rgba(0,113,227,0.07)',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #0071e3 0%, #005bb5 100%)',
            color: '#fff',
            border: 'none',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #0071e355',
              background: 'linear-gradient(90deg, #005bb5 0%, #0071e3 100%)',
            },
            '& .MuiButton-startIcon': {
              marginLeft: 0,
              marginRight: 8,
            },
          }}
        >
          כניסת מנהלים
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={
            <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
              <GroupIcon fontSize="medium" />
            </span>
          }
          onClick={() => navigate('/community')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'SF Pro Display',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            boxShadow: '0 2px 8px rgba(0,113,227,0.07)',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
            color: '#0071e3',
            border: 'none',
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #0071e355',
              background: 'linear-gradient(90deg, #eaf6ff 0%, #f5f5f7 100%)',
            },
            '& .MuiButton-startIcon': {
              marginLeft: 0,
              marginRight: 8,
            },
          }}
        >
          כניסת חבר קהילה
        </Button>
      </Stack>
      {/* Floating action button for quick event creation (visible for admins) */}
      {localStorage.getItem('adminAuthenticated') === 'true' && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: { xs: 24, sm: 40 },
            left: { xs: 24, sm: 40 },
            zIndex: 1000,
            borderRadius: '50%',
            minWidth: 0,
            width: 64,
            height: 64,
            boxShadow: '0 4px 24px rgba(0,113,227,0.18)',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.7s',
          }}
          onClick={() => navigate('/events')}
        >
          <AddIcon fontSize="large" />
        </Button>
      )}
      <Box sx={{ mt: { xs: 2, sm: 4 } }}>
        <Alert severity={isOnline ? 'success' : 'warning'} sx={{ fontSize: { xs: '0.95rem', sm: '1.08rem' } }}>
          {isOnline
            ? 'המערכת מחוברת לאינטרנט ומסונכרנת ☁️'
            : 'אין חיבור לאינטרנט - הנתונים לא יסונכרנו!'}
        </Alert>
      </Box>
      {/* Footer */}
      <Box
        sx={{
          mt: 6,
          pt: 3,
          textAlign: 'center',
          color: '#6e6e73',
          fontSize: '1rem',
          opacity: 0.85,
          borderTop: '1px solid #eaeaea',
        }}
      >
        <span>
          כל הזכויות שמורות &copy; {new Date().getFullYear()} | נעשה באהבה <span style={{color:'#e25555'}}>♥</span> בשביל הקהילה הישראלית הצעירה בפראג
        </span>
      </Box>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;700&display=swap');
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px);}
            100% { transform: translateY(0);}
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
