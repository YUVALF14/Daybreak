import React, { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, PersonAdd } from '@mui/icons-material';

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
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }
    }}>
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: -60,
            left: 0,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 3,
            px: 3,
            py: 1.5,
            color: 'white',
            fontWeight: 700,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            }
          }}
        >
          חזור לעמוד הבית
        </Button>

        <Paper elevation={0} sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <PersonAdd sx={{ 
            fontSize: 64, 
            color: 'white', 
            mb: 2,
            filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.3))'
          }} />
          
          <Typography variant="h4" sx={{ 
            mb: 3, 
            fontWeight: 800,
            color: 'white',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            הרשמה למערכת
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setOpen(true)}
            sx={{ 
              mt: 2, 
              mb: 2,
              borderRadius: 3,
              py: 1.5,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              boxShadow: '0 8px 32px rgba(255,154,86,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(255,154,86,0.4)',
              }
            }}
          >            ✨ התחל הרשמה
          </Button>
        </Paper>        
        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Container>
      
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
    </Box>
  );
};

export default Signup;
