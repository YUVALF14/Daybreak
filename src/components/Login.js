import React, { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login by checking localStorage
    const participant = JSON.parse(localStorage.getItem('participant') || '{}');
    if (participant.phone === phone) {
      setSnackbar(true);
      setTimeout(() => navigate('/participant-list'), 1200);
    } else {
      setSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          התחברות לחשבון קיים
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="מספר טלפון"
            fullWidth
            margin="normal"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            התחבר
          </Button>
        </Box>
        <Snackbar
          open={snackbar}
          autoHideDuration={2000}
          onClose={() => setSnackbar(false)}
          message="התחברות בוצעה (או לא נמצאה התאמה)"
        />
      </Paper>
    </Container>
  );
};

export default Login;
