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
          <Card sx={{ height: '100%', background: 'linear-gradient(90deg, #ede7f6 0%, #e3f2fd 100%)', borderRadius: 5, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#7c4dff', fontWeight: 800 }}>
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
                sx={{ mt: 2, borderRadius: 99, fontWeight: 700, borderColor: '#7c4dff', color: '#7c4dff' }}
                aria-label="לכל האירועים"
              >
                לכל האירועים
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: 'linear-gradient(90deg, #e3f2fd 0%, #ede7f6 100%)', borderRadius: 5, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 800 }}>
                פעולות מהירות 🚀
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/events')}
                  aria-label="יצירת אירוע חדש"
                  sx={{ borderRadius: 99, fontWeight: 700, background: 'linear-gradient(90deg, #7c4dff 0%, #1976d2 100%)' }}
                >
                  יצירת אירוע חדש
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/participants')}
                  aria-label="הוספת משתתף"
                  sx={{ borderRadius: 99, fontWeight: 700, background: 'linear-gradient(90deg, #00bcd4 0%, #7c4dff 100%)' }}
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