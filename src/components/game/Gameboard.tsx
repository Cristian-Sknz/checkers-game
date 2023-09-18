import React from 'react';
import { HStack, StackProps, VStack } from "@chakra-ui/react";
import { StoreApi } from "zustand/vanilla";

import { isFill } from "../../hooks/utils";
import { CheckersStore } from "../../stores/checkers-store";
import GameSelectableSquare from "./GameSelectableSquare";

interface GameboardProps extends StackProps {
  colors?: {
    primary?: StackProps['bg'];
    secondary?: StackProps['bg'];
    player?: StackProps['color'];
    opponent?: StackProps['color'];
  };
  map?: typeof CHECKERS_MAP;
  store: StoreApi<CheckersStore>;
}

export const CHECKERS_MAP = Array.from<never>({ length: 8 })
  .map(() => Array.from<never>({ length: 8 }));

const Gameboard: React.FC<GameboardProps> = ({ colors, ...props }) => {
  return (
    <VStack
      onContextMenu={(e) => e.preventDefault()}
      width={'full'} height={'full'}
      {...props}
      alignItems={'stretch'}
      gap={0}
      borderTop={'2px solid white'}
      borderLeft={'2px solid white'}
    >
      {CHECKERS_MAP.map((value, row) => (
        <BoardRow key={row.toString()} y={row} slots={value} colors={colors} store={props.store}/>
      ))}
    </VStack>
  );
};

interface GameRowProps extends Pick<GameboardProps, 'colors'> {
  y: number;
  slots: never[];
  store: StoreApi<CheckersStore>;
}

const BoardRow: React.FC<GameRowProps> = ({ y, slots, colors, store }) => {
  return (
    <HStack id={y.toString()} h={`${100 / 8}%`} gap={0}>
      {slots.map((_, x) => (
        <VStack
          key={`[${x}, ${y}]`} id={`${x}-${y}`}
          bg={isFill(x, y) ? colors?.primary || 'black' : colors?.secondary || 'red.500'}
          borderBottom={'2px'}
          borderRight={'2px'}
          borderColor={'white'}
          width={`${100 / 8}%`}
          height={'full'}
          padding={'0.2rem'}
          justifyContent={'center'}
          position={'relative'}
        >
          <GameSelectableSquare x={x} y={y} store={store}/>
        </VStack>
      ))}
    </HStack>
  );
};

export default Gameboard;