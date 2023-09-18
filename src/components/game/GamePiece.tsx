import { chakra, StackProps } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { shallow } from "zustand/shallow";
import { connectUsingProps } from "../../hooks/connect";

import { CheckersStore, Place } from "../../stores/checkers-store";

interface GamePieceProps {
  x: number;
  y: number;

  colors?: {
    player?: StackProps['color']
    opponent?: StackProps['color']
  };
  values: [Place];
}

const GamePiece: React.FC<GamePieceProps> = ({ values: [piece], colors }) => {
  return (
    <AnimatePresence>
      {piece.player && (
        <MotionStack
          key={piece.id.toString()}
          w={'full'} h={'full'}
          zIndex={10}
          position={'absolute'}
          justifyContent={'center'}
        >
          <MotionStack
            _before={{
              content: '""',
              width: '70%',
              height: '70%',
              rounded: '100%',
              position: 'absolute',
              border: '2px',
              borderColor: piece.player == 2 ? 'gray.800' : 'white'
            }}
            rounded={'full'}
            position={`absolute`}
            w={'75%'}
            h={'75%'}
            justifyContent={'center'}
            layoutId={piece.id.toString()}
            bg={piece.player == 1 ? colors?.player || 'gray.800' : colors?.opponent || 'white'}
            border={piece.queen ? '2px' : '0px'}
            borderColor={piece.player == 2 ? 'gray.800' : 'white'}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.6, opacity: 0.4 }}
          />
        </MotionStack>
      )}
    </AnimatePresence>
  );
};

const MotionStack = chakra(motion.div, {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
  }
});

export default connectUsingProps<CheckersStore, GamePieceProps>(GamePiece, [
  [(state, { x, y }) => state.game[y][x], shallow],
]);