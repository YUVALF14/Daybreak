import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { database } from '../config/firebase.js';
import { ref, set } from 'firebase/database';

const ParticipantLogin = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!/^05\d{8}$/.test(phone)) {
      setError('מספר טלפון לא תקין');
      return;
    }
    if (!name) {
      setError('נא למלא שם מלא');
      return;
    }
    // Save to Firebase
    await set(ref(database, `participants/${phone}`), { name, phone });
    localStorage.setItem('participant', JSON.stringify({ name, phone }));
    navigate('/participant-list');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          כניסת משתתפים / הרשמה
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="שם מלא"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="מספר טלפון"
            fullWidth
            margin="normal"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            כניסה / הרשמה
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ParticipantLogin;
