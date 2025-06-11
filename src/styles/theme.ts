import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#0071e3', // Apple blue
      light: '#eaf6ff',
      dark: '#005bb5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f5f5f7', // Apple light gray
      light: '#ffffff',
      dark: '#e1e1e6',
      contrastText: '#222',
    },
    background: {
      default: '#f5f5f7',
      paper: '#fff',
    },
    info: {
      main: '#0071e3',
      light: '#eaf6ff',
      dark: '#005bb5',
    },
    success: {
      main: '#34c759',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
  },
  typography: {
    fontFamily: 'SF Pro Display, Assistant, Heebo, Roboto, sans-serif',
    h1: {
      fontSize: '2.7rem',
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: '2.1rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.7rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1.08rem',
      lineHeight: 1.7,
      color: '#1d1d1f',
    },
    button: {
      fontWeight: 700,
      fontSize: '1.08rem',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,113,227,0.07)',
          padding: '12px 32px',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
          '&:hover': {
            background: '#eaf6ff',
            color: '#0071e3',
            boxShadow: '0 4px 16px rgba(0,113,227,0.12)',
            transform: 'translateY(-2px) scale(1.03)',
          },
          '&.Mui-disabled': {
            background: '#e1e1e6',
            color: '#b0b0b5',
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #0071e3 60%, #34c759 100%)',
          color: '#fff',
        },
        outlined: {
          border: '2px solid #0071e3',
          color: '#0071e3',
          background: '#fff',
          '&:hover': {
            background: '#eaf6ff',
            borderColor: '#005bb5',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            '& fieldset': {
              borderColor: '#e1e1e6',
            },
            '&:hover fieldset': {
              borderColor: '#0071e3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0071e3',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          background: '#fff',
          padding: '24px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #f5f5f7 0%, #fff 100%)',
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          padding: '40px 24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.95)',
          color: '#1d1d1f',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginBottom: 8,
          '&.Mui-selected, &.Mui-selected:hover': {
            background: '#eaf6ff',
            color: '#0071e3',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          padding: '32px 24px',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#e1e1e6',
          '&.Mui-active': {
            color: '#0071e3',
          },
          '&.Mui-completed': {
            color: '#34c759',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#0071e3',
          '&.Mui-checked': {
            color: '#34c759',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#0071e3',
          '&.Mui-checked': {
            color: '#34c759',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#e1e1e6',
          '&.Mui-checked': {
            color: '#34c759',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#b7f7c1',
          },
        },
        track: {
          backgroundColor: '#e1e1e6',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#0071e3',
          height: 4,
          borderRadius: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1.08rem',
          color: '#6e6e73',
          '&.Mui-selected': {
            color: '#0071e3',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          background: '#eaf6ff',
          color: '#0071e3',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#eaf6ff',
          color: '#0071e3',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          background: '#0071e3',
          color: '#fff',
          fontWeight: 600,
        },
      },
    },
    // ...add more as needed for your app...
  },
});