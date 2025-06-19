export type ChoiceOption = 'Left' | 'Center' | 'Right';

export interface Dungeon {
  id?: number;
  weekNumber: number;
  startDate?: Date;
  level: number;
}

export interface Room {
  id?: number;
  roomNumber: number;
  description?: string;
  isStart?: boolean;
  isEnd?: boolean;
  points?: number;
  items?: string;
  monsters?: string;
  choices: ChoiceOption[];
}

export interface Connection {
  id?: number;
  fromRoomId: number;
  toRoomId: number;
  choiceType?: string;
}
