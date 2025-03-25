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
            D&D Dungeon Mapper
          </Typography>
          <Routes>
            <Route path="/mapper" element={<MapperPage />} />
            {/* Add more routes here */}
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
