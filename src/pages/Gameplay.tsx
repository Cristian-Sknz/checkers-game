import React, { Suspense } from 'react';
import { HStack, Stack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { Await, useLoaderData } from 'react-router-dom';
import { StoreApi } from 'zustand/vanilla';

import Gameboard from '../components/game/Gameboard';
import GameboardSkeleton from '../components/game/skeleton/GameboardSkeleton';
import GameSideHistory from '../components/game/ui/GameSideHistory';
import GameSideMenu from '../components/game/ui/GameSideMenu';
import WinningController from '../components/game/ui/wrapper/WinningController.tsx';
import SupportButton from '../components/ui/SupportButton';
import { CheckersStore } from '../stores/checkers-store';

type GameplayLoaderData = {
  store: Promise<StoreApi<CheckersStore>>;
}

const board = {
  base: '275px',
  sm: '290px',
  md: '300px',
  lg: '420px',
}

const Gameplay: React.FC = () => {
  const { store } = useLoaderData() as GameplayLoaderData;

  return (
    <VStack
      gap={2}
      w={'full'}
      h={'full'}
      position={'relative'}
      backdropFilter={'auto'}
      backdropBlur={'2px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <HStack w={{ base: '90%' }} flexDir={{ base: 'column', sm: 'row' }} justifyContent={'center'}>
        <GameSideHistory store={store}/>
        <Suspense fallback={<GameboardSkeleton w={board} h={board}/>}>
          <Await resolve={store}>
            {(store) => (
              <Stack position={'relative'} rounded={4} bg={'black'} p={2}>
                <Gameboard w={board} h={board} store={store}/>
                <WinningController store={store}/>
              </Stack>
            )}
          </Await>
        </Suspense>
        <GameSideMenu store={store}/>
      </HStack>
      <HStack>
        <SupportButton/>
        <Tooltip fontFamily={'Poppins'} label={'Modo Online ainda não está disponível'}>
          <Text fontSize={{ base: 'xs', sm: 'md' }} fontFamily={'Poppins'} cursor={'not-allowed'} color={'white'} bg={'#00000070'} rounded={6} px={1}>
            Click aqui para enviar o convite
          </Text>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default Gameplay;