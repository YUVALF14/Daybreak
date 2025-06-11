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
  Checkbox
} from '@mui/material';

function ParticipantDialog({ open, onClose, event, onParticipantUpdate }) {
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    phone: '',
    paid: false,
    confirmed: false,
    attended: false
  });

  useEffect(() => {
    if (open) {
      setNewParticipant({
        name: '',
        phone: '',
        paid: false,
        confirmed: false,
        attended: false
      });
    }
  }, [open]);

  if (!event) return null;

  const handleAddParticipant = (e) => {
    e.preventDefault();
    // Prevent duplicate phone numbers
    if (event.participants.some(p => p.phone === newParticipant.phone)) {
      alert('משתתף עם מספר טלפון זה כבר קיים');
      return;
    }
    console.log('Adding participant:', newParticipant);
    onParticipantUpdate(event.id, { ...newParticipant });
    setNewParticipant({
      name: '',
      phone: '',
      paid: false,
      confirmed: false,
      attended: false
    });
  };

  const handleParticipantChange = (participant, field) => {
    const updatedParticipant = { ...participant, [field]: !participant[field] };
    console.log('Changing participant:', updatedParticipant);
    onParticipantUpdate(event.id, updatedParticipant);
  };

  const handleDeleteParticipant = (participant) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתתף זה?')) {
      console.log('Deleting participant:', participant);
      onParticipantUpdate(event.id, { ...participant, delete: true }); // Signal deletion
      // You may need to handle this in the parent by filtering out participants with delete: true
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>משתתפים - {event.name || event.title}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleAddParticipant} sx={{ mb: 3 }}>
          <TextField
            label="שם משתתף"
            value={newParticipant.name}
            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
            required
            sx={{ mr: 1 }}
          />
          <TextField
            label="מספר טלפון"
            value={newParticipant.phone}
            onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
            required
            sx={{ mr: 1 }}
          />
          <Button type="submit" variant="contained">
            הוסף משתתף
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם</TableCell>
                <TableCell>טלפון</TableCell>
                <TableCell>שילם</TableCell>
                <TableCell>אישר הגעה</TableCell>
                <TableCell>הגיע</TableCell>
                <TableCell>מחיקה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.participants.map((participant) => (
                <TableRow key={participant.phone}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.phone}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={participant.paid}
                      onChange={() => handleParticipantChange(participant, 'paid')}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={participant.confirmed}
                      onChange={() => handleParticipantChange(participant, 'confirmed')}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={participant.attended}
                      onChange={() => handleParticipantChange(participant, 'attended')}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
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
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParticipantDialog;