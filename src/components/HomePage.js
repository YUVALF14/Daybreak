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
        borderRadius: 6,
        boxShadow: 6,
        border: '3px solid #64B5F6',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f8fafc 100%)',
        animation: 'bgMove 10s ease-in-out infinite alternate',
        transition: 'background 1s',
        zIndex: 1,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 2,
          letterSpacing: 1,
          fontFamily: 'Heebo, Assistant, sans-serif',
          background: 'linear-gradient(90deg, #1976d2 10%, #42A5F5 60%, #64B5F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 12px #90caf9',
          zIndex: 2,
          position: 'relative',
          animation: 'titleFadeIn 1.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        ברוכים הבאים למערכת ניהול האירועים של YJCC
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          color: '#2C3E50',
          opacity: 0.85,
          zIndex: 2,
          position: 'relative',
          fontWeight: 500,
          fontFamily: 'Assistant, Heebo, sans-serif',
          animation: 'fadeIn 1.5s',
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
            boxShadow: 2,
            letterSpacing: 1,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.07)',
              boxShadow: 6,
              background: 'linear-gradient(90deg, #64B5F6 0%, #1976d2 100%)',
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
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            boxShadow: 1,
            '&:hover': {
              transform: 'scale(1.07)',
              boxShadow: 4,
              borderColor: '#388e3c',
              background: '#e8f5e9',
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
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            boxShadow: 1,
            '&:hover': {
              transform: 'scale(1.07)',
              boxShadow: 4,
              borderColor: '#0288d1',
              background: '#e3f2fd',
            },
          }}
        >
          התחברות לחשבון קיים
        </Button>
      </Stack>
      <Box sx={{ mt: 5, zIndex: 2, position: 'relative' }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          בחרו פעולה:
        </Typography>
        <Typography sx={{ mb: 1 }}>
          כניסת מנהלים - ניהול אירועים, משתתפים וסטטיסטיקות
        </Typography>
        <Typography sx={{ mb: 1 }}>
          יצירת חשבון - הרשמה חדשה למערכת
        </Typography>
        <Typography sx={{ mb: 1 }}>
          התחברות לחשבון קיים
        </Typography>
        <Typography sx={{ mb: 1 }}>
          כל המחירים מוצגים ב-קרונות צ'כיות (CZK)
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Alert severity={isOnline ? 'success' : 'warning'}>
          {isOnline
            ? 'המערכת מחוברת לאינטרנט ומסונכרנת ☁️'
            : 'אין חיבור לאינטרנט - הנתונים לא יסונכרנו!'}
        </Alert>
      </Box>
      {/* Animation keyframes and dynamic background */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;700&display=swap');
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes titleFadeIn {
            from { opacity: 0; letter-spacing: 0.5em; }
            to { opacity: 1; letter-spacing: 0.03em; }
          }
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
