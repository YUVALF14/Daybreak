import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { useEvents } from '../context/EventsContext';
import { useNavigate } from 'react-router-dom';

const CommunityEvents = () => {
  const { events } = useEvents();
  const navigate = useNavigate();

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box sx={{
      maxWidth: 700,
      mx: 'auto',
      mt: { xs: 2, sm: 6 },
      mb: { xs: 2, sm: 6 },
      p: { xs: 1, sm: 4 },
      background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
      borderRadius: { xs: 3, sm: 6 },
      boxShadow: { xs: 3, sm: 6 },
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 0.7s',
    }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#1976d2', letterSpacing: 1, textShadow: '0 2px 12px #90caf9' }}>
        אירועי קהילה פתוחים
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: '#2C3E50', opacity: 0.85 }}>
        כאן תוכלו לצפות בכל האירועים הקרובים שנפתחו על ידי המנהל
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        {upcomingEvents.length === 0 && (
          <Typography color="text.secondary">אין אירועים קרובים כרגע.</Typography>
        )}
        {upcomingEvents.map(event => (
          <Card key={event.id} sx={{ background: '#fff', borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {event.title}
              </Typography>
              <Typography color="text.secondary">
                {new Date(event.date).toLocaleDateString('he-IL')}
              </Typography>
              <Typography color="text.secondary">
                📍 {event.location}
              </Typography>
              {event.price && (
                <Typography color="text.secondary">
                  💸 מחיר: {event.price} CZK
                </Typography>
              )}
              <Typography color="text.secondary">
                {event.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 4, borderRadius: 8, fontWeight: 700 }}
        onClick={() => navigate('/')}
      >
        חזרה לדף הבית
      </Button>
    </Box>
  );
};

export default CommunityEvents;
