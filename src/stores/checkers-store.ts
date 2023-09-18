import { createStore } from 'zustand';
import { createTable } from "../hooks/utils.ts";
import { HistoryMovement } from "./checkers-history-store.ts";

export type GameCoordinates = [x: number, y: number];
export interface CheckersStore {
  id: number;
  game: Place[][];
  mode: 'online' | 'offline' | 'history';
  selected: GameCoordinates | [];
  history: HistoryMovement[];
  status: {
    player: 1 | 2;
    captures: [Place[], Place[]];
    moves_from_selected: GameCoordinates[];
    winner: CheckersStore['status']['player'] | null;
    getMovesFromSelected(): GameCoordinates[];
    getPlayerOfThisTurn(): CheckersStore['status']['player'];
  };
  canWin(player: CheckersStore['status']['player'], game: CheckersStore['game']): boolean;
  moves(x: number, y: number): GameCoordinates[];
  move(actual: GameCoordinates, to: GameCoordinates): boolean;
  select(x: number, y: number): void;
  unselect(): void;
}

export class Place {
  id: number;
  player: 1 | 2 | null;
  queen = false;

  static EMPTY = new Place(0);

  constructor(id: number, player?: 1 | 2) {
    this.id = id;
    this.player = player || null;
  }
}

export function createCheckersStore(id: number, mode: CheckersStore['mode'] = 'offline') {
  return createStore<CheckersStore>((setState, getState) => ({
    id,
    mode,
    game: createTable(),
    selected: [] as unknown as GameCoordinates,
    history: [],
    status: {
      player: 1,
      moves_from_selected: [],
      captures: [[], []],
      winner: null,
      getPlayerOfThisTurn(): 1 | 2 {
        if (getState().history.length === 0) {
          return 1;
        }
        return getState().history.length % 2 === 0 ? 1 : 2;
      },
      getMovesFromSelected(): GameCoordinates[] {
        const state = getState();
        const selected = state.selected as GameCoordinates;

        if (state.status.winner) {
          return [];
        }

        if (state.status.moves_from_selected.length == 0) {
          if (state.selected.length == 0) return [];

          const piece = state.game[selected[1]][selected[0]];
          const isEmpty = piece.player == null;
          if (isEmpty) {
            return [];
          }

          if (state.mode === 'online' && piece.player != state.status.player) {
            return [];
          }

          if (piece.player !== state.status.getPlayerOfThisTurn()) {
            return [];
          }

          const moves_from_selected = state.moves(selected[0], selected[1]);

          setState({
            status: { ...state.status, moves_from_selected }
          });

          return moves_from_selected;
        }

        return state.status.moves_from_selected;
      }
    },
    select(x: number, y: number) {
      const state = getState();
      const selected = state.selected as GameCoordinates;

      if (state.mode === 'history') {
        return;
      }

      if (state.selected.length == 2) {
        const piece = state.game[selected[1]][selected[0]];

        if (selected[0] === x && selected[1] === y) {
          state.unselect();
          return;
        }

        if (piece.player) {
          if (state.move(selected, [x, y])) {
            state.unselect();
            return;
          }
          state.unselect();
          state.select(x, y);
          return;
        }
      }

      setState({
        selected: [x, y],
        status: { ...state.status, moves_from_selected: [] }
      });
    },
    unselect() {
      setState({
        selected: [],
        status: { ...getState().status, moves_from_selected: [] }
      });
    },
    moves(x: number, y: number) {
      const game = getState().game;
      const piece = game[y][x];

      if (piece.queen) {
        return availableMoves(x, y, -1, 1)
          .concat(availableMoves(x, y, 1, -1))
          .concat(availableMoves(x, y, -1, -1))
          .concat(availableMoves(x, y, 1, 1));
      }

      if (piece.player == 1) {
        return availableMoves(x, y, -1, 1)
          .concat(availableMoves(x, y, -1, -1));
      }

      if (piece.player == 2) {
        return availableMoves(x, y, 1, -1)
          .concat(availableMoves(x, y, 1, 1));
      }

      function availableMoves(x: number, y: number, col: number, row: number, last?: number | null): GameCoordinates[] {
        const opponent = piece.player == 1 ? 2 : 1;
        if ((x + row) < 0 || (x + row) > 7 || (y + col) < 0 || (y + col) > 7) {
          return [];
        }

        const slot = game[y + col][x + row];

        if (slot == null) {
          return [];
        }

        if (slot.player == null) {
          if (last == opponent) {
            return ([[x + row, y + col]] as GameCoordinates[])
              .concat(availableMoves(x + row, y + col, col, row, piece.player));
          }

          if (last == piece.player) {
            return [];
          }

          return [[x + row, y + col]];
        }

        if (slot.player == opponent) {
          if (last == opponent) return [];

          return availableMoves(x + row, y + col, col, row, opponent);
        }

        if (slot.player == piece.player) {
          return [];
        }

        return [];
      }

      return [];
    },
    move(current: number[], to: number[]) {
      const state = getState();
      const game = state.game;
      const piece = game[current[1]][current[0]];

      if (!piece.player) {
        return false;
      }

      if (piece.player !== state.status.getPlayerOfThisTurn()) {
        return false;
      }

      if (!state.moves(current[0], current[1])
        .find(value => value[0] === to[0] && value[1] === to[1])) {
        return false;
      }

      const temp = game[to[1]][to[0]];

      game[to[1]][to[0]] = piece;
      game[current[1]][current[0]] = temp;

      if (piece.player == 1 && to[1] === 0
        || piece.player == 2 && to[1] === game.length - 1) {
        console.log(`O player ${piece.player} virou Dama`);
        piece.queen = true;
      }

      const turnCaptures = getCapturePiecesAndRemove(game, current, to);
      const history = [...state.history];
      history.push(new HistoryMovement(current as GameCoordinates, to as GameCoordinates, Date.now()));


      if (turnCaptures.length >= 1) {
        const captures = state.status.captures;
        captures[piece.player - 1] = captures[piece.player - 1].concat(turnCaptures);

        if (state.canWin(piece.player, game)) {
          setState({ game, history, status: { ...state.status, captures, winner: piece.player } });
          return true;
        }

        setState({ game, history, status: { ...state.status, captures } });
        return true;
      }

      if (state.canWin(piece.player, game)) {
        setState({ game, history, status: { ...state.status, winner: piece.player } });
        return true;
      }
      setState({ game, history });
      return true;
    },
    canWin(player: 1 | 2, game: CheckersStore['game']) {
      const state = getState();
      if (state.status.winner) {
        return true;
      }

      const opponent = game.map((value, index) => ({ x: null, y: index, value }))
        .flatMap((obj) => obj.value.map((place, x) => ({...obj, x, value: place })))
        .filter(place => place.value.player !== null && place.value.player !== player);

      if (opponent.length <= 8) {
        if (opponent.length === 0) {
          return true;
        }

        const opponentMoves = opponent.flatMap((place) => state.moves(place.x, place.y));
        if (opponentMoves.length === 0) {
          return true;
        }
      }
      return false;
    }
  }));
}

function getCapturePiecesAndRemove(game: Place[][], current: number[], to: number[]) {
  const captures: Place[] = [];
  const count = Math.floor(Math.abs((to[1] - current[1]) / 2));

  if (count > 0) {
    const isXPositive = (to[0] - current[0]) > 0;
    const isYPositive = (to[1] - current[1]) > 0;

    for (let i = count * 2; i > 0; i--) {
      if (i % 2 === 0) {
        continue;
      }
      const x = isXPositive ? to[0] - i : to[0] + i;
      const y = isYPositive ? to[1] - i : to[1] + i;

      captures.push(game[y][x]);
      game[y][x] = Place.EMPTY;
    }
  }

  return captures;
}