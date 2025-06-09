import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { events } = useEvents();

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        ברוכים הבאים ל-DAYBREAK 🌅
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                אירועים קרובים ✨
              </Typography>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <Box key={event.id} sx={{ mb: 2 }}>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography color="text.secondary">
                      {new Date(event.date).toLocaleDateString('he-IL')}
                    </Typography>
                    <Typography>📍 {event.location}</Typography>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  אין אירועים קרובים כרגע
                </Typography>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/events')}
                sx={{ mt: 2 }}
              >
                לכל האירועים
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                פעולות מהירות 🚀
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/events')}
                >
                  יצירת אירוע חדש
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/participants')}
                >
                  הוספת משתתף
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 