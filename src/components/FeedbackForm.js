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
    console.log('Feedback submitted:', { ...feedback, eventId });
    setSnackbarOpen(true);
    setFeedback({ rating: '', comments: '' });
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
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
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            שלח משוב
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="תודה על המשוב!"
        />
      </Paper>
    </Container>
  );
}

export default FeedbackForm;