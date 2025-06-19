// client/src/components/RoomForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ChoiceOption, Room } from '../types';

interface RoomFormProps {
  onSubmit: (room: Room) => void;
  initialRoom?: Room;
  dungeonLevel: number;
  isEditMode?: boolean;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, initialRoom, dungeonLevel, isEditMode = false }) => {
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

  useEffect(() => {
    if (initialRoom) {
      setRoom(initialRoom);
    }
  }, [initialRoom]);

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

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoom({
      ...room,
      description: value,
    });
  };

  const handleItemChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setRoom({
      ...room,
      items: value,
    });
  };

  const handleMonsterChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setRoom({
      ...room,
      monsters: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(room);

    // Only reset if not in edit mode
    if (!isEditMode) {
      setRoom({
        roomNumber: room.roomNumber + 1,
        description: '',
        choices: [],
        isStart: false,
        isEnd: false,
        points: 0,
        items: '',
        monsters: '',
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%'
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: 'primary.light',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
              letterSpacing: '0.03em'
            }}
          >
            Paths
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: { xs: 1, sm: 2 },
            pl: 1,
            flexWrap: 'wrap'
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={room.choices.includes('Left')}
                  onChange={handleChoiceChange}
                  name="Left"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '1.5rem', sm: '1.25rem' }
                    },
                    color: '#b59e5f',
                    '&.Mui-checked': {
                      color: '#e8d18f',
                    }
                  }}
                />
              }
              label="Left"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '1rem', sm: '0.875rem' }
                }
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={room.choices.includes('Center')}
                  onChange={handleChoiceChange}
                  name="Center"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '1.5rem', sm: '1.25rem' }
                    },
                    color: '#b59e5f',
                    '&.Mui-checked': {
                      color: '#e8d18f',
                    }
                  }}
                />
              }
              label="Center"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '1rem', sm: '0.875rem' }
                }
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={room.choices.includes('Right')}
                  onChange={handleChoiceChange}
                  name="Right"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '1.5rem', sm: '1.25rem' }
                    },
                    color: '#b59e5f',
                    '&.Mui-checked': {
                      color: '#e8d18f',
                    }
                  }}
                />
              }
              label="Right"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '1rem', sm: '0.875rem' }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1, width: '100%' }}>
        <Grid size={6} sx={{ width: '50%' }}>
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              id="item-select"
              value={room.items || ''}
              label="Item"
              onChange={handleItemChange}
              sx={{
                width: '100%',
                height: { xs: 56, sm: 56 },
                '& .MuiSelect-select': {
                  fontSize: { xs: '1rem', sm: '1rem' }
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(181, 158, 95, 0.5)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(181, 158, 95, 0.8)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b59e5f',
                  borderWidth: '2px',
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Extra Ball">Extra Ball</MenuItem>
              <MenuItem value="Legendary Glass Sword of Unmaking" disabled={dungeonLevel < 3}>
                Legendary Glass Sword of Unmaking
              </MenuItem>
              <MenuItem value="Legendary Glass Bow of All-Shot" disabled={dungeonLevel < 3}>
                Legendary Glass Bow of All-Shot
              </MenuItem>
              <MenuItem value="Legendary Glass Armor of Immortality" disabled={dungeonLevel < 3}>
                Legendary Glass Armor of Immortality
              </MenuItem>
              <MenuItem value="Legendary Glass Shield of Endurance" disabled={dungeonLevel < 3}>
                Legendary Glass Shield of Endurance
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={6} sx={{ width: '50%' }}>
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="monster-select-label">Monster</InputLabel>
            <Select
              labelId="monster-select-label"
              id="monster-select"
              value={room.monsters || ''}
              label="Monster"
              onChange={handleMonsterChange}
              sx={{
                width: '100%',
                height: { xs: 56, sm: 56 },
                '& .MuiSelect-select': {
                  fontSize: { xs: '1rem', sm: '1rem' }
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(181, 158, 95, 0.5)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(181, 158, 95, 0.8)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b59e5f',
                  borderWidth: '2px',
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Animated Armor">Animated Armor</MenuItem>
              <MenuItem value="Giant Rat">Giant Rat</MenuItem>
              <MenuItem value="Skeleton">Skeleton</MenuItem>
              <MenuItem value="Troll" disabled={dungeonLevel < 3}>Troll</MenuItem>
              <MenuItem value="Dragon" disabled={dungeonLevel < 5}>Dragon</MenuItem>
              <MenuItem value="Trap">Trap</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            minWidth: 150,
            fontSize: { xs: '1rem', sm: '0.875rem' },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          {isEditMode ? 'Update Room' : 'Add Room'}
        </Button>
      </Box>
    </Box>
  );
};

export default RoomForm;
