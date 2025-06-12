import React, { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [snackbar, setSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage and redirect (simulate signup)
    localStorage.setItem('participant', JSON.stringify(form));
    setSnackbar(true);
    setOpen(false);
    setTimeout(() => navigate('/participant-list'), 1200);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          הרשמה למערכת
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={() => setOpen(true)}
        >
          הרשמה
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>הרשמה למערכת</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="inherit">
              ביטול
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              הרשמה
            </Button>
          </DialogActions>
        </Dialog>
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
