// client/src/components/DungeonForm.tsx
import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  SelectChangeEvent,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Dungeon, Room } from '../types';
import { getWeek } from 'date-fns';
import RoomForm from './RoomForm';

interface DungeonFormProps {
  onSubmit: (dungeon: Dungeon, firstRoom: Room) => void;
}

const DungeonForm: React.FC<DungeonFormProps> = ({ onSubmit }) => {
  const today = new Date();
  const weekNumber = getWeek(today, { weekStartsOn: 1 }); // Start week on Monday

  const [dungeon, setDungeon] = useState<Dungeon>({ weekNumber, level: 1 });
  const [firstRoom, setFirstRoom] = useState<Room>({
    roomNumber: 1,
    description: 'Starting Room',
    choices: [],
    isStart: true,
    isEnd: false,
    points: 0,
    items: '',
    monsters: '',
  });

  const handleLevelChange = (event: SelectChangeEvent) => {
    const value = parseInt(event.target.value, 10);
    setDungeon({
      ...dungeon,
      level: value
    });
  };

  const handleRoomChange = (room: Room) => {
    setFirstRoom(room);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(dungeon, firstRoom);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
        maxWidth: '100vw',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Card
        elevation={2}
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
              color: 'primary.main'
            }}
          >
            Create New Dungeon
          </Typography>

          <Grid container spacing={2}>
            <Grid size={6}>
              <FormControl fullWidth>
                <TextField
                  id="week-number"
                  label="Week Number"
                  name="weekNumber"
                  type="text"
                  value={dungeon.weekNumber}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: { xs: 48, sm: 48 },
                      '& fieldset': {
                        borderColor: 'rgba(181, 158, 95, 0.5)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(181, 158, 95, 0.8)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#b59e5f',
                      },
                      '&.Mui-disabled, &.MuiInputBase-readOnly': {
                        backgroundColor: 'rgba(35, 32, 30, 0.7)',
                        color: '#e8e0d2',
                        '& fieldset': {
                          borderColor: 'rgba(181, 158, 95, 0.5)',
                        },
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: 'rgba(232, 209, 143, 0.7)',
                      '&.Mui-focused': {
                        color: '#e8d18f',
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="level-select-label">Dungeon Level</InputLabel>
                <Select
                  labelId="level-select-label"
                  id="level"
                  name="level"
                  value={dungeon.level.toString()}
                  label="Dungeon Level"
                  onChange={handleLevelChange}
                  sx={{
                    height: { xs: 48, sm: 48 },
                    fontSize: { xs: '1rem', sm: '1rem' },
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '1rem', sm: '1rem' }
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                >
                  <MenuItem value="1">Level 1</MenuItem>
                  <MenuItem value="2">Level 2</MenuItem>
                  <MenuItem value="3">Level 3</MenuItem>
                  <MenuItem value="4">Level 4</MenuItem>
                  <MenuItem value="5">Level 5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        elevation={2}
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              fontWeight: 600,
              mb: 2,
              color: 'primary.main'
            }}
          >
            Room
          </Typography>
          <RoomForm onSubmit={handleRoomChange} initialRoom={firstRoom} dungeonLevel={dungeon.level} />
        </CardContent>
      </Card>

      <Box sx={{ position: 'sticky', bottom: 0, pt: 2, pb: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            height: { xs: 56, sm: 48 },
            fontSize: { xs: '1.125rem', sm: '1rem' },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          Create Dungeon
        </Button>
      </Box>
    </Box>
  );
};

export default DungeonForm;
