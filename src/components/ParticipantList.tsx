import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useWhatsApp } from '../context/WhatsAppContext';
import { useNavigate } from 'react-router-dom';

interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const getInitialParticipant = () => {
  try {
    return JSON.parse(localStorage.getItem('participant') || '{}');
  } catch {
    return {};
  }
};

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('participants');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(() => getInitialParticipant());
  const [openDialog, setOpenDialog] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { sendMessage, isLoading } = useWhatsApp();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    if (currentParticipant) {
      localStorage.setItem('participant', JSON.stringify(currentParticipant));
    }
  }, [currentParticipant]);

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
        id: Date.now().toString(),
        ...formData
      };
      setParticipants([...participants, newParticipant]);
      setCurrentParticipant(newParticipant);
      await sendMessage(
        formData.phone,
        `שלום ${formData.name}! תודה על ההרשמה לאירוע. נשמח לראותך! 🌟`
      );
      setOpenDialog(false);
      setFormData({ name: '', phone: '', email: '' });
      setSuccess(true);
    } catch (err) {
      setError('אירעה שגיאה בתהליך ההרשמה');
    }
  };

  const handleEditProfile = () => {
    setFormData({
      name: currentParticipant?.name || '',
      phone: currentParticipant?.phone || '',
      email: currentParticipant?.email || '',
    });
    setEditProfile(true);
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
    setEditProfile(false);
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

  return (
    <Box sx={{
      maxWidth: 500,
      mx: 'auto',
      mt: 6,
      mb: 6,
      p: { xs: 2, sm: 4 },
      background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
      borderRadius: 6,
      boxShadow: 6,
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 0.7s',
    }}>
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
        עמוד משתתפים
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: '#2C3E50', opacity: 0.85 }}>
        כאן תוכל לראות את פרטיך ולנהל את ההרשמה שלך
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: 1,
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
          color="error"
          onClick={handleLogout}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 4,
            },
          }}
        >
          יציאה
        </Button>
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
            borderRadius: 3,
            boxShadow: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'scale(1.02)', boxShadow: 4 },
            display: 'flex',
            alignItems: 'center',
            px: 2,
          }}>
            <Avatar sx={{ bgcolor: '#90CAF9', width: 40, height: 40, mr: 2 }}>
              {participant.name?.[0] || <PersonIcon />}
            </Avatar>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{participant.name}</Typography>
              <Typography color="text.secondary">{participant.phone}</Typography>
              {participant.email && (
                <Typography color="text.secondary">{participant.email}</Typography>
              )}
            </CardContent>
            <Button
              color="error"
              onClick={() =>
                setParticipants(participants.filter(p => p.id !== participant.id))
              }
              sx={{
                mt: 1,
                fontWeight: 600,
                borderRadius: 8,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.08)' },
              }}
            >
              מחק
            </Button>
          </Card>
        ))}
      </Stack>

      {/* Registration Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>הרשמת משתתף חדש</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="שם מלא"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="טלפון"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="אימייל"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button
            onClick={handleRegister}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'שולח...' : 'הרשמה'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfile} onClose={() => setEditProfile(false)}>
        <DialogTitle>עריכת פרופיל</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="שם מלא"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="טלפון"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="אימייל"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfile(false)}>ביטול</Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="ההרשמה בוצעה בהצלחה!"
      />
    </Box>
  );
};

export default ParticipantList;
// הוסף הצגה של מחיר/סבסוד/תקציב אם תרצה, לדוג' מתחת לנתוני המשתתף או האירוע