/* eslint-disable no-unused-vars */
// Remove unused import
// import FormControlLabel from '@mui/material/FormControlLabel'; // <-- Unused, remove

// Remove unused variable
// const PRICE_TYPES = ["free", "paid"]; // <-- Unused, remove
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import {
  CssBaseline,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Rating,
  Snackbar,
  CircularProgress,
  Slide,
  Fade,
  Grow,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Alert,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  LockOutlined as LockOutlinedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  RateReview as RateReviewIcon,
  ExitToApp as ExitToAppIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  Share as ShareIcon,
  CalendarToday as CalendarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  GridView as GridViewIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  Assessment as AssessmentIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
import './App.css';

// Create rtl cache with specific configuration
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
});

// Add YJCC branding colors and logo component
const YJCC_COLORS = {
  primary: '#64B5F6',    // Light Blue
  secondary: '#90CAF9',  // Lighter Blue
  accent: '#42A5F5',     // Medium Blue
  light: '#E3F2FD',      // Very Light Blue
  background: '#F5F9FF', // Almost White Blue
  text: '#2C3E50',       // Dark Blue Gray
  success: '#4CAF50',
  warning: '#FFA726',
};

const YJCCLogo = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontFamily: 'Heebo',
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '2.5rem' },
        background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 2,
        letterSpacing: '-0.02em',
      }}
    >
      YJCC Events
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Assistant',
        fontWeight: 500,
        color: YJCC_COLORS.text,
        letterSpacing: '0.02em',
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        lineHeight: 1.4,
      }}
    >
      הקהילה הישראלית הצעירה בפראג 🌟
    </Typography>
  </Box>
);

// Custom Snackbar component with animation
const CustomSnackbar = ({ open, message, onClose, severity = 'success' }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    TransitionComponent={props => <Slide {...props} direction="up" />}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: '100%',
        fontFamily: 'Assistant',
        '& .MuiAlert-message': {
          fontSize: '1rem',
        },
      }}
      elevation={6}
      variant="filled"
    >
      {message}
    </Alert>
  </Snackbar>
);

// Theme configuration
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      light: YJCC_COLORS.light,
      main: YJCC_COLORS.primary,
      dark: YJCC_COLORS.accent,
    },
    secondary: {
      light: YJCC_COLORS.light,
      main: YJCC_COLORS.secondary,
      dark: YJCC_COLORS.accent,
    },
    background: {
      default: YJCC_COLORS.background,
      paper: '#FFFFFF',
    },
    text: {
      primary: YJCC_COLORS.text,
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: 'Assistant, sans-serif',
    fontSize: 16,
    h1: { fontFamily: 'Assistant, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'Assistant, sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'Assistant, sans-serif', fontWeight: 600 },
    h4: { fontFamily: 'Assistant, sans-serif', fontWeight: 600 },
    h5: { fontFamily: 'Assistant, sans-serif', fontWeight: 600 },
    h6: { fontFamily: 'Assistant, sans-serif', fontWeight: 600 },
    body1: { fontFamily: 'Assistant, sans-serif' },
    body2: { fontFamily: 'Assistant, sans-serif' },
    button: { fontFamily: 'Assistant, sans-serif', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&display=swap');
        
        body {
          direction: rtl;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, ${YJCC_COLORS.light} 0%, #FFFFFF 100%);
          min-height: 100vh;
          font-family: 'Assistant', sans-serif !important;
        }

        * {
          font-family: 'Assistant', sans-serif !important;
        }
      `,
    },
    MuiTable: {
      styleOverrides: {
        root: {
          direction: 'rtl',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'right',
          fontFamily: 'Assistant, sans-serif',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          direction: 'rtl',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          direction: 'rtl',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          direction: 'rtl',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Assistant, sans-serif',
          right: 16,
          left: 'auto',
          transformOrigin: 'right',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Assistant, sans-serif',
          textAlign: 'right',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(100, 181, 246, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(100, 181, 246, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1.1rem',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
            color: '#FFFFFF',
            '&:hover': {
              background: `linear-gradient(45deg, ${YJCC_COLORS.secondary}, ${YJCC_COLORS.accent})`,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
            '&.Mui-focused': {
              boxShadow: `0 4px 20px rgba(255, 142, 83, 0.15)`,
            },
          },
        },
      },
    },
  },
});

// Constants
const ADMIN_CODE = '291147';

// Add new price type constants
const PRICE_TYPES = {
  REGULAR: 'regular',
  DISCOUNT: 'discount',
  FULL_SUBSIDY_EXPLAIN: 'full_subsidy_explain',
  FULL_SUBSIDY_STAFF: 'full_subsidy_staff'
};

// Add budget constants
const BUDGET_TYPES = {
  FULL: 'full',
  SUBSIDIZED: 'subsidized',
  EXPENSES: 'expenses'
};

// Add custom styled components for form elements
const StyledFormContainer = styled(Box)(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(3),
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  '& .MuiInputBase-root': {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 12px rgba(100, 181, 246, 0.1)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(100, 181, 246, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'Assistant',
    fontSize: '1.1rem',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Assistant',
    fontSize: '1.1rem',
    padding: '16px',
    '&::placeholder': {
      fontStyle: 'italic',
      opacity: 0.7,
    },
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'Assistant',
    fontSize: '0.9rem',
    marginTop: '4px',
    transition: 'opacity 0.3s ease',
    opacity: 0.8,
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(2),
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(100, 181, 246, 0.15)',
  },
  '& .MuiDialogTitle-root': {
    background: 'linear-gradient(45deg, #64B5F6, #42A5F5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Heebo',
    fontWeight: 700,
    fontSize: '1.75rem',
    textAlign: 'center',
    padding: theme.spacing(3, 2),
    borderBottom: '2px solid rgba(100, 181, 246, 0.1)',
    marginBottom: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2, 3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
    borderTop: '2px solid rgba(100, 181, 246, 0.1)',
    marginTop: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontFamily: 'Assistant',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&.MuiButton-contained': {
    background: 'linear-gradient(45deg, #64B5F6, #42A5F5)',
    boxShadow: '0 4px 12px rgba(100, 181, 246, 0.2)',
    '&:hover': {
      background: 'linear-gradient(45deg, #42A5F5, #1E88E5)',
      boxShadow: '0 6px 16px rgba(100, 181, 246, 0.3)',
      transform: 'translateY(-2px)',
    },
  },
  '&.MuiButton-text': {
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'rgba(100, 181, 246, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  background: 'linear-gradient(45deg, #25D366, #128C7E)',
  color: '#FFFFFF',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #128C7E, #075E54)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 16px rgba(37, 211, 102, 0.3)',
  },
}));

// AdminLogin Component
function AdminLogin({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError(true);
    }
  };

  return (
    <Fade in timeout={800}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
          }}
          className="page-enter"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
            <Grow in timeout={600}>
              <LockOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            </Grow>
            <Typography 
              component="h1" 
              variant="h5"
              sx={{
                fontFamily: 'Heebo',
                fontWeight: 600,
                letterSpacing: '0.02em',
                mb: 3,
                color: 'text.primary',
              }}
            >
              כניסת מנהל YJCC
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="קוד מנהל"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                error={error}
                helperText={error ? 'קוד שגוי' : ''}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontFamily: 'Assistant',
                    fontSize: '1.1rem',
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: 'Assistant',
                    fontSize: '1.1rem',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontFamily: 'Assistant',
                  fontWeight: 600,
                }}
                className="submit-button"
              >
                כניסה
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
}

// Add FeedbackDialog component
const FeedbackDialog = ({ open, onClose, event }) => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem(`feedbacks_${event?.id}`);
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const getFeedbackStats = () => {
    if (!feedbacks.length) return { avg: 0, count: 0 };
    const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return {
      avg: (sum / feedbacks.length).toFixed(1),
      count: feedbacks.length
    };
  };

  const stats = getFeedbackStats();

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">משובים - {event?.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={parseFloat(stats.avg)} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({stats.avg}) {stats.count} משובים
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {feedbacks.length > 0 ? (
          <List>
            {feedbacks.map((feedback, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderBottom: index < feedbacks.length - 1 ? '1px solid #E0E0E0' : 'none'
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {new Date(feedback.date).toLocaleDateString('he-IL')}
                  </Typography>
                  <Rating value={feedback.rating} readOnly size="small" />
                </Box>
                <Typography variant="body1">{feedback.comment}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              עדיין אין משובים לאירוע זה
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
};

// Add statistics utilities
const calculateEventStats = (events) => {
  const now = new Date();
  const stats = {
    totalEvents: events.length,
    upcomingEvents: 0,
    pastEvents: 0,
    totalParticipants: 0,
    averageAttendance: 0,
    mostPopularLocation: '',
    locationStats: {},
    monthlyStats: {},
    participationRate: 0,
  };

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const participants = event.participants?.length || 0;
    
    // Count events
    if (eventDate > now) {
      stats.upcomingEvents++;
    } else {
      stats.pastEvents++;
    }

    // Track participants
    stats.totalParticipants += participants;

    // Location stats
    stats.locationStats[event.location] = (stats.locationStats[event.location] || 0) + 1;

    // Monthly stats
    const monthKey = eventDate.toLocaleString('he-IL', { month: 'long', year: 'numeric' });
    if (!stats.monthlyStats[monthKey]) {
      stats.monthlyStats[monthKey] = { events: 0, participants: 0 };
    }
    stats.monthlyStats[monthKey].events++;
    stats.monthlyStats[monthKey].participants += participants;
  });

  // Calculate averages and most popular location
  stats.averageAttendance = stats.totalParticipants / events.length;
  stats.mostPopularLocation = Object.entries(stats.locationStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '';
  
  // Calculate participation rate
  const eventsWithMax = events.filter(e => e.maxParticipants);
  if (eventsWithMax.length > 0) {
    const totalCapacity = eventsWithMax.reduce((sum, event) => sum + parseInt(event.maxParticipants), 0);
    const actualParticipants = eventsWithMax.reduce((sum, event) => sum + (event.participants?.length || 0), 0);
    stats.participationRate = (actualParticipants / totalCapacity) * 100;
  }

  return stats;
};

// Add budget calculation utilities
const calculateEventBudget = (event) => {
  const budget = {
    totalIncome: 0,
    totalExpenses: 0,
    totalSubsidy: 0,
    profitLoss: 0,
    averageCostPerParticipant: 0
  };

  if (!event.participants) return budget;

  // Calculate income
  event.participants.forEach(participant => {
    if (participant.priceType === PRICE_TYPES.REGULAR) {
      budget.totalIncome += Number(event.price) || 0;
    } else if (participant.priceType === PRICE_TYPES.DISCOUNT) {
      budget.totalIncome += (Number(event.price) * 0.7) || 0; // 30% discount
      budget.totalSubsidy += (Number(event.price) * 0.3) || 0;
    } else if ([PRICE_TYPES.FULL_SUBSIDY_EXPLAIN, PRICE_TYPES.FULL_SUBSIDY_STAFF].includes(participant.priceType)) {
      budget.totalSubsidy += Number(event.price) || 0;
    }
  });

  // Calculate expenses
  const fixedExpenses = Number(event.budget?.fixedExpenses) || 0;
  const variableExpenses = (Number(event.budget?.variableExpenses) || 0) * (event.participants.length || 0);
  budget.totalExpenses = fixedExpenses + variableExpenses;

  // Calculate profit/loss
  budget.profitLoss = budget.totalIncome - budget.totalExpenses;

  // Calculate average cost per participant
  if (event.participants.length > 0) {
    budget.averageCostPerParticipant = budget.totalExpenses / event.participants.length;
  }

  return budget;
};

// EventDashboard Component
function EventDashboard({ onLogout }) {
  const [events, setEvents] = useState(() => loadFromLocalStorage('yjccEvents', []));
  const [openDialog, setOpenDialog] = useState(false);
  const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedParticipantEvent, setSelectedParticipantEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'upcoming', 'past'
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    price: '',
    maxParticipants: '',
    description: '',
    budget: {
      fullPrice: '',        // מחיר מלא למשתתף
      subsidyAmount: '',    // גובה הסבסוד למשתתף
      fixedExpenses: '',    // הוצאות קבועות
      variableExpenses: '', // הוצאות משתנות פר משתתף
      notes: ''            // הערות לגבי התקציב
    }
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [participantFormData, setParticipantFormData] = useState({
    name: '',
    phone: '',
    email: '',
    priceType: PRICE_TYPES.REGULAR,
    notes: ''
  });
  const [showStats, setShowStats] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'error'

  // Filter events based on search and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const eventDate = new Date(event.date);
    const now = new Date();
    
    switch (filterStatus) {
      case 'upcoming':
        return matchesSearch && eventDate > now;
      case 'past':
        return matchesSearch && eventDate <= now;
      default:
        return matchesSearch;
    }
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        name: selectedEvent.name || '',
        date: selectedEvent.date || '',
        location: selectedEvent.location || '',
        price: selectedEvent.price || '',
        maxParticipants: selectedEvent.maxParticipants || '',
        description: selectedEvent.description || '',
        budget: {
          fullPrice: selectedEvent.budget?.fullPrice || '',
          subsidyAmount: selectedEvent.budget?.subsidyAmount || '',
          fixedExpenses: selectedEvent.budget?.fixedExpenses || '',
          variableExpenses: selectedEvent.budget?.variableExpenses || '',
          notes: selectedEvent.budget?.notes || ''
        }
      });
    }
  }, [selectedEvent]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage('yjccEvents', events);
  }, [events]);

  useEffect(() => {
    setStatsData(calculateEventStats(events));
  }, [events]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.date || !formData.location) {
      setSnackbar({
        open: true,
        message: 'נא למלא את כל השדות הנדרשים',
        severity: 'error'
      });
      return;
    }

    const eventData = {
      ...formData,
      participants: [],
      budget: {
        ...formData.budget,
        fullPrice: Number(formData.budget.fullPrice) || 0,
        subsidyAmount: Number(formData.budget.subsidyAmount) || 0,
        fixedExpenses: Number(formData.budget.fixedExpenses) || 0,
        variableExpenses: Number(formData.budget.variableExpenses) || 0,
      }
    };

    if (selectedEvent) {
      // Update existing event while preserving participants
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData, participants: event.participants || [] }
          : event
      );
      setEvents(updatedEvents);
      saveToLocalStorage('yjccEvents', updatedEvents);
      setSnackbar({
        open: true,
        message: 'האירוע עודכן בהצלחה',
        severity: 'success'
      });
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Date.now(),
        participants: [],
        createdAt: new Date().toISOString(),
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveToLocalStorage('yjccEvents', updatedEvents);
      setSnackbar({
        open: true,
        message: `האירוע "${eventData.name}" נוצר בהצלחה! 🎉`,
        severity: 'success'
      });
    }
    
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      name: '',
      date: '',
      location: '',
      price: '',
      maxParticipants: '',
      description: '',
      budget: {
        fullPrice: '',
        subsidyAmount: '',
        fixedExpenses: '',
        variableExpenses: '',
        notes: ''
      }
    });
  };

  const handleParticipantFormChange = (e) => {
    const { name, value } = e.target;
    setParticipantFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParticipantSubmit = () => {
    if (!participantFormData.name || !participantFormData.phone) {
      setSnackbar({
        open: true,
        message: 'נא למלא שם וטלפון',
        severity: 'error'
      });
      return;
    }

    const newParticipant = {
      ...participantFormData,
      id: Date.now(),
      registeredAt: new Date().toISOString(),
      paid: false,
      confirmed: false,
      attended: false
    };

    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === selectedParticipantEvent.id
          ? {
              ...event,
              participants: [...(event.participants || []), newParticipant]
            }
          : event
      )
    );

    setParticipantFormData({
      name: '',
      phone: '',
      email: '',
      priceType: PRICE_TYPES.REGULAR,
      notes: ''
    });

    setSnackbar({
      open: true,
      message: 'המשתתף נוסף בהצלחה! 🎉',
      severity: 'success'
    });
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSnackbar({ open: true, message: 'האירוע נמחק בהצלחה' });
  };

  const handleParticipantUpdate = (eventId, participant) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const existingParticipantIndex = event.participants.findIndex(p => p.phone === participant.phone);
        const updatedParticipants = existingParticipantIndex >= 0
          ? event.participants.map((p, index) => index === existingParticipantIndex ? participant : p)
          : [...event.participants, participant];
        return { ...event, participants: updatedParticipants };
      }
      return event;
    }));
  };

  // Add export/import functions
  const exportData = (format) => {
    let content;
    const fileName = `yjcc_events_${new Date().toISOString().split('T')[0]}`;

    if (format === 'json') {
      content = JSON.stringify(events, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.json`;
      link.click();
    } else if (format === 'csv') {
      const headers = ['שם האירוע', 'תאריך', 'מיקום', 'מחיר', 'משתתפים', 'מקסימום משתתפים', 'תיאור'];
      content = [
        headers.join(','),
        ...events.map(event => [
          event.name,
          event.date,
          event.location,
          event.price,
          event.participants?.length || 0,
          event.maxParticipants || '',
          event.description || ''
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.csv`;
      link.click();
    }
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedEvents = JSON.parse(e.target.result);
        if (Array.isArray(importedEvents)) {
          setEvents(importedEvents);
          saveToLocalStorage('yjccEvents', importedEvents);
          setSnackbar({
            open: true,
            message: 'הנתונים יובאו בהצלחה!',
            severity: 'success'
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'שגיאה בייבוא הנתונים',
          severity: 'error'
        });
      }
    };
    reader.readAsText(file);
  };

  // Add budget summary to statistics section
  const calculateTotalBudgetStats = (events) => {
    const stats = {
      totalIncome: 0,
      totalExpenses: 0,
      totalSubsidy: 0,
      totalProfit: 0,
      eventsBudgets: []
    };

    events.forEach(event => {
      const eventBudget = calculateEventBudget(event);
      stats.totalIncome += eventBudget.totalIncome;
      stats.totalExpenses += eventBudget.totalExpenses;
      stats.totalSubsidy += eventBudget.totalSubsidy;
      stats.totalProfit += eventBudget.profitLoss;
      stats.eventsBudgets.push({
        eventName: event.name,
        ...eventBudget
      });
    });

    return stats;
  };

  // Add budget stats to the statistics section
  const renderBudgetStats = () => {
    const budgetStats = calculateTotalBudgetStats(events);
    
    return (
      <Grid item xs={12}>
        <Paper sx={{ p: 2, background: 'rgba(144, 202, 249, 0.08)' }}>
          <Typography variant="h6" gutterBottom>סיכום תקציבי</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>
                  הכנסות כוללות: {budgetStats.totalIncome.toLocaleString()} CZK
                </Typography>
                <Typography>
                  הוצאות כוללות: {budgetStats.totalExpenses.toLocaleString()} CZK
                </Typography>
                <Typography>
                  סך הסבסוד: {budgetStats.totalSubsidy.toLocaleString()} CZK
                </Typography>
                <Typography color={budgetStats.totalProfit >= 0 ? 'success.main' : 'error.main'}>
                  רווח/הפסד: {budgetStats.totalProfit.toLocaleString()} CZK
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                פירוט לפי אירועים
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>שם האירוע</TableCell>
                      <TableCell align="right">הכנסות</TableCell>
                      <TableCell align="right">הוצאות</TableCell>
                      <TableCell align="right">סבסוד</TableCell>
                      <TableCell align="right">רווח/הפסד</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {budgetStats.eventsBudgets.map((eventBudget) => (
                      <TableRow key={eventBudget.eventName}>
                        <TableCell>{eventBudget.eventName}</TableCell>
                        <TableCell align="right">{eventBudget.totalIncome.toLocaleString()} CZK</TableCell>
                        <TableCell align="right">{eventBudget.totalExpenses.toLocaleString()} CZK</TableCell>
                        <TableCell align="right">{eventBudget.totalSubsidy.toLocaleString()} CZK</TableCell>
                        <TableCell 
                          align="right"
                          sx={{ color: eventBudget.profitLoss >= 0 ? 'success.main' : 'error.main' }}
                        >
                          {eventBudget.profitLoss.toLocaleString()} CZK
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  // Update the event dialog to include budget section
  const renderBudgetSection = () => (
    <Box sx={{ mt: 3, borderTop: 1, borderColor: 'divider', pt: 3 }}>
      <Typography variant="h6" gutterBottom>
        ניהול תקציב
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="מחיר מלא למשתתף"
            type="number"
            value={formData.budget.fullPrice}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, fullPrice: e.target.value }
            }))}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="גובה הסבסוד למשתתף"
            type="number"
            value={formData.budget.subsidyAmount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, subsidyAmount: e.target.value }
            }))}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="הוצאות קבועות"
            type="number"
            value={formData.budget.fixedExpenses}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, fixedExpenses: e.target.value }
            }))}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="הוצאות משתנות למשתתף"
            type="number"
            value={formData.budget.variableExpenses}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, variableExpenses: e.target.value }
            }))}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="הערות תקציב"
            multiline
            rows={2}
            value={formData.budget.notes}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, notes: e.target.value }
            }))}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );

  // Add sync functions
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const success = await syncDataWithFile(events);
      if (success) {
        setSnackbar({
          open: true,
          message: 'הנתונים סונכרנו בהצלחה!',
          severity: 'success'
        });
        setLastSyncTime(new Date());
      } else {
        throw new Error('Sync failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'שגיאה בסנכרון הנתונים',
        severity: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoadFromFile = async () => {
    setIsSyncing(true);
    try {
      const data = await loadDataFromFile();
      if (data) {
        setEvents(data);
        saveToLocalStorage('yjccEvents', data);
        setSnackbar({
          open: true,
          message: 'הנתונים נטענו בהצלחה!',
          severity: 'success'
        });
        setLastSyncTime(new Date());
      } else {
        throw new Error('Load failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'שגיאה בטעינת הנתונים',
        severity: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const syncWithServer = useCallback(async () => {
    if (syncStatus === 'syncing') return;
    
    setSyncStatus('syncing');
    try {
      // Get latest data from server
      const response = await fetch('/api/events.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const serverData = await response.json();
      
      // Compare server data with local data
      const localData = loadFromLocalStorage('yjccEvents', []);
      const mergedData = mergeEventsData(serverData, localData);
      
      // Update server if there are local changes
      if (JSON.stringify(mergedData) !== JSON.stringify(serverData)) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(mergedData, null, 2));
        
        const syncResponse = await fetch('/api/sync', {
          method: 'POST',
          body: formData
        });
        
        if (!syncResponse.ok) {
          throw new Error('Failed to sync data');
        }
      }
      
      // Update local state and storage
      setEvents(mergedData);
      saveToLocalStorage('yjccEvents', mergedData);
      setLastSyncTime(new Date());
      setSyncStatus('idle');
    } catch (error) {
      console.error('Error syncing with server:', error);
      setSyncStatus('error');
    }
  }, [syncStatus]); // Add syncStatus as dependency

  // Add periodic sync
  useEffect(() => {
    const syncInterval = setInterval(syncWithServer, 30000); // Sync every 30 seconds
    return () => clearInterval(syncInterval);
  }, [syncWithServer]); // Add syncWithServer as dependency

  // Add sync on mount
  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]); // Add syncWithServer as dependency

  // Add merge function to handle conflicts
  const mergeEventsData = (serverData, localData) => {
    const mergedMap = new Map();
    
    // Add all server data first
    serverData.forEach(event => {
      mergedMap.set(event.id, event);
    });
    
    // Merge local data, keeping the most recent version based on timestamps
    localData.forEach(localEvent => {
      const serverEvent = mergedMap.get(localEvent.id);
      if (!serverEvent || new Date(localEvent.updatedAt) > new Date(serverEvent.updatedAt)) {
        mergedMap.set(localEvent.id, localEvent);
      }
    });
    
    return Array.from(mergedMap.values());
  };

  return (
    <Container dir="rtl">
      {/* Header with Search, Filter and Logout */}
      <Box sx={{ 
        my: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 600, 
          textAlign: { xs: 'center', md: 'right' },
          background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          אירועי YJCC
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Search Box */}
          <TextField
            size="small"
            placeholder="חיפוש אירועים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ minWidth: 200 }}
          />

          {/* Filter Button */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              startAdornment={<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />}
            >
              <MenuItem value="all">כל האירועים</MenuItem>
              <MenuItem value="upcoming">אירועים עתידיים</MenuItem>
              <MenuItem value="past">אירועים שהסתיימו</MenuItem>
            </Select>
          </FormControl>

          {/* Add Event Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(45deg, ${YJCC_COLORS.secondary}, ${YJCC_COLORS.accent})`,
              }
            }}
          >
            אירוע חדש
          </Button>

          {/* Logout Button */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={onLogout}
            startIcon={<ExitToAppIcon />}
            sx={{
              borderColor: YJCC_COLORS.text,
              color: YJCC_COLORS.text,
              '&:hover': {
                borderColor: YJCC_COLORS.primary,
                color: YJCC_COLORS.primary,
                backgroundColor: 'rgba(255, 142, 83, 0.1)',
              }
            }}
          >
            יציאה
          </Button>
        </Box>
      </Box>

      {/* Update Data Management and Stats Buttons */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={isSyncing ? <CircularProgress size={20} /> : <SyncIcon />}
          onClick={handleSync}
          disabled={isSyncing}
        >
          סנכרון נתונים
        </Button>
        <Button
          variant="outlined"
          startIcon={isSyncing ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
          onClick={handleLoadFromFile}
          disabled={isSyncing}
        >
          טען נתונים מהשרת
        </Button>
        {lastSyncTime && (
          <Typography variant="caption" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            סנכרון אחרון: {new Date(lastSyncTime).toLocaleString('he-IL')}
          </Typography>
        )}
        <Button
          variant="outlined"
          startIcon={<CloudDownloadIcon />}
          onClick={() => exportData('json')}
        >
          ייצוא נתונים (JSON)
        </Button>
        <Button
          variant="outlined"
          startIcon={<CloudDownloadIcon />}
          onClick={() => exportData('csv')}
        >
          ייצוא לאקסל
        </Button>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          ייבוא נתונים
          <input
            type="file"
            hidden
            accept=".json"
            onChange={importData}
          />
        </Button>
        <Button
          variant="outlined"
          startIcon={<AssessmentIcon />}
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? 'הסתר סטטיסטיקות' : 'הצג סטטיסטיקות'}
        </Button>
      </Box>

      {/* Statistics Section */}
      {showStats && statsData && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BarChartIcon /> סטטיסטיקות
          </Typography>
          
          <Grid container spacing={3}>
            {/* General Stats */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, background: `linear-gradient(135deg, ${YJCC_COLORS.light}, rgba(144, 202, 249, 0.2))` }}>
                <Typography variant="h6" gutterBottom>נתונים כלליים</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography>סה"כ אירועים: {statsData.totalEvents}</Typography>
                  <Typography>אירועים עתידיים: {statsData.upcomingEvents}</Typography>
                  <Typography>אירועים שהסתיימו: {statsData.pastEvents}</Typography>
                  <Typography>סה"כ משתתפים: {statsData.totalParticipants}</Typography>
                  <Typography>ממוצע משתתפים: {statsData.averageAttendance.toFixed(1)}</Typography>
                  <Typography>אחוז תפוסה: {statsData.participationRate.toFixed(1)}%</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Location Stats */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, background: 'rgba(144, 202, 249, 0.1)' }}>
                <Typography variant="h6" gutterBottom>סטטיסטיקת מיקומים</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography>המיקום הפופולרי ביותר: {statsData.mostPopularLocation}</Typography>
                  {Object.entries(statsData.locationStats).map(([location, count]) => (
                    <Box key={location} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>{location}:</Typography>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <Box
                          sx={{
                            width: `${(count / statsData.totalEvents) * 100}%`,
                            height: '100%',
                            bgcolor: YJCC_COLORS.primary,
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                      <Typography>{count} אירועים</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Monthly Stats */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, background: 'rgba(144, 202, 249, 0.05)' }}>
                <Typography variant="h6" gutterBottom>סטטיסטיקה חודשית</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Object.entries(statsData.monthlyStats).map(([month, data]) => (
                    <Box key={month}>
                      <Typography variant="subtitle1">{month}</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">אירועים:</Typography>
                          <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'background.paper', borderRadius: 1 }}>
                            <Box
                              sx={{
                                width: `${(data.events / statsData.totalEvents) * 100}%`,
                                height: '100%',
                                bgcolor: YJCC_COLORS.primary,
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                          <Typography variant="body2">{data.events}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">משתתפים:</Typography>
                          <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'background.paper', borderRadius: 1 }}>
                            <Box
                              sx={{
                                width: `${(data.participants / statsData.totalParticipants) * 100}%`,
                                height: '100%',
                                bgcolor: YJCC_COLORS.secondary,
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                          <Typography variant="body2">{data.participants}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Add Budget Stats */}
          {renderBudgetStats()}
        </Paper>
      )}

      {/* Events Summary */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          background: `linear-gradient(135deg, ${YJCC_COLORS.primary}15, ${YJCC_COLORS.secondary}15)`,
        }}>
          <Typography variant="h6">סה"כ אירועים</Typography>
          <Typography variant="h4">{events.length}</Typography>
        </Paper>
        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          background: 'rgba(100, 181, 246, 0.1)',
        }}>
          <Typography variant="h6">אירועים עתידיים</Typography>
          <Typography variant="h4">
            {events.filter(event => new Date(event.date) > new Date()).length}
          </Typography>
        </Paper>
        <Paper sx={{ 
          p: 2, 
          flex: 1, 
          minWidth: 200,
          background: 'rgba(255, 167, 38, 0.1)',
        }}>
          <Typography variant="h6">סה"כ משתתפים</Typography>
          <Typography variant="h4">
            {events.reduce((sum, event) => sum + (event.participants?.length || 0), 0)}
          </Typography>
        </Paper>
      </Box>

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'לא נמצאו אירועים התואמים את החיפוש' : 'אין אירועים להצגה'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ mt: 2 }}
          >
            הוסף אירוע חדש
          </Button>
        </Paper>
      )}

      {/* Events Table */}
      {filteredEvents.length > 0 && (
        <TableContainer component={Paper} sx={{ direction: 'rtl', mb: 4 }}>
        <Table dir="rtl">
          <TableHead>
            <TableRow>
              <TableCell align="right">שם האירוע</TableCell>
              <TableCell align="right">תאריך</TableCell>
              <TableCell align="right">מיקום</TableCell>
              <TableCell align="right">מחיר</TableCell>
              <TableCell align="right">משתתפים</TableCell>
              <TableCell align="right">תקציב</TableCell>
              <TableCell align="right">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {filteredEvents.map((event) => {
                const budget = calculateEventBudget(event);
                return (
                  <TableRow key={event.id}>
                    <TableCell align="right">{event.name}</TableCell>
                    <TableCell align="right">
                      {new Date(event.date).toLocaleDateString('he-IL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell align="right">{event.location}</TableCell>
                    <TableCell align="right">{event.price} CZK</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedParticipantEvent(event);
                          setOpenParticipantsDialog(true);
                        }}
                      >
                        {event.participants?.length || 0} / {event.maxParticipants || '∞'}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2" color={budget.profitLoss >= 0 ? 'success.main' : 'error.main'}>
                          רווח/הפסד: {budget.profitLoss.toLocaleString()} CZK
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Chip
                            size="small"
                            label={`הכנסות: ${budget.totalIncome.toLocaleString()} CZK`}
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`הוצאות: ${budget.totalExpenses.toLocaleString()} CZK`}
                            color="error"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => {
                        setSelectedEvent(event);
                        setOpenDialog(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(event.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      )}

      {/* Event Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setFormData({
            name: '',
            date: '',
            location: '',
            price: '',
            maxParticipants: '',
          });
        }} 
        maxWidth="sm" 
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ textAlign: 'right' }}>
          {selectedEvent ? 'עריכת אירוע' : 'יצירת אירוע חדש'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="שם האירוע"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
              InputProps={{
                sx: { textAlign: 'right' }
              }}
              sx={{ direction: 'rtl' }}
            />
            <TextField
              label="תאריך ושעה"
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ direction: 'rtl' }}
            />
            <TextField
              label="מיקום"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
              required
              InputProps={{
                sx: { textAlign: 'right' }
              }}
              sx={{ direction: 'rtl' }}
            />
            <TextField
              label="מחיר (קרונות)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              fullWidth
              InputProps={{
                endAdornment: <Typography>CZK</Typography>,
                sx: { textAlign: 'right' }
              }}
              sx={{ direction: 'rtl' }}
            />
            <TextField
              label="מספר משתתפים מקסימלי"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              fullWidth
              InputProps={{
                sx: { textAlign: 'right' }
              }}
              sx={{ direction: 'rtl' }}
            />
          </Box>
          
          {/* Add Budget Section */}
          {renderBudgetSection()}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={() => {
            setOpenDialog(false);
            setFormData({
              name: '',
              date: '',
              location: '',
              price: '',
              maxParticipants: '',
            });
          }}>
            ביטול
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEvent ? 'עדכן' : 'צור'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Participants Dialog */}
      <Dialog
        open={openParticipantsDialog}
        onClose={() => {
          setOpenParticipantsDialog(false);
          setSelectedParticipantEvent(null);
          setParticipantFormData({
            name: '',
            phone: '',
            email: '',
            priceType: PRICE_TYPES.REGULAR,
            notes: ''
          });
        }}
        maxWidth="md"
        fullWidth
        dir="rtl"
      >
        <DialogTitle sx={{ 
          textAlign: 'right',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          mb: 2
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            ניהול משתתפים - {selectedParticipantEvent?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {selectedParticipantEvent?.participants?.length || 0} / {selectedParticipantEvent?.maxParticipants || '∞'} משתתפים
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>הוספת משתתף חדש</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="שם מלא"
                  name="name"
                  value={participantFormData.name}
                  onChange={handleParticipantFormChange}
              required
            />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
                  fullWidth
                  label="טלפון"
                  name="phone"
                  value={participantFormData.phone}
                  onChange={handleParticipantFormChange}
              required
                  helperText="פורמט: 05X-XXXXXXX"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="אימייל"
                  name="email"
                  type="email"
                  value={participantFormData.email}
                  onChange={handleParticipantFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>סוג מחיר</InputLabel>
                  <Select
                    name="priceType"
                    value={participantFormData.priceType}
                    onChange={handleParticipantFormChange}
                    label="סוג מחיר"
                  >
                    <MenuItem value={PRICE_TYPES.REGULAR}>מחיר רגיל</MenuItem>
                    <MenuItem value={PRICE_TYPES.DISCOUNT}>הנחה</MenuItem>
                    <MenuItem value={PRICE_TYPES.FULL_SUBSIDY_EXPLAIN}>סבסוד מלא - הסברה</MenuItem>
                    <MenuItem value={PRICE_TYPES.FULL_SUBSIDY_STAFF}>סבסוד מלא - צוות</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="הערות"
                  name="notes"
                  multiline
                  rows={2}
                  value={participantFormData.notes}
                  onChange={handleParticipantFormChange}
                />
              </Grid>
              <Grid item xs={12}>
            <Button
              variant="contained"
                  onClick={handleParticipantSubmit}
                  startIcon={<AddIcon />}
                  sx={{ mt: 1 }}
            >
              הוסף משתתף
            </Button>
              </Grid>
            </Grid>
          </Paper>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>טלפון</TableCell>
                  <TableCell>אימייל</TableCell>
                  <TableCell>סוג מחיר</TableCell>
                  <TableCell>סטטוס</TableCell>
                  <TableCell>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedParticipantEvent?.participants?.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {participant.phone}
                        <IconButton
                          size="small"
                          onClick={() => sendWhatsAppMessage(participant.phone, `היי ${participant.name}, `)}
                        >
                          <WhatsAppIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      {participant.priceType === PRICE_TYPES.REGULAR ? 'רגיל' :
                       participant.priceType === PRICE_TYPES.DISCOUNT ? 'הנחה' :
                       participant.priceType === PRICE_TYPES.FULL_SUBSIDY_EXPLAIN ? 'סבסוד מלא - הסברה' :
                       'סבסוד מלא - צוות'}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                      <Checkbox
                        checked={participant.paid}
                        onChange={() => handleParticipantUpdate(selectedParticipantEvent.id, {
                          ...participant,
                          paid: !participant.paid,
                        })}
                          color="success"
                          size="small"
                      />
                        <Typography variant="caption" sx={{ mr: 1 }}>שילם</Typography>
                      <Checkbox
                        checked={participant.confirmed}
                        onChange={() => handleParticipantUpdate(selectedParticipantEvent.id, {
                          ...participant,
                          confirmed: !participant.confirmed,
                        })}
                          color="info"
                          size="small"
                      />
                        <Typography variant="caption" sx={{ mr: 1 }}>אישר</Typography>
                      <Checkbox
                        checked={participant.attended}
                        onChange={() => handleParticipantUpdate(selectedParticipantEvent.id, {
                          ...participant,
                          attended: !participant.attended,
                        })}
                          color="warning"
                          size="small"
                        />
                        <Typography variant="caption">הגיע</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => {
                          if (window.confirm('האם אתה בטוח שברצונך למחוק משתתף זה?')) {
                            setEvents(prevEvents =>
                              prevEvents.map(event =>
                                event.id === selectedParticipantEvent.id
                                  ? {
                                      ...event,
                                      participants: event.participants.filter(p => p.id !== participant.id)
                                    }
                                  : event
                              )
                            );
                            setSnackbar({
                              open: true,
                              message: 'המשתתף הוסר בהצלחה',
                              severity: 'success'
                            });
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            onClick={() => {
            setOpenParticipantsDialog(false);
            setSelectedParticipantEvent(null);
            }}
          >
            סגור
          </Button>
          {selectedParticipantEvent?.participants?.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Export participants to CSV
                const headers = ['שם', 'טלפון', 'אימייל', 'סוג מחיר', 'שילם', 'אישר', 'הגיע', 'הערות'];
                const csvContent = [
                  headers.join(','),
                  ...selectedParticipantEvent.participants.map(p => [
                    p.name,
                    p.phone,
                    p.email || '',
                    p.priceType,
                    p.paid ? 'כן' : 'לא',
                    p.confirmed ? 'כן' : 'לא',
                    p.attended ? 'כן' : 'לא',
                    p.notes || ''
                  ].join(','))
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `משתתפים_${selectedParticipantEvent.name}_${new Date().toLocaleDateString()}.csv`;
                link.click();
              }}
            >
              ייצוא לאקסל
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      {/* WhatsApp Contact Button */}
      <StyledFab
        onClick={() => window.open('https://wa.me/+972542230342', '_blank')}
      >
        <WhatsAppIcon />
      </StyledFab>

      {/* Add sync status indicator */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 16, 
        left: 16, 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        bgcolor: 'background.paper',
        padding: 1,
        borderRadius: 2,
        boxShadow: 1,
        zIndex: 1000
      }}>
        <SyncIcon 
          sx={{ 
            animation: syncStatus === 'syncing' ? 'spin 1s linear infinite' : 'none',
            color: syncStatus === 'error' ? 'error.main' : 
                   syncStatus === 'syncing' ? 'primary.main' : 'success.main',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} 
        />
        <Typography variant="caption" color="text.secondary">
          {syncStatus === 'error' ? 'שגיאת סנכרון' :
           syncStatus === 'syncing' ? 'מסנכרן...' :
           lastSyncTime ? `סונכרן לאחרונה: ${new Date(lastSyncTime).toLocaleTimeString('he-IL')}` :
           'טוען נתונים...'}
        </Typography>
      </Box>
    </Container>
  );
}

// NotificationSystem Component

// Utils
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const validatePhone = (phone) => {
  const phoneRegex = /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/;
  return phoneRegex.test(phone);
};

const sendWhatsAppMessage = (phone, message) => {
  try {
    const formattedPhone = phone.startsWith('+') ? phone : `+972${phone.substring(1)}`;
      window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};

// Local Storage Functions
const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    const parsedData = JSON.parse(item);
    
    // Ensure budget structure exists for all events
    if (key === 'yjccEvents') {
      return parsedData.map(event => ({
    ...event,
        budget: event.budget || {
          fullPrice: '',
          subsidyAmount: '',
          fixedExpenses: '',
          variableExpenses: '',
          notes: ''
        }
      }));
    }

    return parsedData;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Form Validation
const validateEventForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'שם האירוע הוא שדה חובה';
  }
  
  if (!formData.date) {
    errors.date = 'תאריך הוא שדה חובה';
  } else if (new Date(formData.date) < new Date()) {
    errors.date = 'לא ניתן ליצור אירוע בתאריך שעבר';
  }
  
  if (!formData.location?.trim()) {
    errors.location = 'מיקום הוא שדה חובה';
  }
  
  return errors;
};

const validateParticipantForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'שם המשתתף הוא שדה חובה';
  }
  
  if (!formData.phone?.trim()) {
    errors.phone = 'מספר טלפון הוא שדה חובה';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'מספר טלפון לא תקין';
  }
  
  return errors;
};

// LandingPage Component
function LandingPage({ onAdminClick, onParticipantClick }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #64B5F6, #90CAF9, #42A5F5, #1E88E5)',
          }}
        />
        <YJCCLogo />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onAdminClick}
            startIcon={<LockOutlinedIcon />}
            sx={{
              py: 2,
              fontSize: '1.1rem',
            }}
          >
            כניסת מנהל
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onParticipantClick}
            sx={{
              py: 2,
              fontSize: '1.1rem',
            }}
          >
            הרשמה לאירועים
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

// ParticipantDashboard Component
function ParticipantDashboard() {
  const [events, setEvents] = useState(() => loadFromLocalStorage('yjccEvents', []));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [favorites, setFavorites] = useState(() => loadFromLocalStorage('yjccFavorites', []));
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedEventForFeedback, setSelectedEventForFeedback] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    comment: '',
    anonymous: false
  });
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'error'

  // Filter and sort events
  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const eventDate = new Date(event.date);
      const now = new Date();
      return matchesSearch && (showPastEvents || eventDate >= now);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const toggleFavorite = (eventId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId];
      saveToLocalStorage('yjccFavorites', newFavorites);
      return newFavorites;
    });
  };

  const shareEvent = (event) => {
    const eventDetails = `
אירוע: ${event.name}
תאריך: ${formatDate(event.date)}
מיקום: ${event.location}
${event.description ? `\nפרטים: ${event.description}` : ''}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: `הצטרפו אלינו! ${event.name}`,
        text: eventDetails,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(eventDetails).then(() => {
        setSnackbar({
          open: true,
          message: 'פרטי האירוע הועתקו ללוח',
          severity: 'success'
        });
      });
    }
  };

  const handleRegistrationClick = (event) => {
    setSelectedEvent(event);
    setRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setRegistrationOpen(false);
    setFormData({ name: '', phone: '' });
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegistrationSubmit = () => {
    const errors = validateParticipantForm(formData);
    if (Object.keys(errors).length > 0) {
      setSnackbar({
        open: true,
        message: Object.values(errors)[0],
        severity: 'error'
      });
      return;
    }

    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        // Add new participant directly
        const newParticipant = {
          ...formData,
          id: Date.now(),
          registeredAt: new Date().toISOString(),
          paid: false,
          confirmed: false,
          attended: false
        };
        return {
          ...event,
          participants: [...(event.participants || []), newParticipant]
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    localStorage.setItem('yjccEvents', JSON.stringify(updatedEvents));
    
    try {
      const message = `תודה על ההרשמה לאירוע "${selectedEvent.name}"!\nפרטי האירוע:\nתאריך: ${formatDate(selectedEvent.date)}\nמיקום: ${selectedEvent.location}`;
      sendWhatsAppMessage(formData.phone, message);
    } catch (error) {
      console.error('Error sending confirmation message:', error);
    }

    handleRegistrationClose();
    setSnackbar({
      open: true,
      message: `נרשמת בהצלחה לאירוע "${selectedEvent.name}"! 🎉`,
      severity: 'success'
    });
  };

  const handleFeedbackSubmit = () => {
    if (!selectedEventForFeedback) return;

    const updatedEvents = events.map(event => {
      if (event.id === selectedEventForFeedback.id) {
        const feedback = {
          id: Date.now(),
          rating: feedbackForm.rating,
          comment: feedbackForm.comment,
          createdAt: new Date().toISOString(),
          participantName: feedbackForm.anonymous ? 'אנונימי' : formData.name
        };

        return {
          ...event,
          feedback: [...(event.feedback || []), feedback]
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    saveToLocalStorage('yjccEvents', updatedEvents);

    setSnackbar({
      open: true,
      message: 'תודה על המשוב שלך! 🙏',
      severity: 'success'
    });

    setFeedbackDialogOpen(false);
    setFeedbackForm({ rating: 5, comment: '', anonymous: false });
  };

  return (
    <Container>
      {/* Hero Section */}
      <Box sx={{
          textAlign: 'center',
        py: 6,
        px: 2,
        mb: 4,
        background: `linear-gradient(135deg, ${YJCC_COLORS.light}, rgba(144, 202, 249, 0.2))`,
        borderRadius: 4,
      }}>
        <Typography variant="h3" sx={{
          fontWeight: 700,
          mb: 2,
          background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ברוכים הבאים לאירועי YJCC!
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          הצטרפו אלינו לחוויות מדהימות בקהילה הישראלית בפראג 🌟
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        <TextField
          placeholder="חיפוש אירועים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={showPastEvents}
              onChange={(e) => setShowPastEvents(e.target.checked)}
            />
          }
          label="הצג אירועים שהסתיימו"
        />

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, value) => value && setViewMode(value)}
          size="small"
        >
          <ToggleButton value="grid">
            <GridViewIcon />
          </ToggleButton>
          <ToggleButton value="calendar">
            <CalendarIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Events Grid */}
      {viewMode === 'grid' && (
      <Grid container spacing={3}>
          {filteredEvents.map(event => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < new Date();
            const isFavorite = favorites.includes(event.id);
            const hasGivenFeedback = event.feedback?.some(f => 
              !f.anonymous && f.participantName === formData.name
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Paper
                sx={{
                    p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                    opacity: isPast ? 0.7 : 1,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(100, 181, 246, 0.15)',
                    },
                    background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(227, 242, 253, 0.5) 100%)',
                  }}
                >
                  {/* Favorite Button */}
                  <IconButton
                    onClick={() => toggleFavorite(event.id)}
                  sx={{ 
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: isFavorite ? 'error.main' : 'text.secondary',
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>

                  {/* Share Button */}
                  <IconButton
                    onClick={() => shareEvent(event)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                    }}
                  >
                    <ShareIcon />
                  </IconButton>

                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, pr: 4 }}>
                  {event.name}
                </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                    {formatDate(event.date)}
                  </Typography>
                </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                    {event.location}
                  </Typography>
                </Box>

                  {event.price && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography>
                        {event.price} CZK
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                      {event.participants?.length || 0}
                      {event.maxParticipants ? ` / ${event.maxParticipants}` : ''} משתתפים
                    </Typography>
                  </Box>

                {event.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {event.description}
                    </Typography>
                )}

                <Box sx={{ mt: 'auto' }}>
                    {!isPast && (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleRegistrationClick(event)}
                        disabled={event.maxParticipants && event.participants?.length >= event.maxParticipants}
                        sx={{
                          background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
                          color: 'white',
                          '&:hover': {
                            background: `linear-gradient(45deg, ${YJCC_COLORS.secondary}, ${YJCC_COLORS.accent})`,
                          },
                        }}
                      >
                        {event.maxParticipants && event.participants?.length >= event.maxParticipants
                          ? 'האירוע מלא'
                          : 'הרשמה לאירוע'}
                      </Button>
                    )}
                  </Box>

                  {isPast && (
                    <Chip
                      label="האירוע הסתיים"
                      color="default"
                      sx={{ alignSelf: 'center', mt: 1 }}
                    />
                  )}

                  {/* Add Feedback Section */}
                  {isPast && (
                    <Box sx={{ mt: 2, borderTop: '1px solid rgba(0,0,0,0.1)', pt: 2 }}>
                      {event.feedback && event.feedback.length > 0 ? (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            משוב מהמשתתפים:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating
                              value={event.feedback.reduce((acc, f) => acc + f.rating, 0) / event.feedback.length}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({event.feedback.length} משובים)
                    </Typography>
                  </Box>
                        </Box>
                      ) : null}

                      {!hasGivenFeedback && (
                    <Button
                      fullWidth
                          variant="outlined"
                          startIcon={<RateReviewIcon />}
                          onClick={() => {
                            setSelectedEventForFeedback(event);
                            setFeedbackDialogOpen(true);
                          }}
                      sx={{ 
                            mt: 1,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                              borderColor: 'primary.dark',
                              backgroundColor: 'primary.light',
                            }
                          }}
                        >
                          שתפו את החוויה שלכם
                    </Button>
                  )}
                </Box>
                  )}
              </Paper>
            </Grid>
            );
          })}
      </Grid>
      )}

      {/* Calendar View - Coming soon message */}
      {viewMode === 'calendar' && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CalendarIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6">
            תצוגת לוח שנה תהיה זמינה בקרוב!
          </Typography>
          <Typography color="text.secondary">
            אנחנו עובדים על זה 🚀
          </Typography>
        </Paper>
      )}

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm
              ? 'לא נמצאו אירועים התואמים את החיפוש'
              : showPastEvents
                ? 'אין אירועים להצגה'
                : 'אין אירועים עתידיים כרגע'}
          </Typography>
          {!showPastEvents && (
            <Button
              variant="outlined"
              onClick={() => setShowPastEvents(true)}
              sx={{ mt: 2 }}
            >
              הצג אירועים קודמים
            </Button>
          )}
        </Paper>
      )}

      {/* Registration Dialog */}
      <Dialog 
        open={registrationOpen} 
        onClose={handleRegistrationClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          הרשמה לאירוע {selectedEvent?.name}
        </DialogTitle>
        
        {selectedEvent && (
        <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                פרטי האירוע:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{formatDate(selectedEvent.date)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>{selectedEvent.location}</Typography>
                </Box>
                {selectedEvent.price && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>{selectedEvent.price} CZK</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
              הפרטים שלך:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
          <TextField
            autoFocus
            name="name"
            label="השם שלך"
            fullWidth
            value={formData.name}
            onChange={handleFormChange}
                  required
          />
              </Grid>
              <Grid item xs={12}>
          <TextField
            name="phone"
            label="מספר טלפון"
            fullWidth
            value={formData.phone}
            onChange={handleFormChange}
                  required
                  helperText="נשלח לך הודעת אישור בוואטסאפ"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WhatsAppIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
        </DialogContent>
        )}
        
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleRegistrationClose} color="inherit">
            ביטול
          </Button>
          <Button 
            onClick={handleRegistrationSubmit}
            variant="contained"
            sx={{
              background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${YJCC_COLORS.secondary}, ${YJCC_COLORS.accent})`,
              },
            }}
          >
            אישור הרשמה
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
      >
        <DialogTitle sx={{
          pb: 1,
          background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          משוב על {selectedEventForFeedback?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              איך היה האירוע?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                  value={feedbackForm.rating}
                  onChange={(_, newValue) => {
                    setFeedbackForm(prev => ({ ...prev, rating: newValue }));
                  }}
                  size="large"
                />
                <Typography color="text.secondary">
                  {feedbackForm.rating === 5 ? 'מעולה!' :
                   feedbackForm.rating === 4 ? 'טוב מאוד' :
                   feedbackForm.rating === 3 ? 'בסדר' :
                   feedbackForm.rating === 2 ? 'לא משהו' :
                   'לא טוב'}
                </Typography>
              </Box>

              <TextField
                label="ספרו לנו על החוויה שלכם"
                multiline
                rows={4}
                value={feedbackForm.comment}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, comment: e.target.value }))}
                fullWidth
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={feedbackForm.anonymous}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, anonymous: e.target.checked }))}
                  />
                }
                label="שלח משוב אנונימי"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setFeedbackDialogOpen(false)} color="inherit">
            ביטול
          </Button>
          <Button 
            onClick={handleFeedbackSubmit}
            variant="contained"
            disabled={!feedbackForm.rating || !feedbackForm.comment}
            sx={{
              background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.secondary})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${YJCC_COLORS.secondary}, ${YJCC_COLORS.accent})`,
              }
            }}
          >
            שלח משוב
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
}

// Add these utility functions before the App component
const syncDataWithFile = async (events) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(events, null, 2));
    
    const response = await fetch('/api/sync', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync data');
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing data:', error);
    return false;
  }
};

const loadDataFromFile = async () => {
  try {
    const response = await fetch('/api/events.json');
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

// Main App Component
function App() {
  const [view, setView] = useState('landing');

  const handleAdminLogin = (code) => {
    if (code === ADMIN_CODE) {
      setView('admin');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setView('landing');
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return (
          <LandingPage
            onAdminClick={() => setView('admin-login')}
            onParticipantClick={() => setView('participant')}
          />
        );
      case 'admin-login':
        return <AdminLogin onLogin={handleAdminLogin} />;
      case 'admin':
        return <EventDashboard onLogout={handleLogout} />;
      case 'participant':
        return <ParticipantDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
          padding: '20px',
          direction: 'rtl'
        }}>
          {renderView()}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App; 
