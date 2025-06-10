import React from 'react';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';

const HomePage = () => {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;

  return (
    <Box
      sx={{
        fontFamily: 'Heebo, Assistant, sans-serif',
        textAlign: 'center',
        mt: 8,
        minHeight: '80vh',
        px: { xs: 2, sm: 6 },
        py: { xs: 4, sm: 8 },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        boxShadow: 8,
        border: '2px solid #ffb74d',
        background: 'linear-gradient(135deg, #ffe0b2 0%, #ffd1dc 50%, #fffde7 100%)',
        zIndex: 1,
        transition: 'background 1s',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 2,
          letterSpacing: 1,
          fontFamily: 'Heebo, Assistant, sans-serif',
          background: 'linear-gradient(90deg, #ff9800 10%, #ffb74d 60%, #ff80ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 12px #ffd180',
          zIndex: 2,
          position: 'relative',
        }}
      >
        ברוכים הבאים למערכת ניהול האירועים של YJCC
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          color: '#ad1457',
          opacity: 0.92,
          zIndex: 2,
          position: 'relative',
          fontWeight: 500,
          fontFamily: 'Assistant, Heebo, sans-serif',
        }}
      >
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        justifyContent="center"
        sx={{ mt: 4, zIndex: 2, position: 'relative' }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AdminPanelSettingsIcon />}
          onClick={() => navigate('/admin-login')}
          sx={{
            px: 5,
            py: 2,
            fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: '1.1rem',
            boxShadow: '0 4px 24px 0 #ffb74d55',
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
            color: '#fff',
            border: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.07)',
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
            px: 5,
            py: 2,
            fontWeight: 700,
            borderWidth: 2,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: '1.1rem',
            borderColor: '#ffb74d',
            color: '#ad1457',
            background: '#fffde7',
            boxShadow: '0 2px 12px 0 #ffd18055',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.07)',
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
            px: 5,
            py: 2,
            fontWeight: 700,
            borderWidth: 2,
            borderRadius: 99,
            fontFamily: 'Heebo, Assistant, sans-serif',
            fontSize: '1.1rem',
            borderColor: '#ffb74d',
            color: '#1976d2',
            background: '#fffde7',
            boxShadow: '0 2px 12px 0 #ffd18055',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.07)',
              boxShadow: '0 4px 20px 0 #ffb74d99',
              borderColor: '#ff80ab',
              background: '#ffe0b2',
            },
          }}
        >
          התחברות לחשבון קיים
        </Button>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Alert severity={isOnline ? 'success' : 'warning'}>
          {isOnline
            ? 'המערכת מחוברת לאינטרנט ומסונכרנת ☁️'
            : 'אין חיבור לאינטרנט - הנתונים לא יסונכרנו!'}
        </Alert>
      </Box>
      {/* Animation keyframes and font import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;700&display=swap');
        `}
      </style>
    </Box>
  );
};

export default HomePage;
