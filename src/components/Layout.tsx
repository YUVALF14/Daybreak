import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DAYBREAK
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')} aria-label="דף הבית">
            דף הבית
          </Button>
          <Button color="inherit" onClick={() => navigate('/events')} aria-label="אירועים">
            אירועים
          </Button>
          <Button color="inherit" onClick={() => navigate('/participants')} aria-label="משתתפים">
            משתתפים
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', textAlign: 'center', mt: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} DAYBREAK. כל הזכויות שמורות.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;