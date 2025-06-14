import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Container, Grid, Chip } from '@mui/material';
import { PersonAdd, Event, WhatsApp, AccessTime, LocationOn, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventRegistrationDialog from './EventRegistrationDialog';

const CommunityEvents = () => {
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();
  const [registrationDialog, setRegistrationDialog] = useState({ open: false, event: null });
  const upcomingEvents = events
    .filter(e => {
      if (!e || !e.date) return false;
      try {
        return new Date(e.date) >= new Date();
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.date) - new Date(b.date);
      } catch {
        return 0;
      }
    });
  const handleRegister = async (eventId, participant) => {
    if (!eventId || !participant) return;
    
    const event = events.find(e => e && e.id === eventId);
    if (!event) return;
    
    try {
      const updatedParticipants = [...(event.participants || []), participant];
      await updateEvent(eventId, { participants: updatedParticipants });
    } catch (error) {
      console.error('Error registering participant:', error);
    }
  };

  const openRegistration = (event) => {
    setRegistrationDialog({ open: true, event });
  };

  const closeRegistration = () => {
    setRegistrationDialog({ open: false, event: null });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'תאריך לא צוין';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'שעה לא צוינה';
    return timeString;
  };

  return (    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
      position: 'relative',
      overflow: 'hidden',
      direction: 'rtl',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          animation: 'fadeInUp 0.6s ease-out'
        }}>          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              }
            }}
          >
            חזור לעמוד הבית
          </Button>          <Button
            variant="contained"
            endIcon={<WhatsApp />}
            onClick={() => window.open('https://wa.me/972507123456', '_blank')}
            sx={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(37, 211, 102, 0.4)',
              }
            }}
          >
            צור קשר 📱
          </Button>
        </Box>        {/* Title */}        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 900,
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
            color: '#1a252f',
            textShadow: '0 4px 12px rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 1px 4px rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 4,
            p: 3,
            border: '3px solid rgba(255,255,255,0.4)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
            backdropFilter: 'blur(15px)',
            letterSpacing: '0.5px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          🎉 האירועים הקהילתיים שלנו
        </Typography>

        {/* Events Grid */}
        {upcomingEvents.length === 0 ? (
          <Card sx={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 4,
            boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
            textAlign: 'center',
            py: 8,
            animation: 'fadeInUp 1s ease-out 0.4s both',
          }}>
            <CardContent>
              <Event sx={{ fontSize: 80, color: 'rgba(255,255,255,0.7)', mb: 2 }} />
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                אין אירועים קרובים
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                כרגע אין אירועים מתוכננים. חזרו בקרוב לעדכונים!
              </Typography>
            </CardContent>
          </Card>
        ) : (          <Grid container spacing={3}>
            {upcomingEvents.map((event, index) => {
              if (!event || !event.id) return null;
              
              return (
                <Grid item xs={12} md={6} lg={4} key={event.id}>
                  <Card sx={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 4,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: `fadeInUp 1s ease-out ${0.4 + index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
                    background: 'rgba(255,255,255,0.2)',
                  }
                }}>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>                    {/* Event Title */}
                    <Typography variant="h5" sx={{ 
                      color: '#1a252f', 
                      fontWeight: 800, 
                      mb: 2,
                      textAlign: 'center',
                      textShadow: '0 2px 8px rgba(255,255,255,0.5), 0 1px 4px rgba(0,0,0,0.8)',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: 2,
                      p: 1.5,
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}>
                      {event.name || event.title}
                    </Typography>

                    {/* Event Details */}
                    <Stack spacing={2} sx={{ flex: 1, mb: 3 }}>                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
                        <AccessTime sx={{ color: '#1a252f', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ 
                          color: '#1a252f', 
                          fontWeight: 700,
                          textShadow: '0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.6)',
                          background: 'rgba(255,255,255,0.7)',
                          borderRadius: 1,
                          px: 1,
                          py: 0.5
                        }}>
                          {formatDate(event.date)} • {formatTime(event.time)}
                        </Typography>
                      </Box>{event.location && (                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
                          <LocationOn sx={{ color: '#1a252f', fontSize: 20 }} />
                          <Typography variant="body2" sx={{ 
                            color: '#1a252f', 
                            fontWeight: 700,
                            textShadow: '0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.6)',
                            background: 'rgba(255,255,255,0.7)',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5
                          }}>
                            {event.location}
                          </Typography>
                        </Box>
                      )}                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
                        <Group sx={{ color: '#1a252f', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ 
                          color: '#1a252f', 
                          fontWeight: 700,
                          textShadow: '0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.6)',
                          background: 'rgba(255,255,255,0.7)',
                          borderRadius: 1,
                          px: 1,
                          py: 0.5
                        }}>
                          {event.participants?.length || 0} נרשמו
                        </Typography>
                        {event.maxParticipants && (
                          <Chip
                            label={`מקסימום: ${event.maxParticipants}`}
                            size="small"
                            sx={{ 
                              background: 'rgba(26,37,47,0.9)',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }}
                          />
                        )}
                      </Box>                      {event.description && (
                        <Typography variant="body2" sx={{ 
                          color: '#1a252f',
                          lineHeight: 1.6,
                          textAlign: 'right',
                          fontWeight: 600,
                          textShadow: '0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.6)',
                          background: 'rgba(255,255,255,0.8)',
                          borderRadius: 2,
                          p: 1.5,
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                          {event.description}
                        </Typography>
                      )}
                    </Stack>

                    {/* Registration Button */}                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<PersonAdd />}
                      onClick={() => openRegistration(event)}
                      disabled={event.maxParticipants && event.participants?.length >= event.maxParticipants}
                      sx={{
                        background: event.maxParticipants && event.participants?.length >= event.maxParticipants 
                          ? 'rgba(255,255,255,0.3)' 
                          : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                        color: 'white',
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 700,
                        boxShadow: '0 8px 32px rgba(255,107,107,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover:not(:disabled)': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(255,107,107,0.4)',
                        },
                        '&:disabled': {
                          color: 'rgba(255,255,255,0.6)',
                          cursor: 'not-allowed'
                        }
                      }}
                    >
                      {event.maxParticipants && event.participants?.length >= event.maxParticipants 
                        ? 'האירוע מלא 🚫' 
                        : 'הרשמה לאירוע ✨'}
                    </Button></CardContent>
                </Card>
              </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* Registration Dialog */}
      <EventRegistrationDialog
        open={registrationDialog.open}
        event={registrationDialog.event}
        onClose={closeRegistration}
        onRegister={handleRegister}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }      `}</style>
    </Box>
  );
};

export default CommunityEvents;
