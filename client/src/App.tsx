// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography, Box, useTheme } from '@mui/material';
import MapperPage from './pages/MapperPage';
import './App.css';

function App() {
  const theme = useTheme();

  return (
    <Router>
      <Container maxWidth="md" className="app-container">
        <Box sx={{
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: theme.palette.primary.light,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            <img src="/dungeon.svg" height="36" alt="Dungeon" style={{ position: 'relative', top: 8, marginRight: 8 }} />
            D&D Dungeon Mapper
            <img src="/dragon.png" height="36" alt="Dragon" style={{ position: 'relative', top: 8, marginLeft: 8 }} />
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              fontSize: '1.1rem',
              justifyContent: 'center'
            }}
            className="nav-links"
          >
            <a href="/mapper">Mapper</a> <a href="/crawler">Crawler</a>
          </Box>
        </Box>
        <Routes>
          <Route path="/mapper" element={<MapperPage />} />
          <Route path="/" element={<MapperPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
