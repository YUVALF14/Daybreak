import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, 
  Card, CardContent, LinearProgress, Chip, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, IconButton, Grid
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useEvents } from '../context/EventsContext';

function BudgetDashboard({ onBack }) {
  const { events } = useEvents();
  
  // State for current viewing month
  const [currentViewMonth, setCurrentViewMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  // State for monthly budgets
  const [monthlyBudgets, setMonthlyBudgets] = useState(() => {
    const saved = localStorage.getItem('monthlyBudgets');
    return saved ? JSON.parse(saved) : {};
  });
  
  // State for total budget pool
  const [totalBudgetPool, setTotalBudgetPool] = useState(() => {
    const saved = localStorage.getItem('totalBudgetPool');
    return saved ? parseFloat(saved) : 0;
  });  // Dialog states
  const [budgetDialog, setBudgetDialog] = useState({ open: false, month: '', budget: '' });
  const [totalBudgetDialog, setTotalBudgetDialog] = useState({ open: false, amount: '' });
  // Save to localStorage whenever budgets change
  useEffect(() => {
    localStorage.setItem('monthlyBudgets', JSON.stringify(monthlyBudgets));
  }, [monthlyBudgets]);

  useEffect(() => {
    localStorage.setItem('totalBudgetPool', totalBudgetPool.toString());
  }, [totalBudgetPool]);

  // Get current actual month (for current month detection)
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // Month navigation functions
  const navigateMonth = (direction) => {
    const [year, month] = currentViewMonth.split('-').map(Number);
    const date = new Date(year, month - 1);
    date.setMonth(date.getMonth() + direction);
    setCurrentViewMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  // Get month name in Hebrew
  const getMonthName = (monthKey) => {
    const [year, month] = monthKey.split('-');
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Calculate expenses for a specific month
  const getMonthExpenses = (monthKey) => {
    return events
      .filter(e => {
        if (!e.date || !e.participants || !e.subsidy) return false;
        const eventDate = new Date(e.date);
        const eventMonth = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
        return eventMonth === monthKey;
      })
      .reduce((sum, e) => sum + (e.participants.length * parseFloat(e.subsidy)), 0);
  };

  // Calculate total expenses across all months
  const getTotalExpenses = () => {
    return events.reduce((sum, e) =>
      sum + ((e.participants && e.subsidy) ? (e.participants.length * parseFloat(e.subsidy)) : 0), 0
    );
  };

  // Calculate total allocated budget across all months
  const getTotalAllocatedBudget = () => {
    return Object.values(monthlyBudgets).reduce((sum, budget) => sum + budget, 0);
  };

  // Calculate remaining budget pool (total budget - allocated budgets)
  const getRemainingBudgetPool = () => {
    return totalBudgetPool - getTotalAllocatedBudget();
  };

  // Calculate cumulative leftover budget up to a specific month
  const getCumulativeLeftover = (upToMonth) => {
    const [upToYear, upToMonthNum] = upToMonth.split('-').map(Number);
    let cumulative = 0;
    
    // Get all months from the beginning of data up to the specified month
    const allMonths = Object.keys(monthlyBudgets).sort();
    
    for (const month of allMonths) {
      const [year, monthNum] = month.split('-').map(Number);
      if (year < upToYear || (year === upToYear && monthNum < upToMonthNum)) {
        const monthBudget = monthlyBudgets[month] || 0;
        const monthExpenses = getMonthExpenses(month);
        cumulative += (monthBudget - monthExpenses);
      }
    }
    
    return cumulative;
  };

  // Current viewing month data
  const currentMonthBudget = monthlyBudgets[currentViewMonth] || 0;
  const currentMonthExpenses = getMonthExpenses(currentViewMonth);
  const currentMonthBalance = currentMonthBudget - currentMonthExpenses;
  const currentMonthUsage = currentMonthBudget > 0 ? (currentMonthExpenses / currentMonthBudget) * 100 : 0;
  const cumulativeLeftover = getCumulativeLeftover(currentViewMonth);
  const effectiveCurrentBalance = currentMonthBalance + cumulativeLeftover;
  // Handler functions
  const handleSetMonthlyBudget = () => {
    if (budgetDialog.budget && parseFloat(budgetDialog.budget) > 0) {
      setMonthlyBudgets(prev => ({
        ...prev,
        [budgetDialog.month]: parseFloat(budgetDialog.budget)
      }));
    }
    setBudgetDialog({ open: false, month: '', budget: '' });
  };

  const handleSetTotalBudget = () => {
    if (totalBudgetDialog.amount && parseFloat(totalBudgetDialog.amount) >= 0) {
      setTotalBudgetPool(parseFloat(totalBudgetDialog.amount));
    }
    setTotalBudgetDialog({ open: false, amount: '' });
  };

  const openBudgetDialog = (month = currentViewMonth) => {
    setBudgetDialog({
      open: true,
      month,
      budget: monthlyBudgets[month]?.toString() || ''
    });
  };

  const openTotalBudgetDialog = () => {
    setTotalBudgetDialog({
      open: true,
      amount: totalBudgetPool.toString()
    });
  };
  // Get current month events for table
  const getCurrentMonthEvents = () => {
    return events.filter(e => {
      if (!e.date) return false;
      const eventDate = new Date(e.date);
      const eventMonth = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
      return eventMonth === currentViewMonth;
    });  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: { xs: 2, sm: 3 },
        direction: 'rtl'
      }}
    >
      <Box
        sx={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          padding: { xs: 3, sm: 4 },
          maxWidth: 1200,
          margin: '0 auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >        {/* Professional Header with Tools */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 3, sm: 0 },
          pb: 3,
          borderBottom: '2px solid #e0e7ff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
              }}
            >
              <AssessmentIcon sx={{ color: 'white', fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            </Box>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#1e293b',
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                מערכת ניהול תקציב
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 500,
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                מעקב וניתוח פיננסי מתקדם
              </Typography>
              
              {/* Month Navigation */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mt: 2,
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}>
                <IconButton 
                  onClick={() => navigateMonth(-1)}
                  sx={{
                    background: '#f1f5f9',
                    color: '#475569',
                    width: { xs: 35, sm: 40 },
                    height: { xs: 35, sm: 40 },
                    '&:hover': {
                      background: '#e2e8f0',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                </IconButton>
                
                <Paper sx={{ 
                  px: { xs: 2, sm: 3 }, 
                  py: 1, 
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 2,
                  minWidth: { xs: 140, sm: 160 }
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#334155',
                    textAlign: 'center',
                    fontSize: { xs: '0.95rem', sm: '1.1rem' }
                  }}>
                    {getMonthName(currentViewMonth)}
                  </Typography>
                  {currentViewMonth === getCurrentMonth() && (
                    <Chip 
                      label="נוכחי" 
                      size="small"
                      sx={{ 
                        background: '#dcfce7',
                        color: '#166534',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  )}
                </Paper>
                
                <IconButton 
                  onClick={() => navigateMonth(1)}
                  sx={{
                    background: '#f1f5f9',
                    color: '#475569',
                    width: { xs: 35, sm: 40 },
                    height: { xs: 35, sm: 40 },
                    '&:hover': {
                      background: '#e2e8f0',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Professional Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexDirection: { xs: 'row', sm: 'row' }, 
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-end' }          }}>
            {/* Back Button */}
            <Button
              variant="contained"
              onClick={onBack}
              sx={{
                background: '#64748b',
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                '&:hover': {
                  background: '#475569'
                }
              }}
            >
              חזרה
            </Button>
          </Box>
        </Box>{/* Enhanced Budget Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Total Budget Pool */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', 
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 12px 24px rgba(25,118,210,0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(25,118,210,0.4)'
              }
            }}
            onClick={openTotalBudgetDialog}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <SavingsIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  סה"כ תקציב
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {totalBudgetPool.toLocaleString()} CZK
                </Typography>
                <EditIcon sx={{ fontSize: '1rem', mt: 1, opacity: 0.7 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Current Month Budget */}
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>

          {/* Monthly Expenses */}
          <Grid item xs={12} sm={6} md={3}>
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
                <TrendingDownIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  הוצאות החודש
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {currentMonthExpenses.toLocaleString()} CZK
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Effective Balance (including carryover) */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: effectiveCurrentBalance >= 0 
                ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)' 
                : 'linear-gradient(135deg, #f44336 0%, #c62828 100%)', 
              color: 'white',
              borderRadius: 4,
              boxShadow: effectiveCurrentBalance >= 0 
                ? '0 12px 24px rgba(76,175,80,0.3)' 
                : '0 12px 24px rgba(244,67,54,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: effectiveCurrentBalance >= 0 
                  ? '0 20px 40px rgba(76,175,80,0.4)' 
                  : '0 20px 40px rgba(244,67,54,0.4)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <EventAvailableIcon sx={{ fontSize: '3rem', mb: 1, opacity: 0.9 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  יתרה כוללת
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {effectiveCurrentBalance.toLocaleString()} CZK
                </Typography>
                {cumulativeLeftover !== 0 && (
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                    יתרה מחודשים קודמים: {cumulativeLeftover.toLocaleString()} CZK
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Budget Pool Summary */}
        <Paper sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '2px solid rgba(25,118,210,0.2)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1565c0' }}>
            סיכום תקציב כללי
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  סה"כ תקציב
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0d47a1' }}>
                  {totalBudgetPool.toLocaleString()} CZK
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  תקציב מוקצה
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0d47a1' }}>
                  {getTotalAllocatedBudget().toLocaleString()} CZK
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  סה"כ הוצאות
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0d47a1' }}>
                  {getTotalExpenses().toLocaleString()} CZK
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  נותר בפול
                </Typography>
                <Typography variant="h5" sx={{ 
                  fontWeight: 800, 
                  color: getRemainingBudgetPool() >= 0 ? '#2e7d32' : '#d32f2f' 
                }}>
                  {getRemainingBudgetPool().toLocaleString()} CZK
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>        {/* Enhanced Monthly Budget Progress */}
        {currentMonthBudget > 0 && (
          <Paper sx={{ p: 3, mb: 4, borderRadius: 4, background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#4a148c' }}>
                מעקב תקציב חודשי - {getMonthName(currentViewMonth)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                <Chip 
                  label={`${currentMonthUsage.toFixed(1)}%`}
                  sx={{ 
                    background: currentMonthUsage > 80 ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                    color: 'white',
                    fontWeight: 700
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: currentMonthBalance >= 0 ? '#2e7d32' : '#d32f2f' }}>
                  יתרה חודשית: {currentMonthBalance.toLocaleString()} CZK
                </Typography>
                {cumulativeLeftover !== 0 && (
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1565c0' }}>
                    + יתרה מחודשים קודמים: {cumulativeLeftover.toLocaleString()} CZK
                  </Typography>
                )}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
              <Typography variant="body2" sx={{ color: '#4a148c', fontWeight: 600 }}>
                הוצאות החודש: {currentMonthExpenses.toLocaleString()} CZK
              </Typography>
              <Typography variant="body2" sx={{ color: '#4a148c', fontWeight: 600 }}>
                תקציב חודשי: {currentMonthBudget.toLocaleString()} CZK
              </Typography>
            </Box>
            {effectiveCurrentBalance !== currentMonthBalance && (
              <Box sx={{ mt: 2, p: 2, background: 'rgba(25,118,210,0.1)', borderRadius: 3 }}>
                <Typography variant="body2" sx={{ color: '#1565c0', fontWeight: 600, textAlign: 'center' }}>
                  יתרה כוללת (כולל חודשים קודמים): {effectiveCurrentBalance.toLocaleString()} CZK
                </Typography>
              </Box>
            )}
          </Paper>
        )}{/* Event Details Table */}
        <Paper sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
        }}>          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: '#495057',
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}>
            פירוט אירועים - {getMonthName(currentViewMonth)}
          </Typography><Box sx={{ 
            overflowX: 'auto',
            maxWidth: '100%',
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
            <Table sx={{ minWidth: { xs: 'auto', sm: 'auto' } }}>
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
              </TableHead>              <TableBody>
                {getCurrentMonthEvents().map((e, index) => (
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
          </Box>        </Paper>        {/* Monthly Budget Dialog */}
        <Dialog 
          open={budgetDialog.open} 
          onClose={() => setBudgetDialog({ open: false, month: '', budget: '' })}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              boxShadow: '0 20px 40px rgba(156,39,176,0.3)',
              direction: 'rtl'
            }
          }}
        >
          <DialogTitle sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#4a148c',
            pb: 1
          }}>
            הגדרת תקציב חודשי
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
              label="תקציב חודשי (CZK)"
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
              שמור
            </Button>
          </DialogActions>
        </Dialog>

        {/* Total Budget Pool Dialog */}
        <Dialog 
          open={totalBudgetDialog.open} 
          onClose={() => setTotalBudgetDialog({ open: false, amount: '' })}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              boxShadow: '0 20px 40px rgba(25,118,210,0.3)',
              direction: 'rtl'
            }
          }}
        >
          <DialogTitle sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#0d47a1',
            pb: 1
          }}>
            הגדרת סך התקציב הכללי
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ color: '#1565c0', fontWeight: 600 }}>
                הגדר את סך התקציב הכללי עבור כל השנה
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2', mt: 1 }}>
                תקציב זה ישמש כמאגר לחלוקה חודשית
              </Typography>
            </Box>
            <TextField
              autoFocus
              fullWidth
              label="סך התקציב הכללי (CZK)"
              type="number"
              value={totalBudgetDialog.amount}
              onChange={(e) => setTotalBudgetDialog(prev => ({ ...prev, amount: e.target.value }))}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: 'rgba(25,118,210,0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(25,118,210,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#0d47a1',
                  '&.Mui-focused': {
                    color: '#1976d2',
                  },
                },
              }}
            />
            <Box sx={{ mt: 3, p: 2, background: 'rgba(25,118,210,0.1)', borderRadius: 3 }}>
              <Typography variant="body2" sx={{ color: '#1565c0', fontWeight: 600 }}>
                📊 סטטוס נוכחי:
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2' }}>
                • תקציב מוקצה: {getTotalAllocatedBudget().toLocaleString()} CZK
              </Typography>
              <Typography variant="body2" sx={{ color: '#1976d2' }}>
                • נותר לחלוקה: {(parseFloat(totalBudgetDialog.amount || totalBudgetPool) - getTotalAllocatedBudget()).toLocaleString()} CZK
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button 
              onClick={() => setTotalBudgetDialog({ open: false, amount: '' })}
              variant="outlined"
              sx={{
                borderColor: 'rgba(25,118,210,0.5)',
                color: '#1976d2',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  borderColor: '#1976d2',
                  background: 'rgba(25,118,210,0.05)',
                }
              }}
            >
              ביטול
            </Button>
            <Button 
              onClick={handleSetTotalBudget}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                fontWeight: 700,
                borderRadius: 3,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                }
              }}
            >
              שמור
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default BudgetDashboard;
