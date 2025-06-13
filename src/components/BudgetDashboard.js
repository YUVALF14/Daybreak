import React from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useEvents } from '../context/EventsContext';

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
  const usagePercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,154,86,0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none'
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-20px, -20px) rotate(180deg)' }
        }
      }}
    >      <Box
        sx={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(25px)',
          borderRadius: 8,
          padding: { xs: 4, sm: 6 },
          maxWidth: 1000,
          width: '100%',
          boxShadow: '0 30px 60px rgba(255,154,86,0.25), 0 15px 30px rgba(139,21,56,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.3)',
          position: 'relative',
          zIndex: 1,
          animation: 'slideUp 0.8s ease-out',
          '@keyframes slideUp': {
            '0%': { 
              opacity: 0, 
              transform: 'translateY(30px) scale(0.95)' 
            },
            '100%': { 
              opacity: 1, 
              transform: 'translateY(0) scale(1)' 
            }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(255,154,86,0.4)',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' }
                }
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              ניהול תקציב
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 3,
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 12px rgba(255,154,86,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(255,154,86,0.4)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                border: 'none'
              }
            }}
          >
            חזרה
          </Button>
        </Box>

        {/* Budget Overview Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 12px 24px rgba(37,211,102,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 40px rgba(37,211,102,0.4)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <AttachMoneyIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                תקציב כולל
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                ₪{totalBudget.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)', 
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 12px 24px rgba(255,154,86,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 40px rgba(255,154,86,0.4)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <TrendingUpIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                הוצאות
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                ₪{totalExpenses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            background: balance >= 0 ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)' : 'linear-gradient(135deg, #f44336 0%, #c62828 100%)', 
            color: 'white',
            borderRadius: 4,
            boxShadow: balance >= 0 ? '0 12px 24px rgba(76,175,80,0.3)' : '0 12px 24px rgba(244,67,54,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: balance >= 0 ? '0 20px 40px rgba(76,175,80,0.4)' : '0 20px 40px rgba(244,67,54,0.4)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <EventAvailableIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                יתרה
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                ₪{balance.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Usage Progress */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 4, background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#495057' }}>
              ניצול תקציב
            </Typography>
            <Chip 
              label={`${usagePercentage.toFixed(1)}%`}
              sx={{ 
                background: usagePercentage > 80 ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                color: 'white',
                fontWeight: 700
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(usagePercentage, 100)}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(194,65,107,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: usagePercentage > 80 
                  ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                  : 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                boxShadow: '0 2px 8px rgba(255,154,86,0.3)'
              }
            }}
          />        </Paper>

        {/* Event Details Table */}
        <Paper sx={{ 
          p: 3, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#495057' }}>
            פירוט אירועים
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>שם האירוע</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>תאריך</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>סבסוד למשתתף</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>משתתפים בפועל</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>תקציב מקסימלי</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)' }}>הוצאה בפועל</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((e, index) => (
                  <TableRow 
                    key={e.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: 'rgba(255,255,255,0.7)' },
                      '&:hover': { backgroundColor: 'rgba(255,154,86,0.1)' },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{e.title}</TableCell>
                    <TableCell>{e.date ? new Date(e.date).toLocaleDateString('he-IL') : '-'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={e.subsidy ? `₪${e.subsidy}` : '-'}
                        size="small"
                        sx={{ 
                          background: e.subsidy ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : 'rgba(0,0,0,0.1)',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                          {e.participants ? e.participants.length : 0}
                        </Typography>
                        {e.maxParticipants && (
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            / {e.maxParticipants}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#2E7D32' }}>
                        {e.maxParticipants && e.subsidy
                          ? `₪${(parseInt(e.maxParticipants) * parseFloat(e.subsidy)).toLocaleString()}`
                          : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>
                        {e.participants && e.subsidy
                          ? `₪${(e.participants.length * parseFloat(e.subsidy)).toLocaleString()}`
                          : '₪0'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default BudgetDashboard;
