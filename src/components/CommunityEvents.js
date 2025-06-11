import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { useEvents } from '../context/EventsContext';
import { useNavigate } from 'react-router-dom';

const CommunityEvents = () => {
  const { events } = useEvents();
  const navigate = useNavigate();

  const upcomingEvents = events
    .filter(e => {
      if (!e.date) return false;
      return new Date(e.date) >= new Date();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  React.useEffect(() => {
    console.log('CommunityEvents upcomingEvents:', upcomingEvents);
  }, [upcomingEvents]);

  return (
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
      animation: 'fadeIn 0.7s',
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
        כאן תוכלו לצפות בכל האירועים הקרובים שנפתחו על ידי המנהל
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        {upcomingEvents.length === 0 && (
          <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
        )}
        {upcomingEvents.map(event => (
          <Card key={event.id} sx={{
            background: 'linear-gradient(90deg, #ede7f6 0%, #e3f2fd 100%)',
            borderRadius: 7,
            boxShadow: 6,
            border: '2px solid #e3f2fd',
            transition: 'box-shadow 0.2s, transform 0.2s',
            '&:hover': {
              boxShadow: 12,
              transform: 'scale(1.025)',
            }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{
                fontWeight: 900,
                color: '#1976d2',
                fontFamily: 'SF Pro Display',
                letterSpacing: 1,
              }}>
                {event.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 700 }}>
                {new Date(event.date).toLocaleDateString('he-IL')}
              </Typography>
              <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 500 }}>
                📍 {event.location}
              </Typography>
              {event.price && (
                <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 500 }}>
                  💸 מחיר: {event.price} CZK
                </Typography>
              )}
              <Typography color="text.secondary" sx={{ fontFamily: 'Assistant', fontWeight: 400 }}>
                {event.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          mt: 4,
          borderRadius: 99,
          fontWeight: 800,
          fontSize: '1.1rem',
          px: 5,
          py: 1.5,
          boxShadow: 2,
          letterSpacing: 1,
          background: 'linear-gradient(90deg, #eaf6ff 0%, #f5f5f7 100%)',
          color: '#0071e3',
          border: '2px solid #0071e3',
          transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
          '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: '0 6px 32px 0 #0071e355',
            background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
          },
        }}
        onClick={() => navigate('/')}
      >
        חזרה לדף הבית
      </Button>
    </Box>
  );
};

export default CommunityEvents;
