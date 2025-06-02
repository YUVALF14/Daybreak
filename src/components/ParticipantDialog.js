import React, { useState } from 'react';
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

  const handleAddParticipant = (e) => {
    e.preventDefault();
    onParticipantUpdate(event.id, newParticipant);
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
    onParticipantUpdate(event.id, updatedParticipant);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>משתתפים - {event.name}</DialogTitle>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {event.participants.map((participant, index) => (
                <TableRow key={index}>
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