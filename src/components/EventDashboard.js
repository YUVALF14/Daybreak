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
  AttachMoney as MoneyIcon,
  Logout as LogoutIcon
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
  const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

  const handleLogout = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      localStorage.removeItem('adminAuthenticated');
      navigate('/');
    }
  };return (    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,154,86,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        },
        // Add CSS animations
        '@keyframes pulse': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(76,175,80,0.7)'
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(76,175,80,0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(76,175,80,0)'
          }
        },
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        }
      }}
    >
    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 3, sm: 0 }
      }}>        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 700,
                borderRadius: 4,
                px: 4,
                py: 1.5,
                background: 'rgba(255,255,255,0.95)',
                color: '#c2416b',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,1)',
                  borderColor: '#c2416b'
                }
              }}
            >
              🏠 חזרה לעמוד הבית
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                fontWeight: 700,
                borderRadius: 4,
                px: 4,
                py: 1.5,
                background: 'rgba(255,255,255,0.95)',
                color: '#d32f2f',
                border: '2px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(211,47,47,0.3)',
                  background: 'rgba(255,255,255,1)',
                  borderColor: '#d32f2f',
                  color: '#d32f2f'
                }              }}
            >
              🚪 התנתק
            </Button>
          </Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 800,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em',
            fontSize: { xs: '1.8rem', sm: '2.125rem' },
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            ✨ אירועי YJCC
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Fab 
            color="primary" 
            onClick={() => setOpenNewEventForm(true)}
            sx={{
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              boxShadow: '0 12px 30px rgba(255,154,86,0.4)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.15) rotate(90deg)',
                boxShadow: '0 20px 50px rgba(255,154,86,0.6)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)'
              }
            }}
          >
            <AddIcon sx={{ fontSize: '1.8rem' }} />
          </Fab>
        </Box>
      </Box>      {/* Premium Tabs for switching between views */}
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Paper sx={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 5,
          p: 1,
          boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <Tabs 
            value={currentView} 
            onChange={(e, newValue) => setCurrentView(newValue)}
            sx={{
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                height: 4,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(255,154,86,0.3)'
              },              '& .MuiTab-root': {
                minHeight: 60,
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '&:hover': {
                  background: 'rgba(255,154,86,0.1)',
                  transform: 'translateY(-2px)'
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(255,154,86,0.1) 0%, rgba(194,65,107,0.1) 100%)',
                  color: '#c2416b',
                  fontWeight: 800
                }
              }
            }}
          >            <Tab 
              icon={<EventIcon sx={{ fontSize: '1.5rem' }} />} 
              label="📊 תצוגת טבלה" 
              iconPosition="start"
              sx={{ 
                px: 4,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />
            <Tab 
              icon={<CalendarIcon sx={{ fontSize: '1.5rem' }} />} 
              label="📅 לוח שנה" 
              iconPosition="start"
              sx={{ 
                px: 4,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />
          </Tabs>
        </Paper>
      </Box>      {/* Premium Table View */}
      {currentView === 0 && (
        <TableContainer 
          component={Paper}
          sx={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <Table sx={{ minWidth: { xs: 800, md: 'auto' } }}>
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',                '& .MuiTableCell-head': {
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 1, sm: 2 },
                  borderBottom: 'none',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  '&:first-of-type': {
                    borderTopLeftRadius: 16
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: 16
                  }
                }
              }}>
                <TableCell>✨ שם האירוע</TableCell>
                <TableCell>📅 תאריख</TableCell>
                <TableCell>📍 מיקום</TableCell>
                <TableCell>💰 מחיר</TableCell>
                <TableCell>🎁 סבסוד</TableCell>
                <TableCell>📊 תקציב כולל</TableCell>
                <TableCell>👥 משתתפים</TableCell>
                <TableCell>⚡ פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow 
                  key={event.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(248,249,250,0.8) 100%)'
                    },
                    '&:nth-of-type(even)': {
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(233,236,239,0.6) 100%)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(255,154,86,0.1) 0%, rgba(194,65,107,0.1) 100%)',
                      transform: 'scale(1.01)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      '& .MuiTableCell-root': {
                        color: '#c2416b'
                      }
                    },                    '& .MuiTableCell-body': {
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 2 },
                      borderBottom: '1px solid rgba(255,154,86,0.1)',
                      transition: 'color 0.3s ease',
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                        boxShadow: '0 2px 8px rgba(255,154,86,0.3)'
                      }} />
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700,
                        color: '#2d3748',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        {event.title || event.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={new Date(event.date).toLocaleDateString('he-IL')}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        color: '#1976d2',
                        fontWeight: 700,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        borderRadius: 3,
                        border: '1px solid rgba(25,118,210,0.2)'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ 
                        color: '#ff9a56', 
                        fontSize: { xs: '1rem', sm: '1.2rem' } 
                      }} />
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        {event.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {event.price ? (
                      <Chip
                        label={`${event.price} CZK`}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                          color: '#2e7d32',
                          fontWeight: 700,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          borderRadius: 3,
                          border: '1px solid rgba(46,125,50,0.2)'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        חינם
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {event.subsidy ? (
                      <Chip
                        label={`${event.subsidy} CZK`}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
                          color: '#c2185b',
                          fontWeight: 700,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          borderRadius: 3,
                          border: '1px solid rgba(194,24,91,0.2)'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        ללא
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {event.maxParticipants && event.subsidy ? (
                      <Chip
                        label={`${(parseInt(event.maxParticipants) * parseFloat(event.subsidy)).toLocaleString()} CZK`}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)',
                          color: '#e65100',
                          fontWeight: 700,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          borderRadius: 3,
                          border: '1px solid rgba(230,81,0,0.2)'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ 
                        color: '#9e9e9e',
                        fontStyle: 'italic',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}>
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedEventParticipants(event);
                        setOpenParticipants(true);
                      }}
                      sx={{
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        background: 'rgba(255,255,255,0.8)',
                        borderColor: '#ff9a56',
                        color: '#c2416b',
                        px: { xs: 1, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                          color: 'white',
                          borderColor: 'transparent',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(255,154,86,0.3)'
                        }
                      }}
                      startIcon={<GroupIcon sx={{ fontSize: '1rem' }} />}
                    >
                      {event.participants?.length || 0}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton 
                        onClick={() => {
                          setSelectedEvent(event);
                          setOpenEventForm(true);
                        }}
                        sx={{
                          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                          color: '#1976d2',
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            color: 'white',
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 20px rgba(25,118,210,0.3)'
                          }
                        }}
                      >
                        <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteEvent(event.id)}
                        sx={{
                          background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
                          color: '#d32f2f',
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                            color: 'white',
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 20px rgba(211,47,47,0.3)'
                          }
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                      </IconButton>
                      <IconButton 
                        onClick={() => sendEventReminders(event)}
                        sx={{
                          background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                          color: '#25d366',
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                            color: 'white',
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 20px rgba(37,211,102,0.3)'
                          }
                        }}
                      >
                        <WhatsAppIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}      {/* Premium Calendar View */}
      {currentView === 1 && (
        <Box sx={{ 
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          p: { xs: 2, sm: 3 },
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {/* Premium Calendar Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
            borderRadius: 4,
            p: { xs: 1.5, sm: 2 },
            color: 'white',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            boxShadow: '0 8px 25px rgba(255,154,86,0.3)'
          }}>
            <Button 
              onClick={() => navigateMonth(-1)}
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                order: { xs: 1, sm: 0 },
                borderRadius: 3,
                px: 3,
                py: 1,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '&:hover': { 
                  background: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              חודש קודם
            </Button>
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              order: { xs: 0, sm: 1 },
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
                borderRadius: 3,
                px: 3,
                py: 1,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '&:hover': { 
                  background: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)'
                }
              }}            >
              חודש הבא
            </Button>
          </Box>

          {/* Calendar Grid */}
          <Grid container spacing={1}>            {/* Premium Day Headers */}
            {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day, index) => (
              <Grid item xs={12/7} key={index}>
                <Box sx={{ 
                  textAlign: 'center', 
                  fontWeight: 800, 
                  p: 1,
                  background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                  color: 'white',
                  borderRadius: 3,
                  mb: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  boxShadow: '0 4px 12px rgba(255,154,86,0.3)'
                }}>
                  {day}
                </Box>
              </Grid>
            ))}
            
            {/* Premium Calendar Days */}
            {getDaysInMonth().map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (                <Grid item xs={12/7} key={index}>
                  <Card sx={{ 
                    height: { xs: 80, sm: 120 },
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isCurrentMonth ? 1 : 0.4,
                    background: isToday 
                      ? 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)' 
                      : dayEvents.length > 0 
                        ? 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)'
                        : 'rgba(255,255,255,0.9)',
                    color: (isToday || dayEvents.length > 0) ? 'white' : '#2d3748',
                    borderRadius: 3,
                    border: '1px solid rgba(255,154,86,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'scale(1.05) translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                      background: isToday 
                        ? 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)'
                        : dayEvents.length > 0 
                          ? 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)'
                          : 'linear-gradient(135deg, rgba(255,154,86,0.1) 0%, rgba(194,65,107,0.1) 100%)',
                      borderColor: 'rgba(255,154,86,0.3)'
                    }
                  }}
                  onClick={() => openCalendarEventDialog(date)}>
                    <CardContent sx={{ p: { xs: 0.5, sm: 1 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 800, 
                        textAlign: 'center',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: (isToday || dayEvents.length > 0) ? 'white' : '#2d3748',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        textShadow: (isToday || dayEvents.length > 0) ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
                      }}>
                        {date.getDate()}
                      </Typography>
                        <Box sx={{ flex: 1, overflow: 'hidden', mt: 0.5 }}>
                        {dayEvents.slice(0, 1).map((event, eventIndex) => (                          <Chip
                            key={eventIndex}
                            label={event.title || event.name}
                            size="small"
                            sx={{
                              mb: 0.5,
                              maxWidth: '100%',
                              height: { xs: 20, sm: 24 },
                              fontSize: { xs: '0.7rem', sm: '0.8rem' },
                              background: 'rgba(255,255,255,0.95)',
                              color: '#1976d2',
                              fontWeight: 600,
                              '& .MuiChip-label': {
                                px: { xs: 0.75, sm: 1.25 },
                                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                              }
                            }}
                          />
                        ))}
                        {/* Show second event only on larger screens */}
                        {dayEvents.length > 1 && (
                          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>                            <Chip
                              label={dayEvents[1].title || dayEvents[1].name}
                              size="small"
                              sx={{
                                mb: 0.5,
                                maxWidth: '100%',
                                height: 24,
                                fontSize: '0.8rem',
                                background: 'rgba(255,255,255,0.95)',
                                color: '#1976d2',
                                fontWeight: 600,
                                '& .MuiChip-label': {
                                  px: 1.25,
                                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                                }
                              }}
                            />
                          </Box>
                        )}
                        {/* Show "more" indicator */}
                        {((dayEvents.length > 1)) && (                          <Typography variant="caption" sx={{ 
                            display: { xs: dayEvents.length > 1 ? 'block' : 'none', sm: dayEvents.length > 2 ? 'block' : 'none' },
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: { xs: '0.6rem', sm: '0.75rem' },
                            color: (isToday || dayEvents.length > 0) ? 'rgba(255,255,255,0.8)' : '#666',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
      />      {/* Premium Budget Button for admins */}
      {isAdmin && (
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          justifyContent: 'center',
          animation: 'pulse 2s infinite' 
        }}>
          <Button
            variant="contained"
            onClick={() => setOpenBudgetForm(true)}
            sx={{
              background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: 6,
              px: { xs: 3, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              boxShadow: '0 12px 30px rgba(76,175,80,0.4)',
              textTransform: 'none',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: '0 20px 50px rgba(76,175,80,0.6)'
              },
              '&:active': {
                transform: 'translateY(-2px) scale(1.02)'
              }
            }}
            startIcon={<MoneyIcon sx={{ fontSize: '1.5rem' }} />}
          >
            💰 ניהול תקציב מתקדם
          </Button>
        </Box>
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
    </Box>
  );
}

export default EventDashboard;