import { ReactFlow } from '@xyflow/react';


const initialNodes = [
  { id: '1', data: { label: 'Start Room' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Room 2' }, position: { x: 300, y: 100 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

function DungeonFlow() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}

export default DungeonFlow;
