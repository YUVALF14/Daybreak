import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
      light: '#64B5F6',
      dark: '#1565c0',
    },
    secondary: {
      main: '#42A5F5',
      light: '#90CAF9',
      dark: '#1976d2',
    },
    background: {
      default: '#E3F2FD',
      paper: '#FFFFFF',
    },
    info: {
      main: '#64B5F6',
      light: '#E3F2FD',
      dark: '#1976d2',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: 'Assistant, Heebo, Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(25, 118, 210, 0.08)',
        },
      },
    },
  },
});