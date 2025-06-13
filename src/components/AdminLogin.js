import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('AdminLogin handleSubmit called, code:', code); // DEBUG
    const success = onLogin(code);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      console.log('AdminLogin success, navigating to /admin-dashboard'); // DEBUG
      // Force a page refresh to update the authentication state
      window.location.href = '/admin-dashboard';
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,154,86,0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none'
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-20px, -15px) rotate(180deg)' }
        }
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(25px)',
            borderRadius: 8,
            padding: { xs: 4, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 30px 60px rgba(255,154,86,0.25), 0 15px 30px rgba(139,21,56,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.3)',
            position: 'relative',
            zIndex: 1,
            animation: 'slideUp 0.8s ease-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,154,86,0.05) 100%)',
              pointerEvents: 'none'
            },
            '@keyframes slideUp': {
              '0%': { 
                opacity: 0, 
                transform: 'translateY(30px) scale(0.95)' 
              },
              '100%': { 
                opacity: 1, 
                transform: 'translateY(0) scale(1)' 
              }
            }
          }}
        >          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              fontWeight: 700,
              borderRadius: 3,
              px: 3,
              py: 1,
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(255,154,86,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(255,154,86,0.4)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
              }
            }}
          >
            חזרה
          </Button>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 50%, #8b1538 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 18px 40px rgba(255,154,86,0.5), 0 8px 16px rgba(139,21,56,0.3)',
              position: 'relative',
              animation: 'pulse 2s ease-in-out infinite',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -4,
                left: -4,
                right: -4,
                bottom: -4,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,154,86,0.3) 0%, rgba(194,65,107,0.2) 100%)',
                zIndex: -1,
                filter: 'blur(8px)',
                animation: 'rotate 8s linear infinite'
              },
              '@keyframes pulse': {
                '0%, 100%': { 
                  transform: 'scale(1)',
                  boxShadow: '0 18px 40px rgba(255,154,86,0.5), 0 8px 16px rgba(139,21,56,0.3)'
                },
                '50%': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 22px 50px rgba(255,154,86,0.6), 0 12px 24px rgba(139,21,56,0.4)'
                }
              },
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 44, color: 'white' }} />
          </Box>          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 3,
              background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2rem',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              position: 'relative',
              animation: 'textGlow 3s ease-in-out infinite alternate',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #c2416b, transparent)',
                borderRadius: '2px',
                animation: 'underlineGrow 2s ease-out 0.5s both'
              },
              '@keyframes textGlow': {
                '0%': { 
                  filter: 'drop-shadow(0 0 5px rgba(194,65,107,0.3))'
                },
                '100%': { 
                  filter: 'drop-shadow(0 0 15px rgba(194,65,107,0.5))'
                }
              },
              '@keyframes underlineGrow': {
                '0%': { 
                  width: '0px',
                  opacity: 0
                },
                '100%': { 
                  width: '40px',
                  opacity: 1
                }
              }
            }}
          >
            כניסת מנהלים
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="קוד מנהל"
              type={showPassword ? 'text' : 'password'}
              value={code}
              autoFocus
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              error={error}
              helperText={error ? 'קוד מנהל לא תקין' : ''}
              sx={{
                borderRadius: 3,
                background: 'rgba(255,255,255,0.85)',
                mb: 2,
                fontWeight: 800,
                fontSize: '1.2rem',
              }}
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontWeight: 800,
                  letterSpacing: 2,
                  fontSize: '1.2rem',
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="הצג/הסתר סיסמה"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 2,
                px: 4,
                fontWeight: 800,
                fontSize: '1.2rem',
                borderRadius: 5,
                background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 100%)',
                boxShadow: '0 12px 28px rgba(194,65,107,0.4), 0 6px 12px rgba(139,21,56,0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.6s'
                },
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(194,65,107,0.5), 0 10px 20px rgba(139,21,56,0.3)',
                  background: 'linear-gradient(135deg, #d1537a 0%, #9c1e47 100%)',
                  '&::before': {
                    left: '100%'
                  }
                }
              }}
            >
              כניסה
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AdminLogin;