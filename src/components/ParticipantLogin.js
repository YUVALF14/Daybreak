import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import { Login } from '@mui/icons-material';

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
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>        <Button
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
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          חזור לעמוד הבית
        </Button>        <Paper elevation={0} sx={{ 
          p: 4, 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 4,
          animation: 'fadeInUp 0.8s ease-out'
        }}>          <Login sx={{ 
            fontSize: 64, 
            color: 'white', 
            mb: 2
          }} />
            <Typography variant="h4" sx={{ 
            mb: 3, 
            fontWeight: 800,
            color: 'white'
          }}>
            כניסת משתתפים
          </Typography>
          
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="שם מלא"
              fullWidth
              margin="normal"
              value={name}
              onChange={e => setName(e.target.value)}              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)'
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255,255,255,0.95)',
                    '& fieldset': {
                      borderColor: '#c2416b',
                      borderWidth: 2
                    }
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#c2416b'
                }
              }}
            />
            <TextField
              label="מספר טלפון"
              fullWidth
              margin="normal"
              value={phone}
              onChange={e => setPhone(e.target.value)}              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)'
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255,255,255,0.95)',
                    '& fieldset': {
                      borderColor: '#c2416b',
                      borderWidth: 2
                    }
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#c2416b'
                }
              }}
            />
            {error && (
              <Typography color="error" sx={{ 
                mt: 2, 
                fontWeight: 600,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: 2,
                p: 1
              }}>
                {error}
              </Typography>
            )}
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ 
                mt: 3,
                borderRadius: 3,                py: 1.5,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              ✨ כניסה / הרשמה
            </Button>
          </Box>
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
    </Box>
  );
};

export default ParticipantLogin;
