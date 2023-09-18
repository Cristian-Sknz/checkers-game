import { useEffect, useRef } from "react";
import { StoreApi } from "zustand/vanilla";
import { GameHistory } from "../stores/checkers-history-store.ts";
import { CheckersStore } from "../stores/checkers-store.ts";

export function useHistoryReplay(store: Promise<StoreApi<CheckersStore>>, history?: GameHistory) {
  const moves = useRef(history?.movements.map((movement, index, array) => {
    return async () => {
      await new Promise((resolve) => {
        if (index - 1 < 0) {
          setTimeout(resolve, 4000);
          return;
        }

        const currentTime = array[index - 1].millis;
        const nextTime = movement.millis;
        const time = Math.abs(currentTime - nextTime);

        setTimeout(resolve, time > 2500 ? 2500 : time);
      });

      (await store).getState().move(movement.from, movement.to);
    };
  }));


  useEffect(() => {
    const controller = new AbortController();
    let abort = false;
    controller.signal.addEventListener('abort', () => abort = true);

    const start = async () => {
      if (!moves.current) return;

      for (let move of moves.current) {
        if (abort) {
          break;
        }
        await move();
      }
    };

    start();
    return () => controller.abort();
  }, []);

}