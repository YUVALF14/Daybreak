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

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 7,
          boxShadow: 10,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          border: '2.5px solid #e3f2fd',
          animation: 'fadeIn 0.3s ease-out',
        }
      }}
    >
      <DialogTitle sx={{
        fontWeight: 900,
        fontSize: '1.5rem',
        color: '#1976d2',
        letterSpacing: 1,
        fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
        textAlign: 'center',
        pb: 1
      }}>
        {event ? 'עריכת אירוע' : 'יצירת אירוע חדש'}
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, py: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם האירוע"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מיקום"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: 2,
                    }
                  }
                }}
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
      
      <DialogActions sx={{ px: 4, pb: 3, pt: 1, gap: 2 }}>
        <Button 
          onClick={onClose}
          sx={{
            borderRadius: 99,
            fontWeight: 800,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(90deg, #f5f5f7 0%, #e1e1e6 100%)',
            color: '#6e6e73',
            border: '2px solid #e1e1e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #e1e1e6 0%, #d1d1d6 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
            borderRadius: 99,
            fontWeight: 800,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
            boxShadow: '0 4px 15px rgba(0, 113, 227, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #34c759 0%, #0071e3 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0, 113, 227, 0.4)'
            }
          }}
        >
          {event ? '💾 עדכון אירוע' : '✨ יצירת אירוע'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventForm;