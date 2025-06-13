import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Celebration, Event, AdminPanelSettings, Group } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 8 },
        background: 'radial-gradient(ellipse at 80% 10%, #e3f2fd 0%, #fff 80%)',
          borderRadius: { xs: 8, sm: 20 },
          boxShadow: { xs: 6, sm: 18 },
          mx: { xs: 1, sm: 4 },
          my: { xs: 2, sm: 4 },
          border: '2.5px solid #e3f2fd',
          maxWidth: 600,
          marginX: 'auto',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeIn 1s',
        }}
      >
        <Celebration
          color="success"
          sx={{
            fontSize: 56,
            mb: 2,
            animation: 'float 2.5s ease-in-out infinite',
            color: '#1976d2',
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
        </Typography>
        <Stack spacing={3} sx={{ width: '100%' }}>
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
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out 0.2s forwards',
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
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out 0.4s forwards',
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
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out 0.6s forwards',
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
          </Button>
        </Stack>
        
        <Box
          sx={{
            mt: 6,
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
            © 2024 YJCC Prague Events System
          </Typography>
        </Box>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </Box>
  );
};

export default HomePage;
