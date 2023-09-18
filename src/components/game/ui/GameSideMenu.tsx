import React, { Suspense } from 'react';
import { Avatar, Button, Heading, Stack, VStack } from "@chakra-ui/react";
import { Await } from "react-router-dom";
import { StoreApi } from "zustand/vanilla";

import FireAnimationWrapper from './wrapper/FireAnimationWrapper';
import { CheckersStore } from "../../../stores/checkers-store";

interface GameSideMenuProps {
  store: Promise<StoreApi<CheckersStore>>;
}

const GameSideMenu: React.FC<GameSideMenuProps> = (props) => {
  return (
    <VStack
      bg={'#00000070'}
      color={'white'}
      gap={{ base: '2rem', sm: '3.5rem' }}
      rounded={8}
      justifyContent={{ base: 'center', sm: 'space-between' }}
      w={'full'}
      h={{base: 'auto', md: '315px', lg: '360px'}}
      maxWidth={{base: 'auto', sm: '180px'}}
      flexDir={{ base: 'row', sm: 'column' }}
    >
      <VStack
        w={'full'}
        position={'relative'}
        bg={'red.500'}
        py={{ base: 1, sm: 4 }}
        order={{ base: 2, sm: 0  }}
        rounded={{ base: 8, sm: 0 }}
        roundedTop={{ base: 'auto', sm: 8 }}
      >
        <Stack
          bottom={{ base: 'auto', sm: '-45%'}}
          position={{ base: 'relative', sm: 'absolute' }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Suspense>
            <Await resolve={props.store}>
              {(store) => <FireAnimationWrapper store={store}/>}
            </Await>
          </Suspense>
          <Avatar
            outline={'4px solid'}
            outlineColor={'red.500'}
            size={{ base: 'sm', sm: 'md' }}
          />
        </Stack>
        <Heading textAlign={'center'} mb={{ base: 0, sm: 15 }} size={{ base: 'xs', sm: 'md' }}>
          Jogador 2
        </Heading>
      </VStack>

      <Button isDisabled order={1} colorScheme={'red'} w={'60%'}  size={{ base: 'xs', md: 'sm' }}>
        Leave
      </Button>

      <VStack
        w={'full'}
        rounded={{ base: 8, sm: 0 }}
        roundedBottom={{ base: 'auto', sm: 8 }}
        position={'relative'}
        bg={'black'}
        py={{ base: 1, sm: 4 }}
        order={{ base: 0, sm: 2  }}
      >
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          top={{ base: 'auto', sm: '-45%' }}
          position={{ base: 'relative', sm: 'absolute' }}
        >
          <Suspense>
            <Await resolve={props.store}>
              {(store) => <FireAnimationWrapper gray store={store}/>}
            </Await>
          </Suspense>
          <Avatar outline={'4px solid'} outlineColor={'gray.700'} size={{ base: 'sm', sm: 'md' }} />
        </Stack>
        <Heading textAlign={'center'} mt={{ base: 0, sm: 15 }} size={{ base: 'xs', sm: 'md' }}>
          Jogador 1
        </Heading>
      </VStack>
    </VStack>
  );
};

export default GameSideMenu;