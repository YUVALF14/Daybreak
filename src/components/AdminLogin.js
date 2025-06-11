import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      // Navigate to budget page only after successful login
      navigate('/budget');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 80% 10%, #e3f2fd 0%, #fff 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.97)',
            borderRadius: 8,
            boxShadow: 10,
            animation: 'fadeIn 0.7s',
            position: 'relative',
            border: '2.5px solid #e3f2fd',
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#1976d2',
              fontWeight: 700,
              borderRadius: 99,
              background: 'rgba(100,181,246,0.08)',
              px: 2,
              py: 0.5,
              fontSize: '1.1rem',
              '&:hover': { background: 'rgba(100,181,246,0.18)' },
            }}
          >
            חזור
          </Button>
          <Avatar
            sx={{
              m: 1,
              bgcolor: '#64B5F6',
              width: 72,
              height: 72,
              boxShadow: 3,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 44 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: '#1976d2',
              letterSpacing: 1,
              fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
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
              type="password"
              label="קוד מנהל"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 800,
                fontSize: '1.15rem',
                borderRadius: 99,
                background:
                  'linear-gradient(90deg, #64B5F6 0%, #1976d2 100%)',
                boxShadow: 3,
                transition:
                  'transform 0.2s, box-shadow 0.2s',
                letterSpacing: 1,
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: 5,
                  background:
                    'linear-gradient(90deg, #1976d2 0%, #64B5F6 100%)',
                },
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