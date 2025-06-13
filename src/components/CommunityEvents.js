import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Fade } from '@mui/material';
import { PersonAdd, Event } from '@mui/icons-material';
import { useEvents } from '../context/EventsContext';
import EventRegistrationDialog from './EventRegistrationDialog';

const CommunityEvents = () => {
  const { events, updateEvent } = useEvents();
  const [registrationDialog, setRegistrationDialog] = useState({ open: false, event: null });

  const upcomingEvents = events
    .filter(e => {
      if (!e.date) return false;
      return new Date(e.date) >= new Date();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleRegister = async (eventId, participant) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const updatedParticipants = [...(event.participants || []), participant];
    await updateEvent(eventId, { participants: updatedParticipants });
  };

  const openRegistration = (event) => {
    setRegistrationDialog({ open: true, event });
  };

  const closeRegistration = () => {
    setRegistrationDialog({ open: false, event: null });
  };

  React.useEffect(() => {
    console.log('CommunityEvents events array:', events); // DEBUG
    console.log('CommunityEvents upcomingEvents:', upcomingEvents); // DEBUG
  }, [events, upcomingEvents]);

  return (
    <Fade in timeout={800}>
      <Box sx={{
        maxWidth: 720,
        mx: 'auto',
        mt: { xs: 2, sm: 6 },
        mb: { xs: 2, sm: 6 },
        p: { xs: 1, sm: 4 },
        background: 'radial-gradient(ellipse at 80% 10%, #e3f2fd 0%, #fff 80%)',
        borderRadius: { xs: 6, sm: 14 },
        boxShadow: { xs: 4, sm: 12 },
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2.5px solid #e3f2fd',
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 900,
          mb: 2,
          color: '#1976d2',
          letterSpacing: 1,
          textShadow: '0 2px 16px #90caf9',
          fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
          userSelect: 'none',
        }}>
          אירועי קהילה פתוחים
        </Typography>
        <Typography variant="subtitle1" sx={{
          mb: 3,
          color: '#2C3E50',
          opacity: 0.85,
          fontWeight: 600,
          fontSize: '1.18rem',
          fontFamily: 'Assistant, Heebo, sans-serif',
        }}>
          כאן תוכלו לצפות בכל האירועים הקרובים ולהירשם אליהם
        </Typography>
        <Stack spacing={3} sx={{ width: '100%' }}>
          {upcomingEvents.length === 0 && (
            <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
          )}          {upcomingEvents.map((event, index) => (
            <Card key={event.id} sx={{
              background: 'linear-gradient(135deg, #ede7f6 0%, #e3f2fd 100%)',
              borderRadius: 7,
              boxShadow: 6,
              border: '2px solid #e3f2fd',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              animation: `fadeInUp 0.6s ease-out ${0.2 + (index * 0.1)}s forwards`,
              '&:hover': {
                boxShadow: 20,
                transform: 'translateY(-8px) scale(1.02)',
                '&::before': {
                  opacity: 1
                }
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }
            }}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box flex={1}>
                      <Typography variant="h6" sx={{
                        fontWeight: 900,
                        color: '#1976d2',
                        fontFamily: 'SF Pro Display',
                        letterSpacing: 1,
                        mb: 1
                      }}>
                        <Event sx={{ mr: 1, verticalAlign: 'middle' }} />
                        {event.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ 
                        fontFamily: 'Assistant', 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        📅 {new Date(event.date).toLocaleDateString('he-IL')}
                      </Typography>
                      <Typography color="text.secondary" sx={{ 
                        fontFamily: 'Assistant', 
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        📍 {event.location}
                      </Typography>
                      {event.price && (
                        <Typography color="text.secondary" sx={{ 
                          fontFamily: 'Assistant', 
                          fontWeight: 500,
                          mb: 0.5
                        }}>
                          💰 מחיר: {event.price} CZK
                        </Typography>
                      )}
                      <Typography color="text.secondary" sx={{ 
                        fontFamily: 'Assistant', 
                        fontWeight: 400,
                        mt: 1
                      }}>
                        {event.description}
                      </Typography>
                      {event.participants && event.participants.length > 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          mt: 1,
                          fontWeight: 600
                        }}>
                          👥 {event.participants.length} נרשמים
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openRegistration(event)}
                      startIcon={<PersonAdd />}
                      sx={{
                        ml: 2,
                        borderRadius: 3,
                        fontWeight: 700,
                        px: 3,
                        py: 1.5,
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        }
                      }}
                    >
                      הרשמה
                    </Button>
                  </Box>                </CardContent>
              </Card>
          ))}
        </Stack>
        
        <EventRegistrationDialog
          open={registrationDialog.open}
          onClose={closeRegistration}
          event={registrationDialog.event}
          onRegister={handleRegister}
        />
      </Box>
    </Fade>
  );
};

export default CommunityEvents;
