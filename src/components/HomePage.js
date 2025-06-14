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
        padding: { xs: 2, sm: 4 },
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
        }      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(25px)',
          borderRadius: { xs: 6, sm: 8 },
          padding: { xs: 3, sm: 5, md: 7 },
          maxWidth: { xs: '95%', sm: 520 },
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(255,154,86,0.25), 0 15px 30px rgba(139,21,56,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.3)',
          position: 'relative',
          zIndex: 1,
          animation: 'slideUp 0.8s ease-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,154,86,0.05) 100%)',
            pointerEvents: 'none'
          },
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
      >        {/* Premium Icon */}        <Box
          sx={{
            width: { xs: 70, sm: 90 },
            height: { xs: 70, sm: 90 },
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff9a56 0%, #c2416b 50%, #8b1538 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: { xs: '0 auto 20px auto', sm: '0 auto 28px auto' },
            boxShadow: '0 18px 40px rgba(255,154,86,0.5), 0 8px 16px rgba(139,21,56,0.3)',
            position: 'relative',
            animation: 'pulse 2s ease-in-out infinite',
            '&::before': {
              content: '"🌅"',
              fontSize: { xs: '2rem', sm: '2.4rem' },
              animation: 'bounce 2s ease-in-out infinite',
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
              filter: 'blur(8px)',
              animation: 'rotate 8s linear infinite'
            },
            '@keyframes pulse': {
              '0%, 100%': { 
                transform: 'scale(1)',
                boxShadow: '0 18px 40px rgba(255,154,86,0.5), 0 8px 16px rgba(139,21,56,0.3)'
              },
              '50%': { 
                transform: 'scale(1.05)',
                boxShadow: '0 22px 50px rgba(255,154,86,0.6), 0 12px 24px rgba(139,21,56,0.4)'
              }
            },
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-3px)' }
            },
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}
        />        <Typography 
          variant="h2" 
          sx={{ 
            mb: { xs: 2, sm: 3 }, 
            fontWeight: 900,
            background: 'linear-gradient(135deg, #c2416b 0%, #8b1538 60%, #ff9a56 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.8rem' },
            letterSpacing: '-0.03em',
            textShadow: '0 1px 2px rgba(139,21,56,0.05)',
            position: 'relative',
            animation: 'textGlow 3s ease-in-out infinite alternate',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #c2416b, transparent)',
              borderRadius: '2px',
              animation: 'underlineGrow 2s ease-out 0.5s both'
            },
            '@keyframes textGlow': {
              '0%': { 
                filter: 'drop-shadow(0 0 5px rgba(194,65,107,0.3))'
              },
              '100%': { 
                filter: 'drop-shadow(0 0 15px rgba(194,65,107,0.5))'
              }
            },
            '@keyframes underlineGrow': {
              '0%': { 
                width: '0px',
                opacity: 0
              },
              '100%': { 
                width: '60px',
                opacity: 1
              }
            }
          }}
        >
          DAYBREAK
        </Typography>        <Typography 
          variant="h6" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 5 }, 
            color: '#8b5a3c',
            fontWeight: 600,
            lineHeight: 1.7,
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
            textAlign: 'center',
            maxWidth: { xs: '100%', sm: 400 },
            margin: { xs: '0 auto 24px auto', sm: '0 auto 32px auto', md: '0 auto 40px auto' },
            px: { xs: 1, sm: 0 }
          }}
        >
          מערכת קהילתית לניהול אירועים<br />
          <span style={{ color: '#c2416b', fontWeight: 700, fontSize: 'inherit' }}>הקהילה הישראלית הצעירה בפראג</span>
        </Typography>        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 2.5, sm: 3, md: 3.5 }, 
          alignItems: 'center', 
          width: '100%',
          '& > button': {
            animation: 'fadeInUp 0.6s ease-out both',
            '&:nth-of-type(1)': { animationDelay: '0.2s' },
            '&:nth-of-type(2)': { animationDelay: '0.4s' },
            '&:nth-of-type(3)': { animationDelay: '0.6s' }
          },
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(20px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}>          <Button
            onClick={() => navigate('/admin-login')}
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 380 },
              py: { xs: 2, sm: 2.5 },
              px: { xs: 3, sm: 5 },              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 800,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
              },              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 20px 40px rgba(194,65,107,0.5), 0 10px 20px rgba(139,21,56,0.3)',
                background: 'linear-gradient(135deg, #d1537a 0%, #9c1e47 100%)',
                '&::before': {
                  left: '100%'
                }
              }
            }}
          >
            כניסת מנהלים 🔐
          </Button>          <Button
            onClick={() => navigate('/community')}
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 380 },
              py: { xs: 2, sm: 2.5 },
              px: { xs: 3, sm: 5 },              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 800,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
              },              '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: '0 20px 40px rgba(255,154,86,0.5), 0 10px 20px rgba(255,173,86,0.3)',
                background: 'linear-gradient(135deg, #ff8a3d 0%, #ffbc5d 100%)',
                '&::before': {
                  left: '100%'
                }
              }
            }}          >
             צפייה באירועים 🎉
          </Button>          <Button
            onClick={() => window.open('https://wa.me/972542230342', '_blank')}
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 380 },
              py: { xs: 2, sm: 2.5 },
              px: { xs: 3, sm: 5 },              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 800,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              borderRadius: 5,
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important',
              color: 'white !important',
              boxShadow: '0 12px 28px rgba(37,211,102,0.4), 0 6px 12px rgba(18,140,126,0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              border: 'none',
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
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important',
                color: 'white !important',
                boxShadow: '0 20px 40px rgba(37,211,102,0.5), 0 10px 20px rgba(18,140,126,0.3)',                '&::before': {
                  left: '100%'
                },                '&::after': {
                  content: '"�"',
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  animation: 'sparkle 0.6s ease-out'
                }
              },
              '&:focus': {
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important',
                color: 'white !important'
              },
              '&:active': {
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important',
                color: 'white !important'
              }
            }}
          >
             צור קשר בוואטסאפ 📱
          </Button>
        </Box>        <Typography 
          variant="body2" 
          sx={{ 
            mt: { xs: 3, sm: 4, md: 5 }, 
            color: '#b8906d',
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.6,
            animation: 'fadeIn 1s ease-out 1s both',
            px: { xs: 2, sm: 0 },
            '& span': {
              animation: 'heartbeat 2s ease-in-out infinite',
            },
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            },
            '@keyframes heartbeat': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' }
            }
          }}
        >
          © 2025 YJCC Prague Events System<br />
          <span style={{ color: '#c2416b', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>נעשה ב❤️ למען הקהילה הישראלית בפראג</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
