import { createTheme } from '@mui/material/styles';

// Custom D&D theme with dark colors and medieval/fantasy styling
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b59e5f', // Gold/brass color for primary elements
      light: '#e8d18f',
      dark: '#8c7135',
      contrastText: '#000',
    },
    secondary: {
      main: '#7b302e', // Deep burgundy/red - dragon color
      light: '#a04f4d',
      dark: '#561c1a',
      contrastText: '#fff',
    },
    background: {
      default: '#2c2826', // Dark parchment/leather color
      paper: '#3b3734', // Slightly lighter than default for cards
    },
    text: {
      primary: '#e8e0d2', // Off-white for main text
      secondary: '#b59e5f', // Gold for secondary text
    },
    error: {
      main: '#a12d2a', // Blood red
    },
    warning: {
      main: '#ffa726', // Orange flame
    },
    info: {
      main: '#5b8da7', // Misty blue
    },
    success: {
      main: '#5d815f', // Forest green
    },
    divider: '#5a5047', // Dark divider color
  },
  typography: {
    fontFamily: '"Cinzel", "MedievalSharp", "Luminari", "Georgia", serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h4: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(59, 55, 52, 0.95), rgba(44, 40, 38, 0.95))',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#5a4e40',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#b59e5f',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        contained: {
          background: 'linear-gradient(145deg, #b59e5f, #866f33)',
          '&:hover': {
            background: 'linear-gradient(145deg, #c5ae6f, #967f43)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(35, 32, 30, 0.7)',
          borderColor: '#5a4e40',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#5a4e40',
            },
            '&:hover fieldset': {
              borderColor: '#b59e5f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b59e5f',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#b59e5f',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#b59e5f',
        },
      },
    },
  },
});

export default theme;
