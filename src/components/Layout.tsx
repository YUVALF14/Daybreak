import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f5f5f7 0%, #fff 100%)',
        animation: 'bgMove 12s ease-in-out infinite alternate',
        transition: 'background 1s',
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          px: { xs: 1, sm: 4 },
          py: 1,
          borderBottom: '1px solid #eaeaea',
        }}
      >
        <Toolbar
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            minHeight: 72,
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="/favicon.ico"
              alt="logo"
              sx={{ mr: 2, bgcolor: '#fff', width: 48, height: 48, boxShadow: 1 }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                fontFamily: 'SF Pro Display, Heebo, Assistant, sans-serif',
                color: '#1d1d1f',
                fontSize: { xs: '1.5rem', sm: '2.1rem' },
                userSelect: 'none',
                textAlign: 'center',
                flexGrow: 1,
                ml: 2,
              }}
            >
              DAYBREAK
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
              ml: 2,
            }}
          >
            <Button
              color="primary"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 700,
                fontSize: '1.08rem',
                borderRadius: 99,
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #0071e3 0%, #34c759 100%)',
                color: '#fff',
                boxShadow: 2,
                mr: { xs: 0, sm: 1 },
              }}
              aria-label="דף הבית"
            >
              דף הבית
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate('/admin-login')}
              sx={{
                fontWeight: 700,
                fontSize: '1.08rem',
                borderRadius: 99,
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
                color: '#0071e3',
                boxShadow: 2,
                ml: { xs: 0, sm: 1 },
              }}
              aria-label="כניסת מנהלים"
            >
              כניסת מנהלים
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate('/participants')}
              sx={{
                fontWeight: 700,
                fontSize: '1.08rem',
                borderRadius: 99,
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #f5f5f7 0%, #eaf6ff 100%)',
                color: '#0071e3',
                boxShadow: 2,
                ml: { xs: 0, sm: 1 },
              }}
              aria-label="כניסת משתתפים"
            >
              כניסת משתתפים
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          mt: 6,
          mb: 6,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          bgcolor: '#f5f5f7',
          textAlign: 'center',
          mt: 'auto',
          opacity: 0.97,
          borderTop: '1px solid #eaeaea',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: 'SF Pro Display, Assistant, sans-serif' }}
        >
          © {new Date().getFullYear()} DAYBREAK. כל הזכויות שמורות.
        </Typography>
      </Box>
      <style>
        {`
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Layout;