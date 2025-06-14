import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Stack,
  IconButton
} from '@mui/material';
import { Person, Phone, Email, Close, Event } from '@mui/icons-material';

function EventRegistrationDialog({ open, onClose, event, onRegister }) {
  const [participant, setParticipant] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!participant.name || !participant.phone) {
      setSnackbar({
        open: true,
        message: 'נא למלא שם וטלפון',
        severity: 'error'
      });
      return;
    }

    try {
      await onRegister(event.id, {
        ...participant,
        confirmed: true,
        paid: false,
        attended: false,
        registrationDate: new Date().toISOString()
      });
      
      setSnackbar({
        open: true,
        message: 'נרשמת בהצלחה לאירוע!',
        severity: 'success'
      });
      
      // Reset form
      setParticipant({ name: '', phone: '', email: '' });
      
      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'אירעה שגיאה בהרשמה',
        severity: 'error'
      });
    }
  };

  const handleInputChange = (field) => (e) => {
    setParticipant(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (!event) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,154,86,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
            direction: 'rtl',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #ff9a56 0%, #c2416b 50%, #8b1538 100%)',
              zIndex: 1
            }
          }
        }}
      >
        <DialogTitle sx={{ 
          position: 'relative',
          background: 'transparent',
          textAlign: 'center',
          pt: 4,
          pb: 2,
          px: 3
        }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
                transform: 'scale(1.1)',
              }
            }}
          >
            <Close />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Event sx={{ 
              fontSize: 48, 
              color: '#c2416b',
              filter: 'drop-shadow(0 2px 8px rgba(194,65,107,0.3))'
            }} />
          </Box>
          
          <Typography variant="h4" sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #c2416b 0%, #ff9a56 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}>
            הרשמה לאירוע
          </Typography>
          
          <Typography variant="h6" sx={{
            color: '#8b5a3c',
            fontWeight: 600,
            opacity: 0.9
          }}>
            {event.name || event.title}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 4, pb: 2 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="שם מלא"
              value={participant.name}
              onChange={handleInputChange('name')}
              required
              InputProps={{
                startAdornment: <Person sx={{ color: '#c2416b', mr: 1 }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 6px 20px rgba(194,65,107,0.2)',
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
              fullWidth
              label="מספר טלפון"
              value={participant.phone}
              onChange={handleInputChange('phone')}
              required
              InputProps={{
                startAdornment: <Phone sx={{ color: '#c2416b', mr: 1 }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 6px 20px rgba(194,65,107,0.2)',
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
              fullWidth
              label="כתובת מייל (אופציונלי)"
              type="email"
              value={participant.email}
              onChange={handleInputChange('email')}
              InputProps={{
                startAdornment: <Email sx={{ color: '#c2416b', mr: 1 }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 6px 20px rgba(194,65,107,0.2)',
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
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              borderColor: '#c2416b',
              color: '#c2416b',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#c2416b',
                background: 'rgba(194,65,107,0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(194,65,107,0.2)',
              }
            }}
          >
            ביטול
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              boxShadow: '0 6px 20px rgba(255,154,86,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255,154,86,0.4)',
              }
            }}
          >
            ✨ הירשם לאירוע
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: 3,
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EventRegistrationDialog;
