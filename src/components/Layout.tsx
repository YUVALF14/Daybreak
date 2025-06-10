import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #E3F2FD 0%, #bbdefb 50%, #f8fafc 100%)',
        animation: 'bgMove 12s ease-in-out infinite alternate',
        transition: 'background 1s',
      }}
    >
      <AppBar
        position="static"
        color="primary"
        sx={{
          background: 'linear-gradient(90deg, #1976d2 0%, #64B5F6 100%)',
          boxShadow: 3,
          px: { xs: 1, sm: 3 },
        }}
      >
        <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: { xs: 1, sm: 0 } }}>
          <Avatar
            src="/favicon.ico"
            alt="logo"
            sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 }, bgcolor: '#fff', width: 40, height: 40, boxShadow: 2 }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 900,
              letterSpacing: 1,
              background: 'linear-gradient(90deg, #1976d2 10%, #42A5F5 60%, #64B5F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 12px #90caf9',
              fontSize: { xs: '1.3rem', sm: '2rem' },
            }}
          >
            DAYBREAK
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ mx: 1, width: { xs: '100%', sm: 'auto' }, my: { xs: 0.5, sm: 0 } }} aria-label="דף הבית">
            דף הבית
          </Button>
          <Button color="inherit" onClick={() => navigate('/admin-login')} sx={{ mx: 1, width: { xs: '100%', sm: 'auto' }, my: { xs: 0.5, sm: 0 } }} aria-label="כניסת מנהלים">
            כניסת מנהלים
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          mt: 4,
          mb: 4,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          bgcolor: '#ede7f6',
          textAlign: 'center',
          mt: 'auto',
          opacity: 0.92,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} DAYBREAK. כל הזכויות שמורות.
        </Typography>
      </Box>
      <style>
        {`
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

export default Layout;