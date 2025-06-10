import React from 'react';
import { Box, Typography } from '@mui/material';

const Login = () => (
  <Box sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
      התחברות לחשבון קיים
    </Typography>
    <Typography variant="body1">
      כאן תוכל להתחבר למערכת. (ממשק התחברות יתווסף בקרוב)
    </Typography>
  </Box>
);

export default Login;
