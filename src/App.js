/* eslint-disable no-unused-vars */
// Remove unused import
// import FormControlLabel from '@mui/material/FormControlLabel'; // <-- Unused, remove

// Remove unused variable
// const PRICE_TYPES = ["free", "paid"]; // <-- Unused, remove
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Container,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  Close as CloseIcon,
  Assessment as AssessmentIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
} from '@mui/icons-material';
import { loadEventsFromCloud, saveEventsToCloud } from './services/database';
import { useEvents } from './context/EventsContext';
import './App.css';

// Branding colors
const YJCC_COLORS = {
  primary: '#64B5F6',
  secondary: '#90CAF9',
  accent: '#42A5F5',
  light: '#E3F2FD',
  background: '#F5F9FF',
  text: '#2C3E50',
  success: '#4CAF50',
  warning: '#FFA726',
};

const YJCCLogo = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontFamily: 'Heebo',
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '2.5rem' },
        background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 2,
        letterSpacing: '-0.02em',
      }}
    >
      YJCC Events
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Assistant',
        fontWeight: 500,
        color: YJCC_COLORS.text,
        letterSpacing: '0.02em',
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        lineHeight: 1.4,
      }}
    >
      הקהילה הישראלית הצעירה בפראג 🌟
    </Typography>
  </Box>
);

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    maxParticipants: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [statsData, setStatsData] = useState(null);

  // Sync events with cloud on mount and when events change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const cloudEvents = await loadEventsFromCloud();
        // Merge or replace as needed
        // setEvents(cloudEvents); // If you want to replace local events
      } catch (error) {
        setSnackbar({ open: true, message: 'שגיאה בטעינת אירועים מהענן', severity: 'error' });
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Update stats when events change
    setStatsData(calculateEventStats(events));
  }, [events]);

  const handleDialogOpen = (event = null) => {
    setEditingEvent(event);
    setFormData(
      event
        ? {
            title: event.title,
            date: event.date,
            description: event.description,
            location: event.location,
            maxParticipants: event.maxParticipants?.toString() || '',
          }
        : {
            title: '',
            date: '',
            description: '',
            location: '',
            maxParticipants: '',
          }
    );
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      description: '',
      location: '',
      maxParticipants: '',
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      maxParticipants: formData.maxParticipants
        ? parseInt(formData.maxParticipants, 10)
        : undefined,
      updatedAt: new Date().toISOString(),
    };
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      setSnackbar({ open: true, message: 'האירוע עודכן בהצלחה', severity: 'success' });
    } else {
      addEvent({ ...eventData, createdAt: new Date().toISOString() });
      setSnackbar({ open: true, message: 'האירוע נוצר בהצלחה', severity: 'success' });
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את האירוע?')) {
      deleteEvent(id);
      setSnackbar({ open: true, message: 'האירוע נמחק', severity: 'info' });
    }
  };

  const handleSyncWithCloud = async () => {
    setIsSyncing(true);
    try {
      await saveEventsToCloud(events);
      setSnackbar({ open: true, message: 'הנתונים סונכרנו לענן!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'שגיאה בסנכרון לענן', severity: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  // Example stats calculation
  function calculateEventStats(events) {
    return {
      total: events.length,
      upcoming: events.filter(e => new Date(e.date) >= new Date()).length,
      past: events.filter(e => new Date(e.date) < new Date()).length,
    };
  }

  return (
    <Container>
      <YJCCLogo />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          אירוע חדש
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={handleSyncWithCloud}
          disabled={isSyncing}
        >
          סנכרון לענן
        </Button>
      </Box>

      {/* Event List */}
      {events.map(event => (
        <Paper key={event.id} sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">{event.title}</Typography>
              <Typography color="text.secondary">
                {new Date(event.date).toLocaleDateString('he-IL')}
              </Typography>
              <Typography>{event.description}</Typography>
              <Typography color="text.secondary">📍 {event.location}</Typography>
              {event.maxParticipants && (
                <Typography color="text.secondary">
                  👥 מקסימום משתתפים: {event.maxParticipants}
                </Typography>
              )}
            </Box>
            <Box>
              <IconButton onClick={() => handleDialogOpen(event)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(event.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}

      {/* Event Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>{editingEvent ? 'עריכת אירוע' : 'יצירת אירוע חדש'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="כותרת"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="datetime-local"
              label="תאריך ושעה"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="מיקום"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="תיאור"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              type="number"
              label="מספר משתתפים מקסימלי"
              value={formData.maxParticipants}
              onChange={e => setFormData({ ...formData, maxParticipants: e.target.value })}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleDialogClose}>ביטול</Button>
              <Button type="submit" variant="contained">
                {editingEvent ? 'עדכון' : 'יצירה'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      {statsData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            <AssessmentIcon sx={{ mr: 1 }} />
            סטטיסטיקות
          </Typography>
          <Typography>סה"כ אירועים: {statsData.total}</Typography>
          <Typography>אירועים קרובים: {statsData.upcoming}</Typography>
          <Typography>אירועים קודמים: {statsData.past}</Typography>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          style: {
            backgroundColor:
              snackbar.severity === 'success'
                ? YJCC_COLORS.success
                : snackbar.severity === 'error'
                ? '#d32f2f'
                : YJCC_COLORS.primary,
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
}

export default App;