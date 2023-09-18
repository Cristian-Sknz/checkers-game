import { create } from "zustand";
import { persist, StorageValue, PersistStorage } from 'zustand/middleware';
import { GameCoordinates } from "./checkers-store";

export interface CheckersHistoryStore {
  histories: GameHistory[];

  save(history: GameHistory): void;
}

export class GameHistory {
  id: number;
  movements: HistoryMovement[];
  board: number[][]
  date: Date;
  winner: 1 | 2;

  constructor(id: number, board: number[][], movements: HistoryMovement[], date: Date, winner: 1 | 2) {
    this.id = id;
    this.board = board;
    this.movements = movements;
    this.winner = winner;
    this.date = date;
  }
}

export class HistoryMovement {
  from: GameCoordinates;
  to: GameCoordinates;
  millis: number;

  constructor(from: GameCoordinates, to: GameCoordinates, millis: number) {
    this.from = from;
    this.to = to;
    this.millis = millis;
  }
}

class LocalGameHistoryStorage implements PersistStorage<CheckersHistoryStore> {
  getItem(name: string): StorageValue<CheckersHistoryStore> | null {
    const value = localStorage.getItem(name) as string;
    if (localStorage.getItem(name) == null) {
      return null;
    }
    const storage = JSON.parse(value) as StorageValue<CheckersHistoryStore>;

    return {
      version: storage.version,
      state: {
        ...storage.state,
        histories: storage.state.histories.map((value) => {
          return new GameHistory(
            value.id,
            value.board,
            value.movements.map(movement => new HistoryMovement(movement.from, movement.to, movement.millis)),
            new Date(value.date),
            value.winner
          );
        })
      }
    };
  }

  removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  setItem(name: string, value: StorageValue<CheckersHistoryStore>): void {
    localStorage.setItem(name, JSON.stringify(value));
  }
}

export const useCheckersHistory = create(persist<CheckersHistoryStore>((setState, getState) => ({
  histories: [],
  save(history: GameHistory) {
    setState({ histories: getState().histories.concat([history]) });
  }
}), {
  name: 'checkers-history',
  storage: new LocalGameHistoryStorage()
}));