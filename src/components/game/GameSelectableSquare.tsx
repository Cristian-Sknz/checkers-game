import { StackProps, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { connectUsingProps } from "../../hooks/connect";

import { CheckersStore } from "../../stores/checkers-store";
import GamePiece from "./GamePiece";
import GamePieceSuggestion from "./GamePieceSuggestion";

interface GameSquareProps {
  x: number;
  y: number;

  colors?: {
    player?: StackProps['color']
    opponent?: StackProps['color']
  };
}

const GameSelectableSquare = connectUsingProps<CheckersStore, GameSquareProps>((props) => {

  const onSquareClick = useCallback(() => {
    (props.values[0] as CheckersStore['select'])(props.x, props.y);

    if (props.store.getState().game[props.y][props.x].player) {
      props.store.getState().status.getMovesFromSelected();
    }
  }, [props.x, props.y, props.store]);

  return (
    <VStack
      w={'full'} h={'full'}
      justifyContent={'center'}
      outline={(props.values[1] as CheckersStore['selected']) ? '2px solid white' : '0px'}
      onClick={onSquareClick}
    >
      <GamePieceSuggestion x={props.x} y={props.y} store={props.store}/>
      <GamePiece x={props.x} y={props.y} colors={props.colors} store={props.store}/>
    </VStack>
  );
}, [
  (state) => state.select,
  (state, { x, y }) => state.selected[0] === x && state.selected[1] === y,
]);

export default GameSelectableSquare;