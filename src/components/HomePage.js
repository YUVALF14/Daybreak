import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 8, animation: 'fadeIn 1s' }}>
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(90deg, #64B5F6, #42A5F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        ברוכים הבאים ל-DAYBREAK 🌅
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: '#2C3E50' }}>
        מערכת ניהול אירועים לקהילה הישראלית הצעירה בפראג
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/admin-login')} sx={{ px: 5, py: 2, fontWeight: 700 }}>
          כניסת מנהלים
        </Button>
        <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/participants')} sx={{ px: 5, py: 2, fontWeight: 700 }}>
          כניסת משתתפים
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
