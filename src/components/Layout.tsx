import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)' }}>
      <AppBar position="static" color="primary" sx={{ background: 'linear-gradient(90deg, #64B5F6 0%, #42A5F5 100%)', boxShadow: 3 }}>
        <Toolbar>
          <Avatar
            src="/favicon.ico"
            alt="logo"
            sx={{ mr: 2, bgcolor: '#fff', width: 40, height: 40, boxShadow: 2 }}
          />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            DAYBREAK
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ mx: 1 }} aria-label="דף הבית">
            דף הבית
          </Button>
          <Button color="inherit" onClick={() => navigate('/admin-login')} sx={{ mx: 1 }} aria-label="כניסת מנהלים">
            כניסת מנהלים
          </Button>
          <Button color="inherit" onClick={() => navigate('/participants')} sx={{ mx: 1 }} aria-label="כניסת משתתפים">
            כניסת משתתפים
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children || <Outlet />}
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', textAlign: 'center', mt: 'auto', opacity: 0.8 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} DAYBREAK. כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;