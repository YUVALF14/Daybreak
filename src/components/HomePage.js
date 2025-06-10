import React from 'react';
import { Box, Typography, Button, Stack, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 8,
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
        borderRadius: 4,
        boxShadow: 3,
        px: { xs: 2, sm: 6 },
        py: { xs: 4, sm: 8 },
        animation: 'fadeIn 1s',
        position: 'relative',
      }}
    >
      <Avatar
        src="/favicon.ico"
        alt="logo"
        sx={{
          width: 72,
          height: 72,
          mx: 'auto',
          mb: 2,
          boxShadow: 2,
          bgcolor: '#fff',
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 2,
          color: '#1976d2',
          letterSpacing: 1,
          fontFamily: 'Heebo, Assistant, sans-serif',
          textShadow: '0 2px 12px #90caf9',
        }}
      >
        ברוכים הבאים למערכת ניהול האירועים של ה-YJCC
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: '#2C3E50', opacity: 0.85 }}>
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/admin-login')}
          sx={{
            px: 5,
            py: 2,
            fontWeight: 700,
            boxShadow: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
              background: 'linear-gradient(90deg, #64B5F6 0%, #1976d2 100%)',
            },
          }}
        >
          כניסת מנהלים
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/participants')}
          sx={{
            px: 5,
            py: 2,
            fontWeight: 700,
            borderWidth: 2,
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            boxShadow: 1,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
              borderColor: '#1976d2',
              background: '#e3f2fd',
            },
          }}
        >
          כניסת משתתפים
        </Button>
      </Stack>
      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
