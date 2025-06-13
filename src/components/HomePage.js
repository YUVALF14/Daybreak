import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 25%, #c2416b 75%, #8b1538 100%)',
        padding: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,154,86,0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >      <Box
        sx={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(25px)',
          borderRadius: 8,
          padding: { xs: 5, sm: 7 },
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(255,154,86,0.25), 0 15px 30px rgba(139,21,56,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          position: 'relative',
          zIndex: 1
        }}
      >        {/* Premium Icon */}
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 50%, #8b1538 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px auto',
            boxShadow: '0 18px 40px rgba(255,154,86,0.5), 0 8px 16px rgba(139,21,56,0.3)',
            position: 'relative',
            '&::before': {
              content: '"🌅"',
              fontSize: '2.4rem',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,154,86,0.3) 0%, rgba(194,65,107,0.2) 100%)',
              zIndex: -1,
              filter: 'blur(8px)'
            }
          }}
        />

        <Typography 
          variant="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 900,
            background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.8rem', sm: '3.8rem' },
            letterSpacing: '-0.03em',
            textShadow: '0 4px 8px rgba(139,21,56,0.1)'
          }}
        >
          DAYBREAK
        </Typography>        
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 5, 
            color: '#8b5a3c',
            fontWeight: 600,
            lineHeight: 1.7,
            fontSize: { xs: '1.15rem', sm: '1.3rem' },
            textAlign: 'center',
            maxWidth: 400,
            margin: '0 auto 40px auto'
          }}
        >
          מערכת קהילתית לניהול אירועים<br />
          <span style={{ color: '#c2416b', fontWeight: 700 }}>הקהילה הישראלית הצעירה בפראג</span>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, alignItems: 'center', width: '100%' }}>          <Button
            onClick={() => navigate('/admin-login')}
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              maxWidth: 380,
              py: 2.5,
              px: 5,
              fontSize: '1.25rem',
              fontWeight: 800,
              borderRadius: 5,
              background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 100%)',
              boxShadow: '0 12px 28px rgba(194,65,107,0.4), 0 6px 12px rgba(139,21,56,0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.6s'
              },
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 20px 40px rgba(194,65,107,0.5), 0 10px 20px rgba(139,21,56,0.3)',
                background: 'linear-gradient(135deg, #d1537a 0%, #9c1e47 100%)',
                '&::before': {
                  left: '100%'
                }
              }
            }}
          >
            🔐 כניסת מנהלים
          </Button>          
          <Button
            onClick={() => navigate('/community')}
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              maxWidth: 380,
              py: 2.5,
              px: 5,
              fontSize: '1.25rem',
              fontWeight: 800,
              borderRadius: 5,
              background: 'linear-gradient(135deg, #ff9a56 0%, #ffad56 100%)',
              boxShadow: '0 12px 28px rgba(255,154,86,0.4), 0 6px 12px rgba(255,173,86,0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transition: 'left 0.6s'
              },
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 20px 40px rgba(255,154,86,0.5), 0 10px 20px rgba(255,173,86,0.3)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #ffbc5d 100%)',
                '&::before': {
                  left: '100%'
                }
              }
            }}
          >
            🎉 צפייה באירועים
          </Button>            <Button
            onClick={() => window.open('https://wa.me/972542230342', '_blank')}
            variant="outlined"
            size="large"
            sx={{
              width: '100%',
              maxWidth: 380,
              py: 2.5,
              px: 5,
              fontSize: '1.25rem',
              fontWeight: 800,
              borderRadius: 5,
              border: '3px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #25D366 0%, #128C7E 100%) border-box',
              color: '#075E54',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(37,211,102,0.1), transparent)',
                transition: 'left 0.6s'
              },
              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: 'white',
                boxShadow: '0 20px 40px rgba(37,211,102,0.4), 0 10px 20px rgba(18,140,126,0.2)',
                '&::before': {
                  left: '100%'
                }
              }
            }}
          >
            � צור קשר בוואטסאפ
          </Button>
        </Box>        <Typography 
          variant="body2" 
          sx={{ 
            mt: 5, 
            color: '#b8906d',
            fontSize: '0.95rem',
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.6
          }}
        >
          © 2025 YJCC Prague Events System<br />
          <span style={{ color: '#c2416b', fontSize: '0.9rem' }}>נעשה ב❤️ למען הקהילה הישראלית בפראג</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
