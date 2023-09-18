import { Text, VStack } from "@chakra-ui/react";
import { connectUsingProps } from "../../../hooks/connect";

import { CheckersStore } from "../../../stores/checkers-store";

const CapturesCount = connectUsingProps<CheckersStore>((props) => {
  return (
    <VStack bg={'red.400'}>
      <Text>Player 1: {props.values[0].length}</Text>
      <Text>Player 2: {props.values[1].length}</Text>
    </VStack>
  );
}, [
  (state) => state.status.captures[0],
  (state) => state.status.captures[1]
]);

export default CapturesCount;