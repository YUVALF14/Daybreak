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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants, 10) : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
    });
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>יצירת אירוע חדש</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם האירוע"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="מיקום"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
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
              />
            </Grid>
          </Grid>
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={onClose}>ביטול</Button>
            <Button type="submit" variant="contained">צור אירוע</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NewEventForm;
