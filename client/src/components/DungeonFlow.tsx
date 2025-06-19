import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Paper, Typography } from '@mui/material';
import { Room, Connection as RoomConnection } from '../types';

interface DungeonFlowProps {
  rooms: Room[];
  connections: RoomConnection[];
  onRoomSelect: (room: Room) => void;
}

// Custom node styling for rooms
const roomNodeStyle = {
  background: 'rgba(35, 32, 30, 0.9)',
  color: '#e8d18f',
  border: '1px solid #b59e5f',
  borderRadius: '8px',
  padding: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  minWidth: '150px',
  fontSize: '14px',
};

// Colors for different path choices
const choiceColors = {
  Left: '#6a994e',
  Center: '#dda15e',
  Right: '#bc4749',
};

function DungeonFlow({ rooms, connections, onRoomSelect }: DungeonFlowProps) {
  // Convert rooms to react-flow nodes
  const createNodes = useCallback(() => {
    return rooms.map((room, index): Node => ({
      id: room.id?.toString() || `room-${index}`,
      type: 'default',
      data: {
        label: (
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Room {room.roomNumber}
            </Typography>
            {room.description && (
              <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                {room.description}
              </Typography>
            )}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              mt: 1,
              fontSize: '12px',
            }}>
              {room.items && <span style={{ color: '#e8d18f' }}>🏆 {room.items}</span>}
              {room.monsters && <span style={{ color: '#e06c75' }}>👾 {room.monsters}</span>}
            </Box>
          </div>
        ),
        roomObject: room,
      },
      position: {
        // Create a simple layout - first room in the middle, others spaced out
        x: index === 0 ? 250 : 150 + Math.random() * 300,
        y: index === 0 ? 100 : 100 + index * 100 + Math.random() * 50
      },
      style: roomNodeStyle,
    }));
  }, [rooms]);

  // Convert connections to react-flow edges
  const createEdges = useCallback((): Edge[] => {
    return connections.map((connection) => ({
      id: `e${connection.fromRoomId}-${connection.toRoomId}`,
      source: connection.fromRoomId.toString(),
      target: connection.toRoomId.toString(),
      animated: true,
      label: connection.choiceType,
      style: {
        stroke: choiceColors[connection.choiceType as keyof typeof choiceColors] || '#b59e5f',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#e8d18f',
        fontWeight: 700,
        fontSize: 12,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
      },
    }));
  }, [connections]);

  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(createEdges());

  // Update nodes when rooms change
  useEffect(() => {
    setNodes(createNodes());
  }, [rooms, createNodes, setNodes]);

  // Update edges when connections change
  useEffect(() => {
    setEdges(createEdges());
  }, [connections, createEdges, setEdges]);

  // Handle node click to select a room
  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.data && node.data.roomObject) {
      onRoomSelect(node.data.roomObject);
    }
  };

  // Handle drag to stop
  const handleDragStop = (_: React.MouseEvent, node: Node) => {
    console.log('Node dragged to:', node.position);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onNodeDragStop={handleDragStop}
        fitView
      >
        <Background color="#b59e5f" gap={16} size={1} />
        <Controls position="bottom-right" />
        <MiniMap
          nodeStrokeWidth={3}
          maskColor="rgba(35, 32, 30, 0.7)"
          style={{ backgroundColor: 'rgba(35, 32, 30, 0.7)' }}
          zoomable
          pannable
        />
        <Panel position="top-left" style={{ background: 'none', border: 'none' }}>
          <Paper
            elevation={3}
            sx={{
              p: 1.5,
              backgroundColor: 'rgba(35, 32, 30, 0.9)',
              border: '1px solid rgba(181, 158, 95, 0.5)',
              borderRadius: '6px',
              color: '#e8d18f'
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Dungeon Map Legend
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: '12px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: choiceColors.Left, borderRadius: '50%' }} />
                <Typography variant="caption">Left Path</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: choiceColors.Center, borderRadius: '50%' }} />
                <Typography variant="caption">Center Path</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: choiceColors.Right, borderRadius: '50%' }} />
                <Typography variant="caption">Right Path</Typography>
              </Box>
            </Box>
          </Paper>
        </Panel>
      </ReactFlow>
      {rooms.length === 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#e8d18f',
            backgroundColor: 'rgba(35, 32, 30, 0.7)',
            padding: 3,
            borderRadius: 2
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            No rooms created yet
          </Typography>
          <Typography variant="caption">
            Add rooms to start building your dungeon
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DungeonFlow;
