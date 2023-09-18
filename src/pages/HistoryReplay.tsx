import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { Suspense } from 'react';
import { Await, useLoaderData } from "react-router-dom";
import { StoreApi } from "zustand/vanilla";

import Gameboard from "../components/game/Gameboard";
import GameboardSkeleton from "../components/game/skeleton/GameboardSkeleton";
import GameSideHistory from "../components/game/ui/GameSideHistory";
import GameSideMenu from "../components/game/ui/GameSideMenu";
import SupportButton from '../components/ui/SupportButton';
import { useHistoryReplay } from "../hooks/replay";
import { GameHistory } from "../stores/checkers-history-store";
import { CheckersStore } from "../stores/checkers-store";
import WinningController from '../components/game/ui/wrapper/WinningController.tsx';

type HistoryReplayLoaderData = {
  store: Promise<StoreApi<CheckersStore>>;
  history: GameHistory;
}

const board = {
  base: '210px',
  sm: '290px',
  md: '300px',
  lg: '420px',
}

const HistoryReplay: React.FC = () => {
  const { store, history } = useLoaderData() as HistoryReplayLoaderData;

  useHistoryReplay(store, history);

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
        <Text fontSize={{ base: 'xs', sm: 'md' }} fontFamily={'Poppins'} cursor={'move'} color={'white'} bg={'#00000070'} rounded={6} px={1}>
          Você está assistindo um replay
        </Text>
      </HStack>
    </VStack>
  );
};

export default HistoryReplay;