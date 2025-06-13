import React from 'react';
import { Box, Typography, Button, Stack, Fade, Grow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Celebration, Event, AdminPanelSettings, Group } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Fade in timeout={1000}>
      <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
        borderRadius: { xs: 4, sm: 10 },
        boxShadow: { xs: 2, sm: 8 },
        maxWidth: 420,
        mx: 'auto',
        mt: { xs: 6, sm: 10 },
        px: { xs: 2, sm: 6 },
        py: { xs: 4, sm: 8 },
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 1s',
      }}
    >
      <CelebrationIcon
        color="success"
        sx={{
          fontSize: 56,
          mb: 2,
          animation: 'float 2.5s ease-in-out infinite',
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          fontFamily: 'Heebo, Assistant, sans-serif',
          color: '#1976d2',
          fontSize: { xs: '2.1rem', sm: '2.5rem' },
          letterSpacing: '-0.03em',
          mb: 1,
          textAlign: 'center',
        }}
      >
        DAYBREAK
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          color: '#6e6e73',
          fontFamily: 'Assistant, Heebo, sans-serif',
          fontSize: { xs: '1.08rem', sm: '1.18rem' },
          mb: 4,
          textAlign: 'center',
        }}
      >
        מערכת קהילתית לניהול אירועים<br />
        הקהילה הישראלית הצעירה בפראג
      </Typography>      <Stack spacing={3} sx={{ width: '100%' }}>
        <Grow in timeout={1200}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AdminPanelSettings />}
            sx={{
              borderRadius: 99,
              fontWeight: 800,
              fontSize: '1.15rem',
              py: 2,
              letterSpacing: 1,
              boxShadow: '0 4px 15px rgba(0, 113, 227, 0.3)',
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 12px 30px rgba(0, 113, 227, 0.4)',
                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover::before': {
                left: '100%',
              }
            }}
            onClick={() => navigate('/admin-login')}
          >
            כניסת מנהלים
          </Button>
        </Grow>        <Grow in timeout={1400}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<Event />}
            sx={{
              borderRadius: 99,
              fontWeight: 800,
              fontSize: '1.15rem',
              py: 2,
              letterSpacing: 1,
              boxShadow: '0 4px 15px rgba(52, 199, 89, 0.2)',
              background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
              color: 'white',
              border: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 12px 30px rgba(52, 199, 89, 0.4)',
                background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                border: 'none',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover::before': {
                left: '100%',
              }
            }}
            onClick={() => navigate('/community')}
          >
            צפייה באירועים
          </Button>
        </Grow>        <Grow in timeout={1600}>
          <Button
            variant="text"
            size="large"
            startIcon={<Group />}
            sx={{
              borderRadius: 99,
              fontWeight: 800,
              fontSize: '1.15rem',
              py: 2,
              letterSpacing: 1,
              color: '#1976d2',
              background: 'rgba(25, 118, 210, 0.05)',
              border: '2px solid rgba(25, 118, 210, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.02)',
                background: 'rgba(25, 118, 210, 0.1)',
                border: '2px solid rgba(25, 118, 210, 0.4)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.2)',
              }
            }}
            onClick={() => navigate('/events')}
          >
            לוח האירועים
          </Button>        </Grow>
      </Stack>
      
      <Box
        sx={{
          mt: 6,
          pt: 2,
          textAlign: 'center',
          color: '#6e6e73',
          fontSize: '1rem',
          opacity: 0.85,
          borderTop: '1px solid #eaeaea',
          width: '100%',
        }}
      >
        <span>
          כל הזכויות שמורות &copy; {new Date().getFullYear()} | YJCC PRAHA
        </span>
      </Box>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px);}
            100% { transform: translateY(0);}
          }
        `}      </style>
    </Box>
    </Fade>
  );
};

export default HomePage;
