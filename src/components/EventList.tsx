import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useEvents } from '../context/EventsContext';

interface FormData {
  title: string;
  date: string;
  description: string;
  location: string;
  maxParticipants: string;
  price: string;
  subsidy: string;
}

const initialFormData: FormData = {
  title: '',
  date: '',
  description: '',
  location: '',
  maxParticipants: '',
  price: '',
  subsidy: '',
};

const EventList = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.date) return;
    if (editingEvent) {
      updateEvent(editingEvent, {
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
      });
    } else {
      addEvent({
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
      });
    }
    handleClose();
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
      location: event.location,
      maxParticipants: event.maxParticipants?.toString() || '',
      price: event.price?.toString() || '',
      subsidy: event.subsidy?.toString() || '',
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingEvent(null);
    setFormData(initialFormData);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          אירועים
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingEvent(null);
            setFormData(initialFormData);
            setOpenDialog(true);
          }}
        >
          אירוע חדש 🎉
        </Button>
      </Box>

      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box>
                <Typography variant="h6">{event.title}</Typography>
                <Typography color="text.secondary">
                  {new Date(event.date).toLocaleDateString('he-IL')}
                </Typography>
                <Typography>{event.description}</Typography>
                <Typography color="text.secondary">
                  📍 {event.location}
                </Typography>
                {event.maxParticipants && (
                  <Typography color="text.secondary">
                    👥 מקסימום משתתפים: {event.maxParticipants}
                  </Typography>
                )}
                {event.price && (
                  <Typography color="text.secondary">
                    💸 מחיר למשתתף: {event.price} ₪
                  </Typography>
                )}
                {event.subsidy && (
                  <Typography color="text.secondary">
                    🏷️ סבסוד למשתתף: {event.subsidy} ₪
                  </Typography>
                )}
                {event.maxParticipants && event.subsidy && (
                  <Typography color="text.secondary">
                    💰 סה"כ תקציב סבסוד: {(parseInt(event.maxParticipants) * parseFloat(event.subsidy)).toLocaleString()} ₪
                  </Typography>
                )}
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(event)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteEvent(event.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openDialog} onClose={handleClose} fullWidth>
        <DialogTitle>
          {editingEvent ? 'עריכת אירוע' : 'יצירת אירוע חדש'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="כותרת"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="תאריך"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="תיאור"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="מיקום"
            fullWidth
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="מקסימום משתתפים"
            type="number"
            fullWidth
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
          />
          <TextField
            margin="dense"
            label="מחיר למשתתף (₪)"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="סבסוד למשתתף (₪)"
            type="number"
            fullWidth
            value={formData.subsidy}
            onChange={(e) => setFormData({ ...formData, subsidy: e.target.value })}
          />
          {formData.maxParticipants && formData.subsidy && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <strong>סה"כ תקציב סבסוד:</strong>{' '}
              {(parseInt(formData.maxParticipants) * parseFloat(formData.subsidy || '0')).toLocaleString()} ₪
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.title.trim() || !formData.date}>
            {editingEvent ? 'עדכון' : 'יצירה'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventList;