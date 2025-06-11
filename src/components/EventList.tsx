import React, { useState, ChangeEvent } from 'react';
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
  Chip,
  Tooltip,
  Fade,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useEvents } from '../context/EventsContext';
import FeedbackForm from './FeedbackForm';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [feedbackOpen, setFeedbackOpen] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add state for registration dialog
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [registerEventId, setRegisterEventId] = useState<string | null>(null);
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '' });
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Open dialog for new event
  const handleOpenDialog = () => {
    setEditingEvent(null);
    setFormData(initialFormData);
    setOpenDialog(true);
    setError(null);
  };

  // Close dialog and reset state
  const handleClose = () => {
    setOpenDialog(false);
    setEditingEvent(null);
    setFormData(initialFormData);
    setError(null);
  };

  // Submit handler for both create and edit
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.title.trim() || !formData.date) {
      setError('נא למלא כותרת ותאריך');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent, {
          ...formData,
          maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
          price: formData.price ? parseFloat(formData.price) : undefined,
          subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
        });
      } else {
        await addEvent({
          title: formData.title,
          date: formData.date,
          description: formData.description,
          location: formData.location,
          maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
          price: formData.price ? parseFloat(formData.price) : undefined,
          subsidy: formData.subsidy ? parseFloat(formData.subsidy) : undefined,
          participants: [],
        });
      }
      setSubmitting(false);
      handleClose();
    } catch (e) {
      setError('אירעה שגיאה ביצירת האירוע');
      setSubmitting(false);
    }
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

  const handleOpenFeedback = (eventId: string) => {
    setFeedbackOpen((prev: string[]) => [...prev, eventId]);
  };

  const handleCloseFeedback = (eventId: string) => {
    setFeedbackOpen((prev: string[]) => prev.filter((id: string) => id !== eventId));
  };

  // Registration handler
  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.phone) {
      setRegisterError('נא למלא שם ומספר טלפון');
      return;
    }
    if (!/^05\d{8}$/.test(registerForm.phone)) {
      setRegisterError('מספר טלפון לא תקין');
      return;
    }
    setRegisterError(null);
    setRegisterSuccess(false);
    const event = events.find(e => e.id === registerEventId);
    if (!event) return;
    // Prevent duplicate
    if (event.participants?.some(p => p.phone === registerForm.phone)) {
      setRegisterError('משתתף עם מספר טלפון זה כבר רשום לאירוע');
      return;
    }
    const updatedParticipants = [...(event.participants || []), { ...registerForm, paid: false, confirmed: false, attended: false }];
    await updateEvent(event.id, { ...event, participants: updatedParticipants });
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterDialogOpen(false);
      setRegisterForm({ name: '', phone: '' });
      setRegisterSuccess(false);
    }, 1200);
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 0 } }}>
      {/* Add a subtle fade-in animation */}
      <Fade in timeout={700}>
        <Box>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            mb: 3,
            gap: { xs: 2, sm: 4 }
          }}>
            <Typography variant="h4" component="h1" sx={{
              textAlign: 'center',
              flexGrow: 1,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
              color: '#1d1d1f',
              fontSize: { xs: '2rem', sm: '2.4rem' },
              mb: { xs: 1, sm: 0 }
            }}>
              אירועים
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                mt: { xs: 1, sm: 0 },
                ml: { xs: 0, sm: 2 },
                borderRadius: 99,
                fontWeight: 700,
                fontSize: '1.08rem',
                px: 4,
                py: 1.5,
                boxShadow: 2,
                background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              startIcon={<EventIcon />}
            >
              אירוע חדש 🎉
            </Button>
          </Box>

          {events.map((event: any) => (
            <Card key={event.id} sx={{
              mb: 2,
              borderRadius: { xs: 2, sm: 4 },
              px: { xs: 1, sm: 2 },
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
              animation: 'fadeIn 0.7s',
              position: 'relative'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon color="primary" sx={{ mr: 0.5 }} />
                      {event.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon fontSize="small" sx={{ opacity: 0.7 }} />
                      {new Date(event.date).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PlaceIcon fontSize="small" sx={{ opacity: 0.7 }} />
                      {event.location}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {event.maxParticipants && (
                        <Chip
                          icon={<PeopleIcon />}
                          label={`מקסימום: ${event.maxParticipants}`}
                          color="info"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                      {event.price && (
                        <Chip
                          icon={<MonetizationOnIcon />}
                          label={`מחיר: ${event.price} CZK`}
                          color="success"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                      {event.subsidy && (
                        <Chip
                          label={`סבסוד: ${event.subsidy} CZK`}
                          color="secondary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                    </Box>
                    {event.description && (
                      <Typography sx={{ mt: 1, color: '#6e6e73', fontSize: '1rem' }}>
                        {event.description}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Tooltip title="ערוך אירוע">
                      <IconButton onClick={() => handleEdit(event)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="מחק אירוע">
                      <IconButton onClick={() => deleteEvent(event.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Feedback button */}
                    <Tooltip title="משוב">
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        sx={{ mt: 1, width: { xs: '100%', sm: 'auto' } }}
                        onClick={() => handleOpenFeedback(event.id)}
                      >
                        משוב
                      </Button>
                    </Tooltip>
                    <Dialog
                      open={feedbackOpen.includes(event.id)}
                      onClose={() => handleCloseFeedback(event.id)}
                      maxWidth="sm"
                      fullWidth
                    >
                      <DialogTitle>משוב על האירוע: {event.title}</DialogTitle>
                      <DialogContent>
                        <FeedbackForm eventId={event.id} />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleCloseFeedback(event.id)}>סגור</Button>
                      </DialogActions>
                    </Dialog>
                    {/* Registration button */}
                    <Tooltip title="הרשמה לאירוע">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 1, width: { xs: '100%', sm: 'auto' }, borderRadius: 99 }}
                        onClick={() => { setRegisterEventId(event.id); setRegisterDialogOpen(true); }}
                      >
                        הרשמה
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 0 }}>
              <Button
                onClick={handleClose}
                color="inherit"
                startIcon={<ArrowBackIcon />}
                sx={{
                  minWidth: 0,
                  px: 1,
                  position: 'relative',
                  right: 0,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: 99,
                  ml: 2,
                }}
                aria-label="חזור"
              >
                חזור
              </Button>
              <Box sx={{ flexGrow: 1, textAlign: 'center', pr: 4 }}>
                {editingEvent ? 'עריכת אירוע' : 'יצירת אירוע חדש'}
              </Box>
            </DialogTitle>
            <DialogContent>
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="כותרת"
                  fullWidth
                  value={formData.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <TextField
                  margin="dense"
                  label="תאריך"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <TextField
                  margin="dense"
                  label="תיאור"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="מיקום"
                  fullWidth
                  value={formData.location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="מקסימום משתתפים"
                  type="number"
                  fullWidth
                  value={formData.maxParticipants}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, maxParticipants: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="מחיר למשתתף (CZK)"
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, price: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="סבסוד למשתתף (CZK)"
                  type="number"
                  fullWidth
                  value={formData.subsidy}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subsidy: e.target.value })}
                />
                {formData.maxParticipants && formData.subsidy && (
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <strong>סה"כ תקציב סבסוד:</strong>{' '}
                    {Number(formData.maxParticipants) * Number(formData.subsidy) > 0
                      ? (Number(formData.maxParticipants) * Number(formData.subsidy)).toLocaleString()
                      : 0} CZK
                  </Box>
                )}
                <DialogActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    sx={{ minWidth: 120, fontWeight: 700, borderRadius: 99 }}
                  >
                    {submitting
                      ? (editingEvent ? 'מעדכן...' : 'יוצר...')
                      : (editingEvent ? 'עדכון' : 'יצירה')}
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Registration dialog */}
          <Dialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>הרשמה לאירוע</DialogTitle>
            <DialogContent>
              <TextField
                label="שם מלא"
                fullWidth
                margin="normal"
                value={registerForm.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterForm({ ...registerForm, name: e.target.value })}
              />
              <TextField
                label="מספר טלפון"
                fullWidth
                margin="normal"
                value={registerForm.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterForm({ ...registerForm, phone: e.target.value })}
              />
              {registerError && <Typography color="error">{registerError}</Typography>}
              {registerSuccess && <Typography color="success.main">נרשמת בהצלחה!</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRegisterDialogOpen(false)}>ביטול</Button>
              <Button onClick={handleRegister} variant="contained">הרשמה</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Box>
  );
};

export default EventList;