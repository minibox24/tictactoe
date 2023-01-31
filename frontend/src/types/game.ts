export interface GameSession {
  vs: string;
  isFirst: boolean;
  myTurn: boolean;
  board: (-1 | 0 | 1)[];
}
