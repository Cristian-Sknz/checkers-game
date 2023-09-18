import { Stack } from "@chakra-ui/react";
import React from "react";
import { connectUsingProps } from "../../hooks/connect";
import { CheckersStore } from "../../stores/checkers-store";

interface GamePieceSuggestionProps {
  x: number;
  y: number;

  values: [boolean];
}

const GamePieceSuggestion: React.FC<GamePieceSuggestionProps> = ({ values }) => {
  return values[0] && <Stack zIndex={'20'} bg={'red.400'} position={'absolute'} w={'22%'} h={'22%'}/>;
};

export default connectUsingProps<CheckersStore, GamePieceSuggestionProps>(GamePieceSuggestion, [
  (state, { x, y }) => state.status.moves_from_selected.find(value => value[0] === x && value[1] === y)
]);