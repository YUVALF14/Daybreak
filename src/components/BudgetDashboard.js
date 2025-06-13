import React from 'react';
import { Box, Typography, Paper, Button, Stack, Divider, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp.js';
import { useEvents } from '../context/EventsContext.tsx';

function BudgetDashboard({ onBack }) {
  const { events } = useEvents();

  // Calculate budget summary
  const totalBudget = events.reduce((sum, e) =>
    sum + ((e.maxParticipants && e.subsidy) ? (parseInt(e.maxParticipants) * parseFloat(e.subsidy)) : 0), 0
  );
  const totalExpenses = events.reduce((sum, e) =>
    sum + ((e.participants && e.subsidy) ? (e.participants.length * parseFloat(e.subsidy)) : 0), 0
  );
  const balance = totalBudget - totalExpenses;

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        mt: { xs: 2, sm: 6 },
        mb: { xs: 2, sm: 6 },
        p: { xs: 2, sm: 4 },
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
        borderRadius: { xs: 4, sm: 8 },
        boxShadow: { xs: 3, sm: 8 },
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn 0.7s',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#1976d2', letterSpacing: 1 }}>
        ניהול תקציב
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: '#2C3E50', opacity: 0.85 }}>
        כאן תוכל לצפות ולנהל את תקציב האירועים של הקהילה
      </Typography>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          p: 3,
          mb: 3,
          borderRadius: 5,
          background: 'linear-gradient(90deg, #e3f2fd 0%, #ede7f6 100%)',
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
            סיכום תקציב
          </Typography>
          <Divider />
          <Typography>
            <strong>סה"כ תקציב:</strong> <span style={{ color: '#388e3c' }}>CZK {totalBudget.toLocaleString()}</span>
          </Typography>
          <Typography>
            <strong>הוצאות בפועל:</strong> <span style={{ color: '#d32f2f' }}>CZK {totalExpenses.toLocaleString()}</span>
          </Typography>
          <Typography>
            <strong>יתרה:</strong> <span style={{ color: '#1976d2' }}>CZK {balance.toLocaleString()}</span>
          </Typography>
        </Stack>
      </Paper>
      {/* Table of event budgets */}
      <Paper sx={{ width: '100%', mb: 3, p: 2, borderRadius: 5, boxShadow: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          פירוט אירועים
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם האירוע</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>סבסוד למשתתף</TableCell>
              <TableCell>משתתפים בפועל</TableCell>
              <TableCell>תקציב מקסימלי</TableCell>
              <TableCell>הוצאה בפועל</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.date ? new Date(e.date).toLocaleDateString('he-IL') : '-'}</TableCell>
                <TableCell>{e.subsidy ? `${e.subsidy} CZK` : '-'}</TableCell>
                <TableCell>{e.participants ? e.participants.length : 0}</TableCell>
                <TableCell>
                  {e.maxParticipants && e.subsidy
                    ? `${(parseInt(e.maxParticipants) * parseFloat(e.subsidy)).toLocaleString()} CZK`
                    : '-'}
                </TableCell>
                <TableCell>
                  {e.participants && e.subsidy
                    ? `${(e.participants.length * parseFloat(e.subsidy)).toLocaleString()} CZK`
                    : '0 CZK'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="success"
        startIcon={<WhatsAppIcon />}
        sx={{
          borderRadius: 99,
          fontWeight: 800,
          fontSize: '1.1rem',
          px: 4,
          py: 1.5,
          background: 'linear-gradient(90deg, #25d366 0%, #128c7e 100%)',
          color: '#fff',
          boxShadow: 2,
          letterSpacing: 1,
          mb: 2,
          '&:hover': {
            background: 'linear-gradient(90deg, #128c7e 0%, #25d366 100%)',
          },
        }}
        href="https://wa.me/972542230342"
        target="_blank"
        rel="noopener noreferrer"
      >
        צור קשר ב-WhatsApp
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          mt: 2,
          borderRadius: 99,
          fontWeight: 700,
          px: 4,
          py: 1.2,
        }}
        onClick={onBack}
      >
        חזור
      </Button>
    </Box>
  );
}

export default BudgetDashboard;
