import {
  ClientMessageTypes,
  EndTypes,
  ErrorTypes,
  MessageTypes,
} from "./enums";

export interface LoginMessage {
  type: MessageTypes.LOGIN;
  nick: string;
}

export interface StartMessage {
  type: MessageTypes.START;
  vs: string;
  first: boolean;
}

export interface PlayMessage {
  type: MessageTypes.PLAY;
  board: (-1 | 0 | 1)[];
  index: number;
}

export interface EndMessage {
  type: MessageTypes.END;
  status: EndTypes;
}

export interface ErrorMessage {
  type: MessageTypes.ERROR;
  error: ErrorTypes;
}

export interface QueueMessage {
  type: ClientMessageTypes.QUEUE;
}

export interface UnqueueMessage {
  type: ClientMessageTypes.UNQUEUE;
}

export interface PutMessage {
  type: ClientMessageTypes.PUT;
  index: number;
}
