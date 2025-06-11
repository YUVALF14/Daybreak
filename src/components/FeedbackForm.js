import React, { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Snackbar } from '@mui/material';

function FeedbackForm({ eventId }) {
  const [feedback, setFeedback] = useState({
    rating: '',
    comments: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    setSnackbarOpen(true);
    setFeedback({ rating: '', comments: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
      <Paper sx={{
        p: 5,
        mt: 4,
        borderRadius: 7,
        boxShadow: 8,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
        border: '2.5px solid #e3f2fd',
        animation: 'fadeIn 0.7s',
      }}>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: 900,
          color: '#1976d2',
          letterSpacing: 1,
          fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
        }}>
          משוב אירוע
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="דירוג (1-5)"
            type="number"
            value={feedback.rating}
            onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
            inputProps={{ min: 1, max: 5 }}
            margin="normal"
            required
            sx={{ borderRadius: 3, background: '#f5f5f7' }}
          />
          <TextField
            fullWidth
            label="הערות"
            multiline
            rows={4}
            value={feedback.comments}
            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
            margin="normal"
            required
            sx={{ borderRadius: 3, background: '#f5f5f7' }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              fontWeight: 800,
              fontSize: '1.1rem',
              borderRadius: 99,
              background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
              letterSpacing: 1,
              boxShadow: 2,
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(90deg, #34c759 0%, #0071e3 100%)',
                boxShadow: 4,
              }
            }}
          >
            שלח משוב
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="תודה על המשוב!"
          ContentProps={{
            sx: {
              fontWeight: 800,
              fontSize: '1.1rem',
              borderRadius: 3,
              background: 'linear-gradient(90deg, #eaf6ff 0%, #e3f2fd 100%)',
              color: '#1976d2',
              boxShadow: 2,
            }
          }}
        />
      </Paper>
    </Container>
  );
}

export default FeedbackForm;