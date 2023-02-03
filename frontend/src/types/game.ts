import { EndTypes } from "./enums";

export interface GameSession {
  vs: string;
  isFirst: boolean;
  myTurn: boolean;
  board: (-1 | 0 | 1)[];

  endType: null | EndTypes;
  isLeave: boolean;
}
