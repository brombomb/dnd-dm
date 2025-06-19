import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid as MuiGrid,
  Snackbar
} from '@mui/material';
import DungeonForm from '../components/DungeonForm';
import RoomForm from '../components/RoomForm';
import DungeonFlow from '../components/DungeonFlow';
import { Dungeon, Room, Connection } from '../types';

const API_URL = 'http://localhost:5000/api';

function MapperPage() {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDungeonCreate = async (newDungeon: Dungeon, firstRoom: Room) => {
    setLoading(true);
    setError(null);

    try {
      // Create dungeon
      const dungeonResponse = await fetch(`${API_URL}/dungeons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDungeon)
      });

      if (!dungeonResponse.ok) {
        throw new Error('Failed to create dungeon');
      }

      const createdDungeon = await dungeonResponse.json();
      setDungeon(createdDungeon);

      // Create the first room
      await handleRoomCreate({
        ...firstRoom,
        id: undefined // Ensure the ID is not set to avoid conflicts
      });

      setSuccess('Dungeon created successfully');

    } catch (err) {
      setError('An error occurred while creating the dungeon. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomCreate = async (room: Room) => {
    if (!dungeon) {
      setError('No dungeon has been created yet');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create room
      const roomResponse = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekId: dungeon.id,
          dungeonLevel: dungeon.level,
          roomNumber: room.roomNumber,
          description: room.description,
          points: room.points,
          items: room.items,
          monsters: room.monsters
        })
      });

      if (!roomResponse.ok) {
        throw new Error('Failed to create room');
      }

      const createdRoom = await roomResponse.json();

      // Convert the created room to our Room interface format
      const newRoom: Room = {
        id: createdRoom.id,
        roomNumber: createdRoom.room_number,
        description: createdRoom.description,
        isStart: room.isStart,
        isEnd: room.isEnd,
        points: createdRoom.points,
        items: createdRoom.item,
        monsters: createdRoom.monster,
        choices: room.choices
      };

      // Add the room to our state
      setRooms(prevRooms => [...prevRooms, newRoom]);

      // If we have a selected room, create a connection
      if (selectedRoom && selectedRoom.id) {
        // Use the first available choice for the connection
        const choiceType = selectedRoom.choices.length > 0 ? selectedRoom.choices[0] : 'Left';

        if (choiceType) {
          const connectionResponse = await fetch(`${API_URL}/connections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              weekId: dungeon.id,
              dungeonLevel: dungeon.level,
              fromRoomId: selectedRoom.id,
              choiceType: choiceType,
              toRoomId: createdRoom.id
            })
          });

          if (connectionResponse.ok) {
            const newConnection = await connectionResponse.json();
            setConnections(prevConnections => [...prevConnections, {
              id: newConnection.id,
              fromRoomId: newConnection.from_room_id,
              toRoomId: newConnection.to_room_id,
              choiceType: newConnection.choice_type
            }]);
          }
        }
      }

      setSuccess('Room created successfully');

      // Clear selection after creating a connection
      setSelectedRoom(null);

    } catch (err) {
      setError('An error occurred while creating the room. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {!dungeon ? (
        // If no dungeon has been created yet, show the dungeon form
        <DungeonForm onSubmit={handleDungeonCreate} />
      ) : (
        // If a dungeon exists, show the room management interface
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' } }}>
            <Card elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="h1" sx={{ mb: 2, color: 'primary.main' }}>
                  Dungeon: Level {dungeon.level}, Week {dungeon.weekNumber}
                </Typography>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Typography variant="h6" component="h2" sx={{ mb: 2, color: 'primary.light' }}>
                      {selectedRoom ? 'Edit Selected Room' : 'Create New Room'}
                    </Typography>

                    <RoomForm
                      onSubmit={handleRoomCreate}
                      initialRoom={selectedRoom || undefined}
                      dungeonLevel={dungeon.level}
                      isEditMode={!!selectedRoom}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' } }}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'primary.main' }}>
                  Dungeon Map
                </Typography>

                <Box sx={{ height: 400 }}>
                  <DungeonFlow
                    rooms={rooms}
                    connections={connections}
                    onRoomSelect={handleRoomSelect}
                  />
                </Box>
              </CardContent>
            </Card>

            {rooms.length > 0 && (
              <MuiGrid container spacing={2} sx={{ mt: 2 }}>
                {rooms.map(room => (
                  <MuiGrid item xs={12} sm={6} md={4} key={room.id}>
                    <Card
                      elevation={2}
                      sx={{
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: selectedRoom?.id === room.id ? '2px solid #e8d18f' : 'none',
                        '&:hover': { boxShadow: 4 }
                      }}
                      onClick={() => handleRoomSelect(room)}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Room {room.roomNumber}
                        </Typography>
                        {room.description && (
                          <Typography variant="body2" sx={{ mb: 1 }}>{room.description}</Typography>
                        )}
                        {room.items && (
                          <Typography variant="body2" sx={{ color: '#e8d18f' }}>Item: {room.items}</Typography>
                        )}
                        {room.monsters && (
                          <Typography variant="body2" sx={{ color: '#e06c75' }}>Monster: {room.monsters}</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </MuiGrid>
                ))}
              </MuiGrid>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default MapperPage;
