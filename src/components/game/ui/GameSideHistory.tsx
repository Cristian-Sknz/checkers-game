import React, { Suspense } from 'react';
import { Heading, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import { Await, Link } from "react-router-dom";
import { StoreApi } from "zustand/vanilla";

import { useCheckersHistory } from "../../../stores/checkers-history-store";
import { CheckersStore } from "../../../stores/checkers-store";
import UnplayableBoard from '../UnplayableBoard.tsx';

type GameSideHistoryProps = {
  store: Promise<StoreApi<CheckersStore>>;
};

const GameSideHistory: React.FC<GameSideHistoryProps> = ({ store }) => {
  const history = useCheckersHistory((state) => state.histories);

  return (
    <VStack
      w={'full'}
      display={{ base: 'none', md: 'flex'}}
      bg={'#00000070'}
      color={'white'}
      rounded={8}
      justifyContent={{ base: 'center', sm: 'space-between' }}
      h={{ base: 'auto', md: '315px', lg: '360px' }}
      maxWidth={{ base: 'auto', sm: '180px' }}
      flexDir={{ base: 'row', sm: 'column' }}
    >
      <VStack roundedTop={8} position={'relative'} w={'full'} bg={'red.500'} p={3} pb={4}>
        <Heading mb={15} size={'md'}>Game History</Heading>
      </VStack>
      <UnorderedList display={'flex'} flexDir={'column'} styleType={'none'} margin={0} overflow={'auto'}>
        <Suspense>
          <Await resolve={store}>
            {() => history.map((value, index) => (
              <ListItem border={'3px solid black'} key={value.id}>
                <Link key={index.toString()} to={`../game/${value.id}/history`}>
                  <UnplayableBoard board={value?.board}/>
                </Link>
              </ListItem>
            ))}
          </Await>
        </Suspense>
      </UnorderedList>
    </VStack>
  );
};

export default GameSideHistory;