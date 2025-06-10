import React from 'react';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const HomePage = () => {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e3f2fd 40%, #ede7f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          px: { xs: 2, sm: 6 },
          py: { xs: 3, sm: 6 },
          borderRadius: { xs: 4, sm: 8 },
          boxShadow: { xs: 2, sm: 8 },
          background: 'rgba(255,255,255,0.97)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontWeight: 900,
            fontSize: { xs: '2.1rem', sm: '2.8rem' },
            letterSpacing: 1,
            mb: 2,
            background: 'linear-gradient(90deg, #7c4dff 10%, #1976d2 60%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 24px #7c4dff22',
            lineHeight: 1.15,
          }}
        >
          DAYBREAK - מערכת ניהול אירועים
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Assistant, Heebo, sans-serif',
            fontWeight: 600,
            color: '#4527a0',
            opacity: 0.97,
            mb: 4,
            fontSize: { xs: '1.1rem', sm: '1.5rem' },
          }}
        >
          הקהילה הישראלית הצעירה בפראג
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<EventAvailableIcon />}
          onClick={() => navigate('/events')}
          sx={{
            mb: 3,
            px: { xs: 2, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontWeight: 800,
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            borderRadius: 99,
            boxShadow: '0 4px 24px 0 #7c4dff33',
            background: 'linear-gradient(90deg, #7c4dff 0%, #1976d2 100%)',
            color: '#fff',
            border: 'none',
            width: '100%',
            letterSpacing: 1,
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #7c4dff99',
              background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
            },
          }}
        >
          כניסה ללוח האירועים
        </Button>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2, zIndex: 2, position: 'relative' }}
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
              boxShadow: '0 4px 24px 0 #7c4dff33',
              letterSpacing: 1,
              background: 'linear-gradient(90deg, #7c4dff 0%, #1976d2 100%)',
              color: '#fff',
              border: 'none',
              width: { xs: '100%', sm: 'auto' },
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
              '&:hover': {
                transform: 'scale(1.04)',
                boxShadow: '0 6px 32px 0 #7c4dff99',
                background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
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
              borderColor: '#7c4dff',
              color: '#4527a0',
              background: '#ede7f6',
              boxShadow: '0 2px 12px 0 #7c4dff33',
              width: { xs: '100%', sm: 'auto' },
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
              '&:hover': {
                transform: 'scale(1.04)',
                boxShadow: '0 4px 20px 0 #7c4dff66',
                borderColor: '#1976d2',
                background: '#e3f2fd',
              },
            }}
          >
            הרשמה
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
              borderColor: '#7c4dff',
              color: '#1976d2',
              background: '#ede7f6',
              boxShadow: '0 2px 12px 0 #7c4dff33',
              width: { xs: '100%', sm: 'auto' },
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
              '&:hover': {
                transform: 'scale(1.04)',
                boxShadow: '0 4px 20px 0 #7c4dff66',
                borderColor: '#1976d2',
                background: '#e3f2fd',
              },
            }}
          >
            התחברות
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
    </Box>
  );
};

export default HomePage;
