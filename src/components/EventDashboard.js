import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Grid,  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import EventForm from './EventForm';
import ParticipantDialog from './ParticipantDialog';
import NewEventForm from './NewEventForm';
import BudgetDashboard from './BudgetDashboard';
import { useEvents } from '../context/EventsContext';

function EventDashboard() {
  const navigate = useNavigate();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [openEventForm, setOpenEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [openNewEventForm, setOpenNewEventForm] = useState(false);
  const [openBudgetForm, setOpenBudgetForm] = useState(false);
  const [currentView, setCurrentView] = useState(0); // 0 = table, 1 = calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDialog, setCalendarDialog] = useState({ open: false, date: null });
  const [newCalendarEvent, setNewCalendarEvent] = useState({
    title: '',
    type: 'community',
    date: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: '',
    subsidy: '',
    price: ''
  });

  // Calendar helper functions
  const getCurrentMonth = () => {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  };
  const getDaysInMonth = () => {
    const startOfMonth = getCurrentMonth();
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getMonthName = (date) => {
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const navigateMonth = (direction) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const openCalendarEventDialog = (date) => {
    setNewCalendarEvent({
      ...newCalendarEvent,
      date: date.toISOString().split('T')[0]
    });
    setCalendarDialog({ open: true, date });
  };

  const handleCalendarEventSubmit = async () => {
    try {
      await addEvent({
        ...newCalendarEvent,
        participants: []
      });
      setCalendarDialog({ open: false, date: null });
      setNewCalendarEvent({
        title: '',
        type: 'community',
        date: '',
        time: '',
        location: '',
        description: '',
        maxParticipants: '',
        subsidy: '',
        price: ''
      });
      setSnackbar({ open: true, message: 'האירוע נוסף ללוח השנה בהצלחה' });
    } catch (error) {
      setSnackbar({ open: true, message: 'שגיאה בהוספת האירוע' });
    }
  };

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
  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 3,
              py: 1,
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(255,154,86,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(255,154,86,0.4)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                border: 'none'
              }
            }}
          >
            חזרה לעמוד הבית
          </Button>
          <Typography variant="h4" sx={{ 
            fontWeight: 900,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 1
          }}>
            אירועי YJCC
          </Typography>
        </Box>          <Box>
            <Fab 
              color="primary" 
              onClick={() => setOpenNewEventForm(true)}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1) rotate(90deg)',
                  boxShadow: '0 8px 20px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              <AddIcon />
            </Fab>
          </Box>        </Box>

      {/* Tabs for switching between table and calendar view */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={currentView} 
          onChange={(e, newValue) => setCurrentView(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              height: 3,
              borderRadius: 2
            }
          }}
        >
          <Tab 
            icon={<EventIcon />} 
            label="תצוגת טבלה" 
            sx={{ 
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 700
              }
            }}
          />
          <Tab 
            icon={<CalendarIcon />} 
            label="לוח שנה" 
            sx={{ 
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 700
              }
            }}
          />
        </Tabs>
      </Box>

      {/* Table View */}
      {currentView === 0 && (
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
            ))}          </TableBody>
        </Table>
      </TableContainer>
      )}      {/* Calendar View */}
      {currentView === 1 && (
        <Box sx={{ 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 4,
          p: { xs: 2, sm: 3 },
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          {/* Calendar Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            borderRadius: 3,
            p: { xs: 1.5, sm: 2 },
            color: 'white',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}>
            <Button 
              onClick={() => navigateMonth(-1)}
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                order: { xs: 1, sm: 0 },
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              חודש קודם
            </Button>
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              order: { xs: 0, sm: 1 },
              textAlign: 'center'
            }}>
              {getMonthName(selectedDate)}
            </Typography>
            <Button 
              onClick={() => navigateMonth(1)}
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                order: { xs: 2, sm: 2 },
                '&:hover': { background: 'rgba(255,255,255,0.1)' }
              }}
            >
              חודש הבא
            </Button>
          </Box>

          {/* Calendar Grid */}
          <Grid container spacing={1}>
            {/* Day Headers */}
            {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day, index) => (
              <Grid item xs={12/7} key={index}>
                <Box sx={{ 
                  textAlign: 'center', 
                  fontWeight: 700, 
                  p: 1,
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                  color: 'white',
                  borderRadius: 2,
                  mb: 1
                }}>
                  {day}
                </Box>
              </Grid>
            ))}
            
            {/* Calendar Days */}
            {getDaysInMonth().map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (                <Grid item xs={12/7} key={index}>
                  <Card sx={{ 
                    height: { xs: 80, sm: 120 },
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isCurrentMonth ? 1 : 0.4,
                    background: isToday 
                      ? 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)' 
                      : dayEvents.length > 0 
                        ? 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)'
                        : 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
                    color: (isToday || dayEvents.length > 0) ? 'white' : 'inherit',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      background: isToday 
                        ? 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)'
                        : dayEvents.length > 0 
                          ? 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)'
                          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                    }
                  }}
                  onClick={() => openCalendarEventDialog(date)}>
                    <CardContent sx={{ p: { xs: 0.5, sm: 1 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                        textAlign: 'center',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: (isToday || dayEvents.length > 0) ? 'white' : '#1976d2'
                      }}>
                        {date.getDate()}
                      </Typography>
                        <Box sx={{ flex: 1, overflow: 'hidden', mt: 0.5 }}>
                        {dayEvents.slice(0, 1).map((event, eventIndex) => (
                          <Chip
                            key={eventIndex}
                            label={event.title || event.name}
                            size="small"
                            sx={{
                              mb: 0.5,
                              maxWidth: '100%',
                              height: { xs: 16, sm: 20 },
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              background: 'rgba(255,255,255,0.9)',
                              color: '#1976d2',
                              fontWeight: 600,
                              '& .MuiChip-label': {
                                px: { xs: 0.5, sm: 1 }
                              }
                            }}
                          />
                        ))}
                        {/* Show second event only on larger screens */}
                        {dayEvents.length > 1 && (
                          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Chip
                              label={dayEvents[1].title || dayEvents[1].name}
                              size="small"
                              sx={{
                                mb: 0.5,
                                maxWidth: '100%',
                                height: 20,
                                fontSize: '0.7rem',
                                background: 'rgba(255,255,255,0.9)',
                                color: '#1976d2',
                                fontWeight: 600,
                                '& .MuiChip-label': {
                                  px: 1
                                }
                              }}
                            />
                          </Box>
                        )}
                        {/* Show "more" indicator */}
                        {((dayEvents.length > 1)) && (
                          <Typography variant="caption" sx={{ 
                            display: { xs: dayEvents.length > 1 ? 'block' : 'none', sm: dayEvents.length > 2 ? 'block' : 'none' },
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: { xs: '0.6rem', sm: '0.75rem' },
                            color: (isToday || dayEvents.length > 0) ? 'rgba(255,255,255,0.8)' : '#666'
                          }}>
                            +{dayEvents.length - 1} {dayEvents.length > 2 ? 'נוספים' : ''}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

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
        <BudgetDashboard onBack={() => setOpenBudgetForm(false)} />      )}

      {/* Calendar Event Dialog */}
      <Dialog 
        open={calendarDialog.open} 
        onClose={() => setCalendarDialog({ open: false, date: null })}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            boxShadow: '0 20px 60px rgba(25,118,210,0.3)'
          }
        }}
      >        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          m: -3,
          mb: 3,
          p: 3,
          borderRadius: '16px 16px 0 0'
        }}>
          <CalendarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          הוספת אירוע ללוח השנה
          {calendarDialog.date && (
            <Typography variant="subtitle1" sx={{ fontWeight: 600, opacity: 0.9, mt: 1 }}>
              {calendarDialog.date.toLocaleDateString('he-IL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם האירוע"
                value={newCalendarEvent.title}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, title: e.target.value }))}
                sx={{ 
                  '& .MuiOutlinedInput-root': { borderRadius: 3 },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="סוג האירוע"
                value={newCalendarEvent.type}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, type: e.target.value }))}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              >
                <MenuItem value="community">אירוע קהילתי</MenuItem>
                <MenuItem value="workshop">סדנה</MenuItem>
                <MenuItem value="meeting">פגישה</MenuItem>
                <MenuItem value="celebration">חגיגה</MenuItem>
                <MenuItem value="sports">ספורט</MenuItem>
                <MenuItem value="cultural">תרבות</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="שעה"
                type="time"
                value={newCalendarEvent.time}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, time: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="מיקום"
                value={newCalendarEvent.location}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, location: e.target.value }))}
                InputProps={{
                  startAdornment: <LocationIcon sx={{ color: '#1976d2', mr: 1 }} />
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="תיאור האירוע"
                value={newCalendarEvent.description}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, description: e.target.value }))}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="מקסימום משתתפים"
                type="number"
                value={newCalendarEvent.maxParticipants}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, maxParticipants: e.target.value }))}
                InputProps={{
                  startAdornment: <GroupIcon sx={{ color: '#1976d2', mr: 1 }} />
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="מחיר (CZK)"
                type="number"
                value={newCalendarEvent.price}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, price: e.target.value }))}
                InputProps={{
                  startAdornment: <MoneyIcon sx={{ color: '#1976d2', mr: 1 }} />
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="סבסוד (CZK)"
                type="number"
                value={newCalendarEvent.subsidy}
                onChange={(e) => setNewCalendarEvent(prev => ({ ...prev, subsidy: e.target.value }))}
                InputProps={{
                  startAdornment: <MoneyIcon sx={{ color: '#1976d2', mr: 1 }} />
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button 
            onClick={() => setCalendarDialog({ open: false, date: null })}
            variant="outlined"
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              '&:hover': {
                borderColor: '#1565c0',
                background: 'rgba(25,118,210,0.05)',
              }
            }}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleCalendarEventSubmit}
            variant="contained"
            disabled={!newCalendarEvent.title}
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              fontWeight: 700,
              borderRadius: 3,
              px: 4,
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
              }
            }}
          >
            <CalendarIcon sx={{ mr: 1 }} />
            הוסף אירוע
          </Button>
        </DialogActions>
      </Dialog>

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
          </IconButton>        }        />
      </Container>
  );
}

export default EventDashboard;