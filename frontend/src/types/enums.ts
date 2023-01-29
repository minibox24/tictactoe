export enum MessageTypes {
  LOGIN = "LOGIN",
  START = "START",
  PLAY = "PLAY",
  END = "END",
  ERROR = "ERROR",
  QUEUE = "QUEUE",
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
  UNKNOWN = "UNKNOWN",
}
