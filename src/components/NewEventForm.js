import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, Grid } from '@mui/material';

/**
 * NewEventForm - Modern event creation dialog
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Function to close the dialog
 * @param {function} onSubmit - Function to handle event submission
 */
function NewEventForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    maxParticipants: '',
    price: '',
    subsidy: '',
  });

  // Premium styling for form fields
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: Date.now().toString(), // Generate unique ID
      ...formData,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants, 10) : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
    };
    
    onSubmit(eventData);
    
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      maxParticipants: '',
      price: '',
      subsidy: '',
    });
  };
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth      PaperProps={{
        sx: {
          borderRadius: 8,
          boxShadow: '0 32px 64px rgba(0,0,0,0.12), 0 16px 32px rgba(194,65,107,0.08)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,154,86,0.03) 50%, rgba(194,65,107,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
          direction: 'rtl',
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
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        textAlign: 'center',
        pt: 4,
        pb: 2,
        px: 4,
        position: 'relative',
        '&::after': {
          content: '"🆕"',
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          fontSize: '1.5rem',
          animation: 'bounce 2s ease-in-out infinite'
        },
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)' },
          '50%': { transform: 'translateY(-50%) scale(1.1)' }
        }
      }}>
        יצירת אירוע חדש
      </DialogTitle>      <DialogContent sx={{ px: 4, py: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם האירוע"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={premiumFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="תאריך ושעה"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={premiumFieldStyle}
              />            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מיקום"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                sx={premiumFieldStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="תיאור"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={premiumFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="משתתפים מקסימלי"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                sx={premiumFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="מחיר למשתתף (CZK)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                sx={premiumFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="סבסוד למשתתף (CZK)"
                name="subsidy"
                value={formData.subsidy}
                onChange={handleChange}
                sx={premiumFieldStyle}              />
            </Grid>
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
          צור אירוע
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEventForm;
