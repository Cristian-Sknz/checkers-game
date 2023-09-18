import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { connectUsingProps } from '../../../../hooks/connect';
import { CheckersStore } from '../../../../stores/checkers-store';
import WinningAnimation from '../WinningAnimation';
import { GameHistory, useCheckersHistory } from '../../../../stores/checkers-history-store.ts';

const WinningController = connectUsingProps<CheckersStore>(({ values, store }) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (values[0] == null) {
      return;
    }
    const state = store.getState();
    setActive(true);

    if (state.mode !== 'history') {
      const board = state.game.map((row) => row.map(value => value.player || 0));
      const game = new GameHistory(state.id, board, state.history, new Date(), state.status.winner || 1);
      useCheckersHistory.getState().save(game)
    }
  }, [values]);

  return (
    <AnimatePresence>{active && <WinningAnimation/>}</AnimatePresence>
  );
}, [state => state.status.winner]);

export default WinningController;