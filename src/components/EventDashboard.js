import React, { useState } from 'react';
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
import NewEventForm from './NewEventForm';
import BudgetDashboard from './BudgetDashboard.js';
import { useEvents } from '../context/EventsContext';

function EventDashboard() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [openEventForm, setOpenEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [openNewEventForm, setOpenNewEventForm] = useState(false);
  const [openBudgetForm, setOpenBudgetForm] = useState(false);

  const handleAddEvent = async (newEvent) => {
    console.log('EventDashboard handleAddEvent called with:', newEvent); // DEBUG
    await addEvent({ ...newEvent, participants: newEvent.participants || [] });
    setOpenEventForm(false);
    setSnackbar({ open: true, message: 'האירוע נוצר בהצלחה' });
  };

  const handleUpdateEvent = async (updatedEvent) => {
    console.log('EventDashboard handleUpdateEvent called with:', updatedEvent); // DEBUG
    await updateEvent(updatedEvent.id, {
      ...updatedEvent,
      participants: updatedEvent.participants || [],
    });
    setOpenEventForm(false);
    setSnackbar({ open: true, message: 'האירוע עודכן בהצלחה' });
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    setSnackbar({ open: true, message: 'האירוע נמחק בהצלחה' });
  };

  const handleParticipantUpdate = async (eventId, participant) => {
    // Update the participants array for the event
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    let updatedParticipants = Array.isArray(event.participants) ? [...event.participants] : [];
    // Handle delete
    if (participant.delete) {
      updatedParticipants = updatedParticipants.filter(p => p.phone !== participant.phone);
    } else {
      const idx = updatedParticipants.findIndex(p => p.phone === participant.phone);
      if (idx > -1) {
        updatedParticipants[idx] = { ...updatedParticipants[idx], ...participant };
      } else {
        updatedParticipants.push(participant);
      }
    }
    await updateEvent(eventId, { participants: updatedParticipants });
  };

  const sendEventReminders = (event) => {
    const message = `שלום! תזכורת לאירוע "${event.title || event.name}" שיתקיים ב-${new Date(event.date).toLocaleDateString('he-IL')} ב${event.location}. נשמח לראותך!`;
    event.participants.forEach(participant => {
      if (participant.confirmed) {
        window.open(`https://wa.me/${participant.phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    });
  };

  const handleNewEvent = async (newEvent) => {
    console.log('EventDashboard handleNewEvent called with:', newEvent); // DEBUG
    await addEvent({ ...newEvent, participants: [] });
    setOpenNewEventForm(false);
    setSnackbar({ open: true, message: 'האירוע החדש נוצר בהצלחה' });
  };

  // Only show budget button for admins
  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">אירועי YJCC</Typography>
        <Box>
          {localStorage.getItem('adminAuthenticated') === 'true' && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                window.location.href = '/';
              }}
              className="admin-logout-btn"
              sx={{
                mr: 2,
                fontWeight: 700,
                borderRadius: 8,
              }}
            >
              התנתקות מנהל
            </Button>
          )}
          <Fab color="primary" onClick={() => setOpenNewEventForm(true)}>
            <AddIcon />
          </Fab>
        </Box>
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

      <NewEventForm
        open={openNewEventForm}
        onClose={() => setOpenNewEventForm(false)}
        onSubmit={handleNewEvent}
      />

      {/* Budget button for admins */}
      {isAdmin && (
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3, fontWeight: 800, borderRadius: 99 }}
          onClick={() => setOpenBudgetForm(true)}
        >
          ניהול תקציב
        </Button>
      )}
      {openBudgetForm && (
        <BudgetDashboard onBack={() => setOpenBudgetForm(false)} />
      )}

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