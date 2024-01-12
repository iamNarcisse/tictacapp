export type GameMode = "single" | "double";

export type GameOption = "join" | "invite";

export type Move = {
  currentMove: number;
  nextHistory: Array<string>[];
  timeOfMove: number; // timestamp
  socketID?: string;
  currentPlayerID?: string;
};
