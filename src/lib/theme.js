'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#22D3EE',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: '"DM Sans", "Syne", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
          padding: '10px 24px',
        },
        contained: {
          background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
          boxShadow: '0 4px 24px rgba(99, 102, 241, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)',
            boxShadow: '0 6px 32px rgba(99, 102, 241, 0.5)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.04)',
            '& fieldset': { borderColor: '#334155' },
            '&:hover fieldset': { borderColor: '#6366F1' },
            '&.Mui-focused fieldset': { borderColor: '#6366F1', borderWidth: '1.5px' },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '20px',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '24px',
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '16px',
          backgroundImage: 'none',
        },
      },
    },
  },
});
