// client/src/components/DungeonForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { Dungeon, Room } from '../types';
import { getWeek } from 'date-fns';
import RoomForm from './RoomForm';

interface DungeonFormProps {
  onSubmit: (dungeon: Dungeon) => void;
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>
  ) => {
    const { name, value } = event.target;
    setDungeon({
      ...dungeon,
      [name]: name === 'week_number' ? Number(value) : value,
    });
  };

  const handleRoomChange = (room: Room) => {
    setFirstRoom(room);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(dungeon);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create a New Dungeon
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          margin="normal"
          id="weekNumber"
          name="weekNumber"
          label="Week Number"
          value={dungeon.weekNumber}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        id="name"
        name="name"
        label="Dungeon Level"
        value={dungeon.level}
        onChange={handleChange}
      />

      <Typography variant="h6" gutterBottom>
        Starting Room
      </Typography>
      <RoomForm onSubmit={handleRoomChange} initialRoom={firstRoom} />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create Dungeon
      </Button>
    </Box>
  );
};

export default DungeonForm;
