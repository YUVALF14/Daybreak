import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Avatar,
  Stack,
  IconButton,
  LinearProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useWhatsApp } from '../context/WhatsAppContext';
import { useEvents } from '../context/EventsContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
  registeredEvents?: string[];
}

const ADMIN_CODE = process.env.REACT_APP_ADMIN_CODE || '071024';
const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { sendMessage, isLoading } = useWhatsApp();
  const { events } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventIdFromUrl = query.get('eventId');

  useEffect(() => {
    const participantsRef = ref(database, 'participants');
    const handleValue = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) {
        setParticipants([]);
        return;
      }
      const arr = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        ...value,
      }));
      setParticipants(arr);
    };
    onValue(participantsRef, handleValue);
    return () => off(participantsRef, 'value', handleValue);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('participant');
    if (stored) {
      const { phone } = JSON.parse(stored);
      if (phone) {
        const participantRef = ref(database, `participants/${phone}`);
        onValue(participantRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setCurrentParticipant({ id: phone, ...data });
        });
        return () => off(participantRef);
      }
    }
  }, []);

  useEffect(() => {
    if (currentParticipant) {
      localStorage.setItem('participant', JSON.stringify(currentParticipant));
    }
  }, [currentParticipant]);

  useEffect(() => {
    // Example: detect admin by localStorage or context
    setIsAdmin(localStorage.getItem('adminAuthenticated') === 'true');
  }, []);

  const handleRegister = async () => {
    try {
      setError(null);
      // Validation
      if (!formData.name || !formData.phone) {
        setError('נא למלא שם וטלפון');
        return;
      }
      if (!/^05\d{8}$/.test(formData.phone)) {
        setError('מספר טלפון לא תקין');
        return;
      }
      if (formData.email && !/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
        setError('כתובת אימייל לא תקינה');
        return;
      }
      if (participants.some(p => p.phone === formData.phone)) {
        setError('משתתף עם מספר טלפון זה כבר קיים');
        return;
      }
      // Add participant
      const newParticipant: Participant = {
        id: formData.phone,
        ...formData,
        registeredEvents: [],
      };
      await set(ref(database, `participants/${formData.phone}`), newParticipant);
      setCurrentParticipant(newParticipant);
      setSuccess(true);
      setOpenDialog(false);
      setFormData({ name: '', phone: '', email: '' });
      await sendMessage(
        formData.phone,
        `שלום ${formData.name}! תודה על ההרשמה לאירוע. נשמח לראותך! 🌟`
      );
    } catch (err) {
      setError('אירעה שגיאה בתהליך ההרשמה');
      console.error('Participant registration error:', err);
    }
  };

  const handleEditProfile = () => {
    setFormData({
      name: currentParticipant?.name || '',
      phone: currentParticipant?.phone || '',
      email: currentParticipant?.email || '',
    });
  };

  const handleSaveProfile = () => {
    if (!formData.name || !formData.phone) {
      setError('נא למלא שם וטלפון');
      return;
    }
    setCurrentParticipant({
      id: currentParticipant?.id || Date.now().toString(),
      ...formData,
    });
    setError(null);
    setSuccess(true);
  };

  const handleOpenDialog = () => {
    setError(null);
    setFormData({ name: '', phone: '', email: '' });
    setOpenDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('participant');
    navigate('/');
  };

  // הרשמת משתתף לאירוע (עדכון ב-Firebase)
  const handleRegisterToEvent = async (eventId: string) => {
    if (!currentParticipant) return;
    // console.log('Registering participant to event:', eventId, currentParticipant);
    // עדכן את רשימת האירועים של המשתתף
    const updatedEvents = [
      ...(currentParticipant.registeredEvents || []),
      eventId,
    ];
    await set(ref(database, `participants/${currentParticipant.id}/registeredEvents`), updatedEvents);
    // הוסף את המשתתף לאירוע ב-Firebase
    await set(
      ref(database, `events/${eventId}/participants/${currentParticipant.id}`),
      {
        name: currentParticipant.name,
        phone: currentParticipant.phone,
        email: currentParticipant.email,
      }
    );
    setSuccess(true);
  };

  // סינון אירועים לפי eventId מה-URL
  const filteredEvents = eventIdFromUrl
    ? events.filter(e => e.id === eventIdFromUrl)
    : [];

  // Calculate registration progress for the first filtered event
  const registrationProgress = filteredEvents.length > 0 && filteredEvents[0].maxParticipants
    ? Math.min(
        100 *
          (filteredEvents[0].participants?.length || 0) /
          filteredEvents[0].maxParticipants,
        100
      )
    : 0;

  return (
    <Box sx={{
      maxWidth: 500,
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
      {/* התנתקות מנהל */}
      {isAdmin && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={() => {
            localStorage.removeItem('adminAuthenticated');
            window.location.href = '/';
          }}
          className="logout-btn"
          sx={{
            // position: 'absolute',
            // top: 24,
            // left: 24,
            // ...existing code...
          }}
        >
          התנתקות מנהל
        </Button>
      )}
      <Avatar
        src="/favicon.ico"
        alt="logo"
        sx={{
          width: 64,
          height: 64,
          mb: 2,
          boxShadow: 2,
          bgcolor: '#fff',
        }}
      />
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#1976d2', letterSpacing: 1, textShadow: '0 2px 12px #90caf9' }}>
        עמוד משתתפים 👥
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: '#2C3E50', opacity: 0.85 }}>
        כאן תוכל לראות את פרטיך ולנהל את ההרשמה שלך
      </Typography>
      {/* אם אין משתמש נוכחי - הצג אפשרות להתחברות/הרשמה */}
      {!currentParticipant && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={() => navigate('/login')}
          >
            התחברות לחשבון קיים 🚪
          </Button>
          <Button
            variant="outlined"
            color="success"
            sx={{ mx: 1 }}
            onClick={() => navigate('/signup')}
          >
            יצירת חשבון חדש ✍️
          </Button>
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: 1,
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
              borderColor: '#1976d2',
              background: '#e3f2fd',
            },
          }}
        >
          חזור
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/admin-login')}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: 2,
            width: { xs: '100%', sm: 'auto' },
            transition: 'transform 0.2s, box-shadow 0.2s',
            background: 'linear-gradient(90deg, #1976d2 0%, #64B5F6 100%)',
            color: '#fff',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
              background: 'linear-gradient(90deg, #64B5F6 0%, #1976d2 100%)',
            },
          }}
        >
          כניסת מנהלים
        </Button>
        {currentParticipant && (
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            className="logout-btn"
            sx={{
              borderRadius: 8,
              fontWeight: 600,
              boxShadow: 2,
              width: { xs: '100%', sm: 'auto' },
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 4,
              },
            }}
          >
            יציאה מהחשבון
          </Button>
        )}
      </Box>
      <Card sx={{
        mb: 3,
        p: 2,
        background: 'linear-gradient(90deg, #E3F2FD 0%, #FFFFFF 100%)',
        boxShadow: 3,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        animation: 'fadeIn 0.7s',
      }}>
        <Avatar sx={{ bgcolor: '#64B5F6', width: 56, height: 56, mr: 2, border: '3px solid #fff', boxShadow: 2 }}>
          {currentParticipant?.name?.[0] || <PersonIcon />}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            שלום {currentParticipant?.name || 'משתתף'} 👋
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>
            {currentParticipant?.phone}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>
            {currentParticipant?.email}
          </Typography>
        </Box>
        <IconButton
          color="primary"
          onClick={handleEditProfile}
          aria-label="ערוך פרופיל"
          sx={{
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.15)', color: '#1976d2' },
          }}
        >
          <EditIcon />
        </IconButton>
      </Card>

      {/* אירועים קרובים למשתתף */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#7c4dff', mb: 2 }}>
          {filteredEvents.length > 0 ? 'הרשמה לאירוע' : 'לא נבחר אירוע'}
        </Typography>
        {filteredEvents.length > 0 && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1, color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
              <CelebrationIcon color="success" /> התקדמות הרשמה
            </Typography>
            <LinearProgress
              variant="determinate"
              value={registrationProgress}
              sx={{
                height: 10,
                borderRadius: 5,
                background: '#eaf6ff',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)'
                }
              }}
            />
            <Typography sx={{ fontSize: '0.95rem', mt: 0.5, color: '#6e6e73' }}>
              {filteredEvents[0].participants?.length || 0} מתוך {filteredEvents[0].maxParticipants || '-'} נרשמו
            </Typography>
          </Box>
        )}
        <Stack spacing={2}>
          {filteredEvents.map(event => (
            <Card key={event.id} sx={{
              background: 'linear-gradient(90deg, #ede7f6 0%, #e3f2fd 100%)',
              borderRadius: 3,
              boxShadow: 2,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Box>
                <Typography variant="h6">{event.title}</Typography>
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
              </Box>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: 99,
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(90deg, #7c4dff 0%, #00bcd4 100%)',
                  color: '#fff',
                  boxShadow: 2,
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                  },
                }}
                onClick={() => handleRegisterToEvent(event.id)}
                disabled={
                  !currentParticipant ||
                  (currentParticipant.registeredEvents || []).includes(event.id)
                }
              >
                {(currentParticipant && (currentParticipant.registeredEvents || []).includes(event.id))
                  ? 'נרשמת'
                  : 'להרשמה'}
              </Button>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#1976d2' }}>
          רשימת משתתפים
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #64B5F6 0%, #42A5F5 100%)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
            },
          }}
        >
          הרשמה חדשה ✨
        </Button>
      </Box>

      <Stack spacing={2} sx={{ width: '100%' }}>
        {participants.map((participant) => (
          <Card key={participant.id} sx={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'scale(1.02)', boxShadow: 3 },
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.7s',
            position: 'relative'
          }}>
            {/* Animated icon for new participants */}
            {participant.id === currentParticipant?.id && (
              <CelebrationIcon
                color="success"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontSize: 32,
                  animation: 'float 2.5s ease-in-out infinite'
                }}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#64B5F6', width: 56, height: 56, mr: 2 }}>
                {participant.name[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {participant.name}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {participant.phone}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {participant.email}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 8,
                fontWeight: 600,
                px: 3,
                py: 1,
                height: 40,
                minWidth: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3,
                },
              }}
              onClick={() => {
                setCurrentParticipant(participant);
                setOpenDialog(true);
              }}
            >
              <PersonIcon sx={{ mr: 1 }} />
              פרטים
            </Button>
          </Card>
        ))}
      </Stack>

      {/* דיאלוג להרשמה/עריכת פרטים */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentParticipant ? 'ערוך פרטים' : 'הרשמה חדשה'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" onClose={() => setSuccess(false)}>
                {currentParticipant ? 'הפרטים עודכנו בהצלחה!' : 'ההרשמה בוצעה בהצלחה!'}
              </Alert>
            )}
            <TextField
              label="שם מלא"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
            />
            <TextField
              label="טלפון"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isLoading}
            />
            <TextField
              label="אימייל (אופציונלי)"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            ביטול
          </Button>
          <Button
            onClick={currentParticipant ? handleSaveProfile : handleRegister}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'שומר...' : currentParticipant ? 'שמור פרופיל' : 'הרשמה'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {currentParticipant ? 'הפרטים עודכנו בהצלחה!' : 'ההרשמה בוצעה בהצלחה!'}
        </Alert>
      </Snackbar>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px);}
            100% { transform: translateY(0);}
          }
        `}
      </style>
    </Box>
  );
};

export default ParticipantList;