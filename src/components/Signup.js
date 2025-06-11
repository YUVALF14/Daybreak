import React, { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage and redirect (simulate signup)
    localStorage.setItem('participant', JSON.stringify(form));
    setSnackbar(true);
    setTimeout(() => navigate('/participant-list'), 1200);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          הרשמה למערכת
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="שם מלא"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <TextField
            label="מספר טלפון"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
          <TextField
            label="אימייל (אופציונלי)"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            הרשמה
          </Button>
        </Box>
        <Snackbar
          open={snackbar}
          autoHideDuration={2000}
          onClose={() => setSnackbar(false)}
          message="נרשמת בהצלחה!"
        />
      </Paper>
    </Container>
  );
};

export default Signup;
