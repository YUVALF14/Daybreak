import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAYBREAK
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            דף הבית
          </Button>
          <Button color="inherit" onClick={() => navigate('/events')}>
            אירועים
          </Button>
          <Button color="inherit" onClick={() => navigate('/participants')}>
            משתתפים
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} DAYBREAK. כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout; 