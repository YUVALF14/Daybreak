import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CelebrationIcon from '@mui/icons-material/Celebration';

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
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 99,
            fontWeight: 800,
            fontSize: '1.15rem',
            py: 1.7,
            letterSpacing: 1,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #0071e355',
              background: 'linear-gradient(90deg, #34c759 0%, #0071e3 100%)',
            },
          }}
          onClick={() => navigate('/admin-login')}
        >
          כניסת מנהלים
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{
            borderRadius: 99,
            fontWeight: 800,
            fontSize: '1.15rem',
            py: 1.7,
            letterSpacing: 1,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
            color: '#0071e3',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #0071e355',
              background: 'linear-gradient(90deg, #eaf6ff 0%, #f5f5f7 100%)',
            },
          }}
          onClick={() => navigate('/events')}
        >
          כניסה ללוח האירועים
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            borderRadius: 99,
            fontWeight: 800,
            fontSize: '1.15rem',
            py: 1.7,
            letterSpacing: 1,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #25d366 0%, #128c7e 100%)',
            color: '#fff',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: '0 6px 32px 0 #25d36655',
              background: 'linear-gradient(90deg, #128c7e 0%, #25d366 100%)',
            },
          }}
          href="https://wa.me/972542230342"
          target="_blank"
          rel="noopener noreferrer"
        >
          יצירת קשר בווצאפ
        </Button>
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
        `}
      </style>
    </Box>
  );
};

export default HomePage;
