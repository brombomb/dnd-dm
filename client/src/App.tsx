// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import MapperPage from './pages/MapperPage';

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            <img src="/dungeon.svg" height="64" alt="Dungeon" style={{ position: 'relative', top: 16 }} />&nbsp;
              D&D Dungeon Mapper
            &nbsp;<img src="/dungeon.svg" height="64" alt="Dungeon" style={{ position: 'relative',  top: 16 }} />
          </Typography>
            <a href="/mapper">Mapper</a> | <a href="/crawler">Crawler</a>
          <Routes>
            <Route path="/mapper" element={<MapperPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
