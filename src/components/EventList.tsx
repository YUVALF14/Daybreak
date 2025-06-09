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

const EventList = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    maxParticipants: ''
  });

  const handleSubmit = () => {
    if (editingEvent) {
      updateEvent(editingEvent, {
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined
      });
    } else {
      addEvent({
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined
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
      maxParticipants: event.maxParticipants?.toString() || ''
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      description: '',
      location: '',
      maxParticipants: ''
    });
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
          onClick={() => setOpenDialog(true)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingEvent ? 'עדכון' : 'יצירה'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventList; 