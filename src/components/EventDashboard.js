import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Fab,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import EventForm from './EventForm';
import ParticipantDialog from './ParticipantDialog';

function EventDashboard() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('yjccEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [openEventForm, setOpenEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    localStorage.setItem('yjccEvents', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [
      ...events,
      { ...newEvent, id: Date.now(), participants: [] }
    ];
    setEvents(updatedEvents);
    setOpenEventForm(false);
    setSnackbar({ open: true, message: 'האירוע נוצר בהצלחה' });
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event =>
      event.id === updatedEvent.id
        ? { ...updatedEvent, participants: event.participants || [] }
        : event
    ));
    setOpenEventForm(false);
    setSnackbar({ open: true, message: 'האירוע עודכן בהצלחה' });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSnackbar({ open: true, message: 'האירוע נמחק בהצלחה' });
  };

  const handleParticipantUpdate = (eventId, participant) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const existingParticipant = event.participants.find(p => p.phone === participant.phone);
        const updatedParticipants = existingParticipant
          ? event.participants.map(p => p.phone === participant.phone ? participant : p)
          : [...event.participants, participant];
        return { ...event, participants: updatedParticipants };
      }
      return event;
    }));
  };

  const sendEventReminders = (event) => {
    // Use event.title if that's your canonical property
    const message = `שלום! תזכורת לאירוע "${event.title || event.name}" שיתקיים ב-${new Date(event.date).toLocaleDateString('he-IL')} ב${event.location}. נשמח לראותך!`;
    event.participants.forEach(participant => {
      if (participant.confirmed) {
        window.open(`https://wa.me/${participant.phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    });
  };

  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">אירועי YJCC</Typography>
        <Fab color="primary" onClick={() => {
          setSelectedEvent(null);
          setOpenEventForm(true);
        }}>
          <AddIcon />
        </Fab>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם האירוע</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>מיקום</TableCell>
              <TableCell>מחיר למשתתף</TableCell>
              <TableCell>סבסוד למשתתף</TableCell>
              <TableCell>סה"כ תקציב סבסוד</TableCell>
              <TableCell>משתתפים</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title || event.name}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString('he-IL')}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.price ? `${event.price} CZK` : '-'}</TableCell>
                <TableCell>{event.subsidy ? `${event.subsidy} CZK` : '-'}</TableCell>
                <TableCell>
                  {event.maxParticipants && event.subsidy
                    ? `${(parseInt(event.maxParticipants) * parseFloat(event.subsidy)).toLocaleString()} CZK`
                    : '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setSelectedEventParticipants(event);
                      setOpenParticipants(true);
                    }}
                  >
                    {event.participants?.length || 0} משתתפים
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedEvent(event);
                    setOpenEventForm(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteEvent(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => sendEventReminders(event)}>
                    <WhatsAppIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EventForm
        open={openEventForm}
        onClose={() => setOpenEventForm(false)}
        onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent}
        event={selectedEvent}
      />

      <ParticipantDialog
        open={openParticipants}
        onClose={() => {
          setOpenParticipants(false);
          setSelectedEventParticipants(null);
        }}
        event={selectedEventParticipants}
        onParticipantUpdate={handleParticipantUpdate}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
}

export default EventDashboard;