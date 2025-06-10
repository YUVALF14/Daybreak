import React from 'react';
import { Box, Typography } from '@mui/material';

const Signup = () => (
  <Box sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
      יצירת חשבון חדש
    </Typography>
    <Typography variant="body1">
      כאן תוכל להירשם ולהצטרף למערכת. (ממשק הרשמה יתווסף בקרוב)
    </Typography>
  </Box>
);

export default Signup;
