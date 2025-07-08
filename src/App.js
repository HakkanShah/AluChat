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
  AppBar,
  Container,
  Avatar,
  Badge,
  Tooltip,
  Zoom,
  Fab,
  Snackbar,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import io from 'socket.io-client';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5003');

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
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
      setSnackbar({
        open: true,
        message: 'New message received!',
        severity: 'success'
      });
    });

    socket.on('error', (data) => {
      console.error('Error:', data.message);
      setIsTyping(false);
      setSnackbar({
        open: true,
        message: 'Error: ' + data.message,
        severity: 'error'
      });
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
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        zIndex: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '3px',
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
                maxWidth: { xs: '90%', sm: '85%' },
                ml: msg.sender === 'user' ? 'auto' : '0',
                mr: msg.sender === 'user' ? '0' : 'auto',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {msg.sender === 'bot' && (
                <Tooltip title="AI Assistant" TransitionComponent={Zoom}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#44b700',
                        color: '#44b700',
                        boxShadow: '0 0 0 2px #1e1e1e',
                        '&::after': {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          animation: 'ripple 1.2s infinite ease-in-out',
                          border: '1px solid currentColor',
                          content: '""',
                        },
                      },
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SmartToyIcon />
                    </Avatar>
                  </Badge>
                </Tooltip>
              )}
              {msg.sender === 'user' && (
                <Tooltip title="You" TransitionComponent={Zoom}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <PersonIcon />
                  </Avatar>
                </Tooltip>
              )}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: '100%',
                  bgcolor: msg.sender === 'user' 
                    ? 'rgba(245, 0, 87, 0.1)' 
                    : 'rgba(33, 150, 243, 0.1)',
                  border: msg.sender === 'user'
                    ? '1px solid rgba(245, 0, 87, 0.2)'
                    : '1px solid rgba(33, 150, 243, 0.2)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: msg.sender === 'user'
                      ? 'radial-gradient(circle at 50% 50%, rgba(245, 0, 87, 0.1) 0%, transparent 100%)'
                      : 'radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.1) 0%, transparent 100%)',
                    borderRadius: 3,
                    zIndex: -1,
                  }
                }}
              >
                <Typography variant="body1" sx={{ 
                  color: msg.sender === 'user' ? 'secondary.light' : 'primary.light',
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
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#44b700',
                  color: '#44b700',
                  boxShadow: '0 0 0 2px #1e1e1e',
                  '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""',
                  },
                },
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <SmartToyIcon />
              </Avatar>
            </Badge>
            <CircularProgress size={20} sx={{ color: 'primary.main' }} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        bottom: 0,
        zIndex: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          maxWidth: '100%',
          position: 'relative'
        }}>
          <Tooltip title="Add Emoji" TransitionComponent={Zoom}>
            <IconButton
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                }
              }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Tooltip>
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
                borderColor: 'rgba(255,255,255,0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          />
          <Tooltip title="Send Message" TransitionComponent={Zoom}>
            <IconButton
              onClick={handleSend}
              disabled={!message.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                minWidth: '48px',
                height: '48px',
                transition: 'all 0.3s ease'
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {showEmojiPicker && (
          <Paper
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              mb: 1,
              p: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 0.5,
              maxHeight: '200px',
              overflow: 'auto',
              bgcolor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease-in'
            }}
          >
            {['😀', '😂', '🤣', '😊', '😍', '🥰', '😘', '😎', '😭', '😤', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😢', '😭', '😤', '😡', '🤬'].map((emoji, index) => (
              <IconButton
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                sx={{
                  fontSize: '1.5rem',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {emoji}
              </IconButton>
            ))}
          </Paper>
        )}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            height: { xs: '60px', sm: '70px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(18, 18, 18, 0.9)',
            }
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              position: 'relative'
            }}>
              <Tooltip title="AI Assistant" TransitionComponent={Zoom}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#44b700',
                      color: '#44b700',
                      boxShadow: '0 0 0 2px #1e1e1e',
                      '&::after': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        animation: 'ripple 1.2s infinite ease-in-out',
                        border: '1px solid currentColor',
                        content: '""',
                      },
                    },
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  </Avatar>
                </Badge>
              </Tooltip>
              <Typography 
                variant={isMobile ? "h5" : "h4"}
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '1px',
                  background: 'linear-gradient(45deg, #2196f3, #f50057)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Poppins',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
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
            p: { xs: 1, sm: 3 },
            mt: { xs: '60px', sm: '70px' },
            height: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 70px)' },
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
              zIndex: 0,
            }
          }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: { xs: 0, sm: 4 },
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.1) 0%, rgba(245, 0, 87, 0.1) 100%)',
                zIndex: 0,
              }
            }}
          >
            {chatInterface}
          </Paper>
        </Box>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}


export default App;
