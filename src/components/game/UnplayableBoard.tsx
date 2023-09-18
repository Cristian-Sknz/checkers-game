import React from 'react';
import { CHECKERS_MAP } from './Gameboard.tsx';
import { HStack, Stack, VStack } from '@chakra-ui/react';
import { isFill } from '../../hooks/utils.ts';

interface UnplayableBoardProps {
  board?: number[][];
}

const UnplayableBoard: React.FC<UnplayableBoardProps> = (props) => {
  return (
    <VStack
      w={'120px'} h={'120px'}
      gap={0}
      alignItems={'stretch'}
      borderTop={'1px solid white'}
      borderLeft={'1px solid white'}
    >
      {(props.board || CHECKERS_MAP).map((row, y) => (
        <HStack gap={0} flex={1} key={y.toString()} w={'full'} >
          {row.map((value, x) => (
            <Stack
              flex={1}
              background={isFill(x, y) ? 'black' : 'purple.400'}
              borderBottom={'1px'}
              borderRight={'1px'}
              borderColor={'white'}
              w={'full'} h={'full'}
              key={`${x}-${y}`}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {(value && value !== 0) && (
                <Stack
                  w={'65%'} h={'65%'}
                  bg={value === 1 ? 'gray.600' : 'white'}
                  rounded={'full'}
                  position={'relative'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _before={{
                    content: '""',
                    width: '70%',
                    height: '70%',
                    rounded: '100%',
                    position: 'absolute',
                    border: '1px',
                    borderColor: value === 2 ? 'gray.800' : 'white'
                  }}
                />
              )}
            </Stack>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

export default UnplayableBoard;