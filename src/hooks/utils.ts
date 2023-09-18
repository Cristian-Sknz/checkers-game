import { Place } from "../stores/checkers-store.ts";

export function createNumberTable() {
  return Array.from({ length: 8 }).map((_, y) => (
    Array.from({ length: 8 }).map((_, x) => {
      if (y < 3 && isFill(x, y)) {
        return 2;
      } else if (y > 4 && isFill(x, y)) {
        return 1;
      }
      return 0;
    })
  ));
}
export function isFill(x: number, y: number) {
  return (y % 2 === 1) ? (x + 1) % 2 === 1 : (x + 1) % 2 === 0;
}

export function createTable(): Place[][] {
  let id = 0;

  return Array.from({ length: 8 }).map((_, y) => (
    Array.from({ length: 8 }).map((_, x) => {
      id++;
      if (y < 3 && isFill(x, y)) {
        return new Place(id, 2);
      } else if (y > 4 && isFill(x, y)) {
        return new Place(id, 1);
      }
      return Place.EMPTY;
    })
  ));
}