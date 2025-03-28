import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Paper, 
  Typography, 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  CircularProgress,
  Fade,
  IconButton,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import io from 'socket.io-client';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9d',
    },
    secondary: {
      main: '#ff00ff',
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, #001e3c 30%, #0a1929 90%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

const socket = io('http://localhost:5003');

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userId = 'user-' + Math.random().toString(36).substr(2, 9);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { 
        text: data.message, 
        sender: 'bot',
        timestamp: data.timestamp 
      }]);
    });

    socket.on('error', (data) => {
      console.error('Error:', data.message);
      setIsTyping(false);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('error');
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newMessage]);
      setIsTyping(true);
      socket.emit('sendMessage', { message, userId });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const chatInterface = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        zIndex: 1,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(45deg, #00ff9d, #ff00ff)',
          borderRadius: '4px',
        },
      }}>
        {chatHistory.map((msg, index) => (
          <Fade in={true} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
                maxWidth: '85%',
                ml: msg.sender === 'user' ? 'auto' : '0',
                mr: msg.sender === 'user' ? '0' : 'auto'
              }}
            >
              {msg.sender === 'bot' && (
                <Box sx={{ 
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    background: 'radial-gradient(circle at 50% 50%, rgba(0,255,157,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                    animation: 'pulse 2s infinite'
                  }
                }}>
                  <SmartToyIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                </Box>
              )}
              {msg.sender === 'user' && (
                <Box sx={{ 
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                    animation: 'pulse 2s infinite'
                  }
                }}>
                  <PersonIcon sx={{ color: 'secondary.main', fontSize: 30 }} />
                </Box>
              )}
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '100%',
                  bgcolor: msg.sender === 'user' 
                    ? 'rgba(255,0,255,0.1)' 
                    : 'rgba(0,255,157,0.1)',
                  border: msg.sender === 'user'
                    ? '1px solid rgba(255,0,255,0.2)'
                    : '1px solid rgba(0,255,157,0.2)',
                  borderRadius: 3,
                  boxShadow: '0 0 20px rgba(0,255,157,0.1)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: msg.sender === 'user'
                      ? 'radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 100%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(0,255,157,0.1) 0%, transparent 100%)',
                    borderRadius: 3,
                    zIndex: -1,
                  }
                }}
              >
                <Typography variant="body1" sx={{ 
                  color: msg.sender === 'user' ? 'secondary.main' : 'primary.main',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  {msg.text}
                </Typography>
                <Typography variant="caption" sx={{ 
                  opacity: 0.7,
                  display: 'block',
                  mt: 1,
                  textAlign: 'right',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          </Fade>
        ))}
        {isTyping && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            ml: 1,
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <SmartToyIcon sx={{ color: 'primary.main' }} />
            <CircularProgress size={20} sx={{ color: 'primary.main' }} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(0,255,157,0.2)',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        bottom: 0,
        zIndex: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          maxWidth: '100%'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                '&.Mui-focused': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,255,157,0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,255,157,0.4)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'black',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
              minWidth: '48px',
              height: '48px'
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,255,157,0.2)',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at center, rgba(0,255,157,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: -1,
                animation: 'pulse 4s infinite'
              }
            }}>
              <SmartToyIcon sx={{ 
                color: 'primary.main', 
                fontSize: 40,
                animation: 'float 3s ease-in-out infinite'
              }} />
              <Typography 
                variant="h2" 
                sx={{ 
                  background: 'linear-gradient(45deg, #00ff9d, #ff00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(0,255,157,0.5)',
                  letterSpacing: '4px',
                  animation: 'glow 2s ease-in-out infinite',
                  fontFamily: 'Orbitron',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00ff9d, transparent)',
                    animation: 'glow 2s ease-in-out infinite'
                  }
                }}
              >
                ALUCHAT
              </Typography>
            </Box>
          </Container>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '80px',
            height: 'calc(100vh - 80px)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(0,255,157,0.1) 0%, rgba(255,0,255,0.1) 100%)',
              zIndex: 0,
            }
          }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0,255,157,0.15) 0%, rgba(255,0,255,0.15) 100%)',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(0,255,157,0.1) 0%, rgba(255,0,255,0.1) 100%)',
                zIndex: 0,
                animation: 'pulse 4s ease-in-out infinite'
              }
            }}
          >
            {chatInterface}
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
