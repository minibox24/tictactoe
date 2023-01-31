export enum MessageTypes {
  LOGIN = "LOGIN",
  START = "START",
  PLAY = "PLAY",
  END = "END",
  ERROR = "ERROR",
}

export enum ClientMessageTypes {
  QUEUE = "QUEUE",
  UNQUEUE = "UNQUEUE",
  PUT = "PUT",
}

export enum EndTypes {
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
  LEAVE = "LEAVE",
}

export enum ErrorTypes {
  NOT_PLAYING = "NOT_PLAYING",
  NOT_YOUR_TURN = "NOT_YOUR_TURN",
  ALREADY_PLAYING = "ALREADY_PLAYING",
  ALREADY_QUEUED = "ALREADY_QUEUED",
  ALREADY_CHECKED = "ALREADY_CHECKED",
  INCORRECT_FORMAT = "INCORRECT_FORMAT",
  NOT_IN_QUEUE = "NOT_IN_QUEUE",
  UNKNOWN = "UNKNOWN",
}

export enum Avatars {
  INE,
  WAKPAGO,
}
