// client/src/components/RoomForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

import { ChoiceOption, Room } from '../types';

interface RoomFormProps {
  onSubmit: (room: Room) => void;
  initialRoom?: Room;
}

const StyledFormGroup = styled(FormGroup)({
  flexDirection: 'row', // Make checkboxes horizontal
});

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, initialRoom }) => {
  const [room, setRoom] = useState<Room>(initialRoom || {
    roomNumber: 1,
    description: '',
    choices: [],
    isStart: false,
    isEnd: false,
    points: 0,
    items: '',
    monsters: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setRoom((prevRoom) => {
      let newChoices = [...prevRoom.choices];
      if (checked) {
        newChoices.push(name as ChoiceOption);
      } else {
        newChoices = newChoices.filter((choice) => choice !== name);
      }
      return {
        ...prevRoom,
        choices: newChoices,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(room);
    setRoom({
      roomNumber: 1,
      description: '',
      choices: [],
      isStart: false,
      isEnd: false,
      points: 0,
      items: '',
      monsters: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {initialRoom ? 'Edit Room' : 'Add Room'}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs:12, sm:6}}>
          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={room.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs:12, sm:6 }}>
          <FormControl component="fieldset" fullWidth margin="normal">
            <Typography variant="subtitle1">Choices</Typography>
            <StyledFormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={room.choices.includes('Left')}
                    onChange={handleChoiceChange}
                    name="Left"
                  />
                }
                label="Left"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={room.choices.includes('Center')}
                    onChange={handleChoiceChange}
                    name="Center"
                  />
                }
                label="Center"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={room.choices.includes('Right')}
                    onChange={handleChoiceChange}
                    name="Right"
                  />
                }
                label="Right"
              />
            </StyledFormGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs:12, sm:6}}>
          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              id="points"
              name="points"
              label="Points"
              value={room.points}
              onChange={handleChange}
              type="number"
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs:12, sm:6}}>
          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              id="items"
              name="items"
              label="Items"
              value={room.items}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs:12, sm:6}}>
          <FormControl fullWidth margin="normal">
            <TextField
              fullWidth
              id="monsters"
              name="monsters"
              label="Monsters"
              value={room.monsters}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {initialRoom ? 'Update Room' : 'Add Room'}
      </Button>
    </Box>
  );
};

export default RoomForm;
