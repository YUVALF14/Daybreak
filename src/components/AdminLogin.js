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

function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.97)',
            borderRadius: 6,
            boxShadow: 6,
            animation: 'fadeIn 0.7s',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: '#64B5F6',
              width: 64,
              height: 64,
              boxShadow: 2,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: '#1976d2',
              letterSpacing: 1,
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
                borderRadius: 2,
                background: 'rgba(255,255,255,0.8)',
                mb: 2,
              }}
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontWeight: 700,
                  letterSpacing: 2,
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
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 3,
                background:
                  'linear-gradient(90deg, #64B5F6 0%, #1976d2 100%)',
                boxShadow: 2,
                transition:
                  'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: 4,
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