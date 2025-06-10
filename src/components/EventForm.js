import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button
} from '@mui/material';

function EventForm({ open, onClose, onSubmit, event }) {
  const [formData, setFormData] = useState({
    name: '',
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
        name: event?.name || '',
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
    onSubmit({
      ...formData,
      maxParticipants: formData.maxParticipants
        ? parseInt(formData.maxParticipants, 10)
        : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event ? 'עריכת אירוע' : 'אירוע חדש'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="שם האירוע"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="תאריך ושעה"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="מיקום"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="תיאור"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            type="number"
            label="מספר משתתפים מקסימלי"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="מחיר למשתתף (₪)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="סבסוד למשתתף (₪)"
            value={formData.subsidy}
            onChange={(e) => setFormData({ ...formData, subsidy: e.target.value })}
            margin="normal"
          />
          {formData.maxParticipants && formData.subsidy && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <strong>סה"כ תקציב סבסוד:</strong>{' '}
              {(parseInt(formData.maxParticipants, 10) * parseFloat(formData.subsidy || 0)).toLocaleString()} ₪
            </Box>
          )}
          <DialogActions>
            <Button onClick={onClose}>ביטול</Button>
            <Button type="submit" variant="contained">
              {event ? 'עדכון' : 'יצירה'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EventForm;