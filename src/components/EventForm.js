import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Grid,
  Typography
} from '@mui/material';

function EventForm({ open, onClose, onSubmit, event }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    maxParticipants: '',
    price: '',
    subsidy: '',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: event?.title || '',
        date: event?.date || '',
        description: event?.description || '',
        location: event?.location || '',
        maxParticipants: event?.maxParticipants?.toString() || '',
        price: event?.price?.toString() || '',
        subsidy: event?.subsidy?.toString() || '',
      });
    }
  }, [event, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      maxParticipants: formData.maxParticipants
        ? parseInt(formData.maxParticipants, 10)
        : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
    };
    
    // Ensure ID is included for updates
    if (event && event.id) {
      eventData.id = event.id;
    }
    
    onSubmit(eventData);
  };

  const totalBudget = formData.maxParticipants && formData.subsidy 
    ? (parseInt(formData.maxParticipants, 10) * parseFloat(formData.subsidy || 0))
    : 0;

  // Common premium styling for all form fields
  const premiumFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        '& fieldset': {
          borderColor: '#ff9a56',
          borderWidth: 2,
        }
      },
      '&.Mui-focused': {
        background: 'rgba(255,255,255,1)',
        boxShadow: '0 12px 40px rgba(194,65,107,0.15)',
        '& fieldset': {
          borderColor: '#c2416b',
          borderWidth: 2,
        }
      }
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#c2416b',
      fontWeight: 600
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 8,
          boxShadow: '0 32px 64px rgba(0,0,0,0.12), 0 16px 32px rgba(194,65,107,0.08)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,154,86,0.03) 50%, rgba(194,65,107,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideInScale 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #ff9a56 0%, #c2416b 50%, #8b1538 100%)',
            zIndex: 1
          },
          '@keyframes slideInScale': {
            '0%': {
              opacity: 0,
              transform: 'scale(0.9) translateY(20px)'
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1) translateY(0)'
            }
          }
        }
      }}
    >
      <DialogTitle sx={{
        fontWeight: 900,
        fontSize: { xs: '1.4rem', sm: '1.6rem' },
        background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.02em',
        fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
        textAlign: 'center',
        pt: 4,
        pb: 2,
        px: 4,
        position: 'relative',
        '&::after': {
          content: '"✨"',
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          fontSize: '1.5rem',
          animation: 'sparkle 2s ease-in-out infinite'
        },
        '@keyframes sparkle': {
          '0%, 100%': { opacity: 0.6, transform: 'translateY(-50%) scale(1)' },
          '50%': { opacity: 1, transform: 'translateY(-50%) scale(1.1)' }
        }
      }}>
        {event ? 'עריכת אירוע' : 'יצירת אירוע חדש'}
      </DialogTitle>
        <DialogContent sx={{ px: 4, py: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם האירוע"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="תאריך ושעה"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מיקום"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="תיאור האירוע"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="מספר משתתפים מקסימלי"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                inputProps={{ min: 1 }}
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="מחיר למשתתף (CZK)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                inputProps={{ min: 0, step: 0.01 }}
                sx={premiumFieldStyle}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="סבסוד למשתתף (CZK)"
                value={formData.subsidy}
                onChange={(e) => setFormData({ ...formData, subsidy: e.target.value })}
                inputProps={{ min: 0, step: 0.01 }}
                sx={premiumFieldStyle}
              />
            </Grid>
            
            {totalBudget > 0 && (
              <Grid item xs={12}>
                <Box sx={{
                  p: 3,
                  borderRadius: 5,
                  background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8ff 100%)',
                  border: '2px solid #4caf50',
                  textAlign: 'center',
                  animation: 'fadeInUp 0.3s ease-out'
                }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 800,
                    color: '#2e7d32',
                    fontSize: '1.2rem',
                    letterSpacing: 1
                  }}>
                    💰 סה"כ תקציב סבסוד: {totalBudget.toLocaleString()} CZK
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: '#4caf50',
                    fontWeight: 600,
                    mt: 0.5
                  }}>
                    {formData.maxParticipants} משתתפים × {formData.subsidy} CZK
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 3, justifyContent: 'center' }}>
        <Button 
          onClick={onClose}
          sx={{
            borderRadius: 4,
            fontWeight: 700,
            px: 5,
            py: 1.8,
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.9)',
            color: '#666',
            border: '2px solid rgba(194,65,107,0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(194,65,107,0.1)',
              borderColor: '#c2416b',
              color: '#c2416b',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(194,65,107,0.2)'
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
            borderRadius: 4,
            fontWeight: 700,
            px: 5,
            py: 1.8,
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
            boxShadow: '0 8px 25px rgba(255,154,86,0.4)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.6s'
            },
            '&:hover': {
              background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 35px rgba(255,154,86,0.5)',
              '&::before': {
                left: '100%'
              }
            }
          }}
        >
          {event ? '💾 עדכון אירוע' : '✨ יצירת אירוع'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventForm;