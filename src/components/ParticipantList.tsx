import React, { useState } from 'react';
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
} from '@mui/material';
import { useWhatsApp } from '../context/WhatsAppContext';

interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const { sendMessage, isLoading } = useWhatsApp();

  const handleRegister = async () => {
    try {
      setError(null);
      
      // Validation
      if (!formData.name || !formData.phone) {
        setError('נא למלא שם וטלפון');
        return;
      }

      // Add participant
      const newParticipant: Participant = {
        id: Date.now().toString(),
        ...formData
      };
      
      setParticipants([...participants, newParticipant]);

      // Send WhatsApp message
      await sendMessage(
        formData.phone,
        `שלום ${formData.name}! תודה על ההרשמה לאירוע. נשמח לראותך! 🌟`
      );

      setOpenDialog(false);
      setFormData({ name: '', phone: '', email: '' });
    } catch (err) {
      setError('אירעה שגיאה בתהליך ההרשמה');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          משתתפים
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          הרשמה חדשה ✨
        </Button>
      </Box>

      {participants.map((participant) => (
        <Card key={participant.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{participant.name}</Typography>
            <Typography color="text.secondary">{participant.phone}</Typography>
            {participant.email && (
              <Typography color="text.secondary">{participant.email}</Typography>
            )}
          </CardContent>
        </Card>
      ))}

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
    </Box>
  );
};

export default ParticipantList; 