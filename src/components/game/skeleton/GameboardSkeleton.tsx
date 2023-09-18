import React from 'react';
import { Spinner, StackProps, VStack } from "@chakra-ui/react";

const GameboardSkeleton: React.FC<StackProps> = (props) => {
  return (
    <VStack border={''} w={'420px'} h={'420px'} {...props} bg={'#00000070'} rounded={8} justifyContent={'center'}>
      <Spinner size={'lg'} color={'white'}/>
    </VStack>
  );
};

export default GameboardSkeleton;