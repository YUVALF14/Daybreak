import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  useMediaQuery
} from '@mui/material';

function ParticipantDialog({ open, onClose, event, onParticipantUpdate }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    phone: '',
    paid: false,
    confirmed: false,
    attended: false,
    email: ''
  });

  useEffect(() => {
    if (open) {
      setNewParticipant({
        name: '',
        phone: '',
        paid: false,
        confirmed: false,
        attended: false,
        email: ''
      });
    }
  }, [open]);

  if (!event) return null;

  const handleAddParticipant = (e) => {
    e.preventDefault();
    // Prevent duplicate phone numbers
    if (event.participants?.some(p => p.phone === newParticipant.phone)) {
      alert('משתתף עם מספר טלפון זה כבר קיים');
      return;
    }
    onParticipantUpdate(event.id, { 
      ...newParticipant,
      registrationDate: new Date().toISOString()
    });
    setNewParticipant({      name: '',
      phone: '',
      paid: false,
      confirmed: false,
      attended: false,
      email: ''
    });
  };

  const handleParticipantChange = (participant, field) => {
    const updatedParticipant = { ...participant, [field]: !participant[field] };
    onParticipantUpdate(event.id, updatedParticipant);
  };  const handleDeleteParticipant = (participant) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתتף זה?')) {
      onParticipantUpdate(event.id, { ...participant, delete: true });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 7 },
          boxShadow: 10,
          background: 'rgba(255,255,255,0.98)',
          border: { xs: 'none', sm: '2.5px solid #e3f2fd' },
          direction: 'rtl',
          height: { xs: '100vh', sm: 'auto' }
        }
      }}
    >
      <DialogTitle sx={{
        fontWeight: 900,
        fontSize: '1.5rem',
        color: '#1976d2',
        letterSpacing: 1,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        משתתפים - {event.name || event.title}
      </DialogTitle>
      <DialogContent>        <Box component="form" onSubmit={handleAddParticipant} sx={{ 
          mb: 3, 
          display: 'flex', 
          gap: 2,
          direction: 'rtl',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <TextField
            label="שם משתתף"
            value={newParticipant.name}
            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
            required
            sx={{ flex: 1, borderRadius: 3, background: '#f5f5f7' }}
          />
          <TextField
            label="מספר טלפון"
            value={newParticipant.phone}
            onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
            required
            sx={{ flex: 1, borderRadius: 3, background: '#f5f5f7' }}
          />          <Button type="submit" variant="contained" sx={{
            fontWeight: 800,
            borderRadius: 99,
            px: { xs: 3, sm: 4 },
            py: { xs: 1.5, sm: 1 },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            minHeight: { xs: '48px', sm: 'auto' },
            background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)'
          }}>
            הוסף משתתף
          </Button>
        </Box>        <TableContainer sx={{ 
          borderRadius: 5, 
          boxShadow: 2, 
          background: '#f8fbff',
          direction: 'rtl',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          <Table sx={{ direction: 'rtl' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#1976d2' }}>שם</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1976d2' }}>טלפון</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1976d2' }}>שילם</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1976d2' }}>אישר הגעה</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#1976d2' }}>הגיע</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#d32f2f' }}>מחיקה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.participants.map((participant) => (
                <TableRow key={participant.phone}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.phone}</TableCell>                  <TableCell>
                    <Checkbox
                      checked={Boolean(participant.paid)}
                      onChange={() => handleParticipantChange(participant, 'paid')}
                      sx={{ color: '#34c759', '&.Mui-checked': { color: '#34c759' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={Boolean(participant.confirmed)}
                      onChange={() => handleParticipantChange(participant, 'confirmed')}
                      sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={Boolean(participant.attended)}
                      onChange={() => handleParticipantChange(participant, 'attended')}
                      sx={{ color: '#ffa726', '&.Mui-checked': { color: '#ffa726' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="outlined"
                      sx={{
                        borderRadius: 99,
                        fontWeight: 700,
                        px: 2,
                        py: 0.5,
                        minWidth: 0,
                        fontSize: '1rem',
                        border: '2px solid #d32f2f',
                        transition: 'background 0.2s, color 0.2s',
                        '&:hover': {
                          background: '#ffeaea',
                          color: '#d32f2f',
                        }
                      }}
                      onClick={() => handleDeleteParticipant(participant)}
                    >
                      מחק
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{
          fontWeight: 800,
          borderRadius: 99,
          px: 4,
          background: 'linear-gradient(90deg, #eaf6ff 0%, #f5f5f7 100%)',
          color: '#1976d2',
          border: '2px solid #1976d2',
          '&:hover': {
            background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
            color: '#1976d2',
          }
        }}>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParticipantDialog;