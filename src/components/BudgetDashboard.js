import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, LinearProgress, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import { useEvents } from '../context/EventsContext';

function BudgetDashboard({ onBack }) {
  const { events } = useEvents();
  const [monthlyBudgets, setMonthlyBudgets] = useState(() => {
    const saved = localStorage.getItem('monthlyBudgets');
    return saved ? JSON.parse(saved) : {};
  });
  const [budgetDialog, setBudgetDialog] = useState({ open: false, month: '', budget: '' });

  // Save to localStorage whenever monthlyBudgets changes
  useEffect(() => {
    localStorage.setItem('monthlyBudgets', JSON.stringify(monthlyBudgets));
  }, [monthlyBudgets]);

  // Get current month key
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // Get month name in Hebrew
  const getMonthName = (monthKey) => {
    const [year, month] = monthKey.split('-');
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };
  // Calculate current month expenses
  const getCurrentMonthExpenses = () => {
    const currentMonth = getCurrentMonth();
    
    return events
      .filter(e => {
        if (!e.date || !e.participants || !e.subsidy) return false;
        const eventDate = new Date(e.date);
        const eventMonth = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
        return eventMonth === currentMonth;
      })
      .reduce((sum, e) => sum + (e.participants.length * parseFloat(e.subsidy)), 0);
  };

  const currentMonth = getCurrentMonth();
  const currentMonthBudget = monthlyBudgets[currentMonth] || 0;
  const currentMonthExpenses = getCurrentMonthExpenses();
  const currentMonthBalance = currentMonthBudget - currentMonthExpenses;
  const currentMonthUsage = currentMonthBudget > 0 ? (currentMonthExpenses / currentMonthBudget) * 100 : 0;

  const handleSetMonthlyBudget = () => {
    if (budgetDialog.budget && parseFloat(budgetDialog.budget) > 0) {
      setMonthlyBudgets(prev => ({
        ...prev,
        [budgetDialog.month]: parseFloat(budgetDialog.budget)
      }));
    }
    setBudgetDialog({ open: false, month: '', budget: '' });
  };

  const openBudgetDialog = (month = currentMonth) => {
    setBudgetDialog({
      open: true,
      month,
      budget: monthlyBudgets[month]?.toString() || ''
    });
  };

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
      >        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 3, sm: 0 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
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
              <AccountBalanceWalletIcon sx={{ color: 'white', fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                fontSize: { xs: '1.5rem', sm: '2.125rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              ניהול תקציב
            </Typography>          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', sm: 'auto' } }}>            <Button
              variant="contained"
              onClick={() => window.open('https://wa.me/972507123456', '_blank')}
              sx={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                borderRadius: 3,
                px: { xs: 2, sm: 3 },
                py: 1.5,
                color: 'white',
                fontWeight: 700,
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
                transition: 'all 0.3s ease',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(37, 211, 102, 0.4)',
                }
              }}
            >
              📱 צור קשר
            </Button>
            <Button
              variant="outlined"
              onClick={onBack}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                px: { xs: 2, sm: 3 },
                background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 12px rgba(255,154,86,0.3)',
                transition: 'all 0.3s ease',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(255,154,86,0.4)',
                  background: 'linear-gradient(135deg, #ff8a3d 0%, #d1537a 100%)',
                  border: 'none'
                }
              }}
            >            חזרה
            </Button>
          </Box>
        </Box>        {/* Budget Overview Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
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
                תקציב בהמתנה
              </Typography>              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {totalBudget.toLocaleString()} CZK
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
              </Typography>              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {totalExpenses.toLocaleString()} CZK
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
              <EventAvailableIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                יתרה
              </Typography>              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {balance.toLocaleString()} CZK
              </Typography>
            </CardContent>
          </Card>

          {/* New Monthly Budget Card */}
          <Card sx={{ 
            background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)', 
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 12px 24px rgba(156,39,176,0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 40px rgba(156,39,176,0.4)'
            }
          }}
          onClick={() => openBudgetDialog()}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <CalendarMonthIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                תקציב חודשי
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {currentMonthBudget.toLocaleString()} CZK
              </Typography>
              <EditIcon sx={{ fontSize: '1rem', mt: 1, opacity: 0.7 }} />
            </CardContent>
          </Card>
        </Box>

        {/* Monthly Budget Progress */}
        {currentMonthBudget > 0 && (
          <Paper sx={{ p: 3, mb: 4, borderRadius: 4, background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#4a148c' }}>
                מעקב תקציב חודשי - {getMonthName(currentMonth)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip 
                  label={`${currentMonthUsage.toFixed(1)}%`}
                  sx={{ 
                    background: currentMonthUsage > 80 ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                    color: 'white',
                    fontWeight: 700
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: currentMonthBalance >= 0 ? '#2e7d32' : '#d32f2f' }}>
                  יתרה: {currentMonthBalance.toLocaleString()} CZK
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(currentMonthUsage, 100)}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: 'rgba(156,39,176,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: currentMonthUsage > 80 
                    ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                    : 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                  boxShadow: '0 2px 8px rgba(156,39,176,0.3)'
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#4a148c', fontWeight: 600 }}>
                הוצאות החודש: {currentMonthExpenses.toLocaleString()} CZK
              </Typography>
              <Typography variant="body2" sx={{ color: '#4a148c', fontWeight: 600 }}>
                תקציב: {currentMonthBudget.toLocaleString()} CZK
              </Typography>
            </Box>
          </Paper>
        )}

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
          />        </Paper>        {/* Event Details Table */}
        <Paper sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: '#495057',
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}>
            פירוט אירועים
          </Typography>
          <Box sx={{ 
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: 4
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)',
              borderRadius: 4
            }
          }}>
            <Table sx={{ minWidth: { xs: 800, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>שם האירוע</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>תאריך</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>כמות קרונות</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>סבסוד למשתתף</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>משתתפים בפועל</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>תקציב מקסימלי</TableCell>
                  <TableCell sx={{ fontWeight: 700, background: 'rgba(194,65,107,0.1)', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>הוצאה בפועל</TableCell>
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
                  >                    <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{e.title}</TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{e.date ? new Date(e.date).toLocaleDateString('he-IL') : '-'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={e.subsidy ? `${e.subsidy} CZK` : '-'}
                        size="small"
                        sx={{ 
                          background: e.subsidy ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : 'rgba(0,0,0,0.1)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: { xs: '0.65rem', sm: '0.75rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={e.subsidy ? `${e.subsidy} CZK` : '-'}
                        size="small"
                        sx={{ 
                          background: e.subsidy ? 'linear-gradient(135deg, #ff9a56 0%, #c2416b 100%)' : 'rgba(0,0,0,0.1)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: { xs: '0.65rem', sm: '0.75rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {e.participants ? e.participants.length : 0}
                        </Typography>
                        {e.maxParticipants && (
                          <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            / {e.maxParticipants}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {e.maxParticipants && e.subsidy
                          ? `${(parseInt(e.maxParticipants) * parseFloat(e.subsidy)).toLocaleString()} CZK`
                          : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#d32f2f', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {e.participants && e.subsidy
                          ? `${(e.participants.length * parseFloat(e.subsidy)).toLocaleString()} CZK`
                          : '0 CZK'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>        </Paper>

        {/* Monthly Budget Dialog */}
        <Dialog 
          open={budgetDialog.open} 
          onClose={() => setBudgetDialog({ open: false, month: '', budget: '' })}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              boxShadow: '0 20px 40px rgba(156,39,176,0.3)'
            }
          }}
        >
          <DialogTitle sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#4a148c',
            pb: 1
          }}>
            💰 הגדרת תקציב חודשי
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#4a148c', fontWeight: 600 }}>
                {getMonthName(budgetDialog.month)}
              </Typography>
            </Box>
            <TextField
              autoFocus
              fullWidth
              label="תקציב (CZK)"
              type="number"
              value={budgetDialog.budget}
              onChange={(e) => setBudgetDialog(prev => ({ ...prev, budget: e.target.value }))}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: 'rgba(156,39,176,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(156,39,176,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9c27b0',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#4a148c',
                  '&.Mui-focused': {
                    color: '#9c27b0',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button 
              onClick={() => setBudgetDialog({ open: false, month: '', budget: '' })}
              variant="outlined"
              sx={{
                borderColor: 'rgba(156,39,176,0.5)',
                color: '#9c27b0',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  borderColor: '#9c27b0',
                  background: 'rgba(156,39,176,0.05)',
                }
              }}
            >
              ביטול
            </Button>
            <Button 
              onClick={handleSetMonthlyBudget}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                fontWeight: 700,
                borderRadius: 3,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #8e24aa 0%, #5e35b1 100%)',
                }
              }}
            >
              💾 שמור
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default BudgetDashboard;
