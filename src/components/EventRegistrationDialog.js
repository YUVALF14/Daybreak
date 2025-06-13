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
  Fade,
  Slide,
  Snackbar,
  Alert
} from '@mui/material';
import { Person, Phone, Email } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        message: 'נא למלא שם ומספר טלפון',
        severity: 'error'
      });
      return;
    }

    // Check if phone number already exists for this event
    const existingParticipant = event.participants?.find(p => p.phone === participant.phone);
    if (existingParticipant) {
      setSnackbar({
        open: true,
        message: 'כבר נרשמת לאירוע זה',
        severity: 'warning'
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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          fontWeight: 700,
          color: '#1976d2',
          pb: 1
        }}>
          <Typography variant="h5" component="div">
            הרשמה לאירוע
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            {event?.title}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Fade in={open} timeout={600}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="שם מלא"
                value={participant.name}
                onChange={handleInputChange('name')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: '#1976d2' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="מספר טלפון"
                value={participant.phone}
                onChange={handleInputChange('phone')}
                required
                margin="normal"
                type="tel"
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: '#1976d2' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="אימייל (אופציונלי)"
                value={participant.email}
                onChange={handleInputChange('email')}
                margin="normal"
                type="email"
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: '#1976d2' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                    }
                  }
                }}
              />
              
              {event?.price && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: '#e3f2fd', 
                  borderRadius: 2,
                  border: '1px solid #90caf9'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>מחיר:</strong> {event.price} CZK
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              px: 4,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.4)'
              }
            }}
          >
            הרשמה
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
            borderRadius: 2,
            fontWeight: 600
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EventRegistrationDialog;
