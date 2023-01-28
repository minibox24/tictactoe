import { EndTypes, ErrorTypes, MessageTypes } from "./enums";

export interface LoginMessage {
  type: MessageTypes.LOGIN;
  nick: string;
}

export interface StartMessage {
  type: MessageTypes.START;
}

export interface PlayMessage {
  type: MessageTypes.PLAY;
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
  type: MessageTypes.QUEUE;
}

export interface PutMessage {
  type: MessageTypes.PUT;
  index: number;
}
