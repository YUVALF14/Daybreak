import React from 'react';
import { Box, Typography, Button, Stack, Alert, Card, CardContent, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useEvents } from '../context/EventsContext';

const HomePage = () => {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;
  const { events } = useEvents();

  // הצג רק אירועים עתידיים
  const upcomingEvents = events.filter(
    e => e.date && new Date(e.date) >= new Date()
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box
      sx={{
        fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
        textAlign: 'right',
        direction: 'rtl',
        mt: { xs: 4, sm: 8 },
        minHeight: { xs: '70vh', sm: '80vh' },
        px: { xs: 2, sm: 8 },
        py: { xs: 3, sm: 8 },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 6, sm: 14 },
        boxShadow: { xs: 4, sm: 12 },
        background: 'radial-gradient(ellipse at 80% 10%, #e3f2fd 0%, #fff 80%)',
        zIndex: 1,
        maxWidth: 720,
        mx: 'auto',
        animation: 'fadeIn 1s',
        border: '2.5px solid #e3f2fd',
        transition: 'background 1s',
      }}
    >
      {/* לוגו ואנימציה */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CelebrationIcon color="success" sx={{ fontSize: 40, animation: 'float 2.5s ease-in-out infinite' }} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            letterSpacing: '-0.03em',
            fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
            color: '#1976d2',
            fontSize: { xs: '2rem', sm: '2.7rem' },
            textShadow: '0 2px 16px #90caf9',
            ml: 1,
            userSelect: 'none',
          }}
        >
          DAYBREAK - YJCC PRAHA
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: '#6e6e73',
          opacity: 0.92,
          fontFamily: 'Assistant, Heebo, sans-serif',
          fontSize: { xs: '1.15rem', sm: '1.5rem' },
        }}
      >
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      <Box sx={{
        width: '60%',
        height: 4,
        mx: 'auto',
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
        opacity: 0.25
      }} />

      {/* אירועים קרובים */}
      <Fade in timeout={900}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#0071e3', fontWeight: 800, letterSpacing: 1 }}>
            אירועים קרובים להרשמה
          </Typography>
          {upcomingEvents.length === 0 && (
            <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
          )}
          <Stack spacing={2}>
            {upcomingEvents.map(event => (
              <Card key={event.id} sx={{
                background: 'linear-gradient(90deg, #ede7f6 0%, #e3f2fd 100%)',
                borderRadius: 7,
                boxShadow: 6,
                px: 2,
                py: 1,
                animation: 'fadeIn 0.7s',
                border: '2px solid #e3f2fd',
                position: 'relative',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: 12,
                  transform: 'scale(1.025)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: '#1976d2', fontFamily: 'SF Pro Display', letterSpacing: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 700 }}>
                    {new Date(event.date).toLocaleDateString('he-IL')}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 500 }}>
                    📍 {event.location}
                  </Typography>
                  {event.price && (
                    <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 500 }}>
                      💸 מחיר: {event.price} CZK
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      borderRadius: 99,
                      fontWeight: 800,
                      fontFamily: 'SF Pro Display',
                      fontSize: '1.08rem',
                      boxShadow: '0 2px 8px rgba(0,113,227,0.07)',
                      background: 'linear-gradient(90deg, #0071e3 0%, #005bb5 100%)',
                      px: 4,
                      letterSpacing: 1,
                      transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #005bb5 0%, #0071e3 100%)',
                        boxShadow: '0 6px 32px 0 #0071e355',
                        transform: 'scale(1.04)',
                      }
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
      </Fade>

      {/* כפתורי ניווט מרכזיים */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="center"
        sx={{
          mt: { xs: 2, sm: 4 },
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AdminPanelSettingsIcon fontSize="medium" />}
          onClick={() => navigate('/admin-login')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 800,
            borderRadius: 99,
            fontFamily: 'SF Pro Display',
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
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
          }}
        >
          כניסת מנהלים
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<GroupIcon fontSize="medium" />}
          onClick={() => navigate('/community')}
          sx={{
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 800,
            borderRadius: 99,
            fontFamily: 'SF Pro Display',
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
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
          }}
        >
          כניסת חבר קהילה
        </Button>
      </Stack>

      {/* כפתור צף לאדמין */}
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
            width: 68,
            height: 68,
            boxShadow: '0 4px 24px rgba(0,113,227,0.18)',
            fontSize: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.7s',
            background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #34c759 0%, #0071e3 100%)',
              boxShadow: '0 8px 32px rgba(0,113,227,0.22)',
              transform: 'scale(1.08)',
            }
          }}
          onClick={() => navigate('/events')}
        >
          <AddIcon fontSize="large" />
        </Button>
      )}

      {/* חיווי חיבור */}
      <Box sx={{ mt: { xs: 2, sm: 4 } }}>
        <Alert
          severity={isOnline ? 'success' : 'warning'}
          sx={{
            fontSize: { xs: '1.05rem', sm: '1.15rem' },
            borderRadius: 3,
            fontWeight: 700,
            background: isOnline
              ? 'linear-gradient(90deg, #eaf6ff 0%, #e0ffe0 100%)'
              : 'linear-gradient(90deg, #fffbe6 0%, #ffe0e0 100%)',
            color: isOnline ? '#1976d2' : '#b26a00',
            boxShadow: 2,
          }}
        >
          {isOnline
            ? 'המערכת מחוברת לאינטרנט ומסונכרנת ☁️'
            : 'אין חיבור לאינטרנט - הנתונים לא יסונכרנו!'}
        </Alert>
      </Box>
      {/* פוטר */}
      <Box
        sx={{
          mt: 6,
          pt: 3,
          textAlign: 'center',
          color: '#6e6e73',
          fontSize: '1.08rem',
          opacity: 0.88,
          borderTop: '1.5px solid #eaeaea',
          fontWeight: 600,
          letterSpacing: 1,
          userSelect: 'none',
        }}
      >
        <span>
          כל הזכויות שמורות &copy; {new Date().getFullYear()} | נעשה באהבה <span style={{color:'#e25555'}}>♥</span> בשביל הקהילה הישראלית הצעירה בפראג
        </span>
      </Box>
      <style>
        {`
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
