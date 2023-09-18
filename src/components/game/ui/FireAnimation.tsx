import React from 'react';
import { chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";

import fire from '../../../assets/fire.json';

export interface FireAnimationProps {
  gray?: boolean;
};

const ChakraLottie = chakra(Lottie);

const FireAnimation: React.FC<FireAnimationProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .7, bounce: 0.25 }}
      style={{ position: 'absolute', bottom: 0, pointerEvents: 'none' }}
    >
      <ChakraLottie
        start={15}
        width={{ base: '6rem', sm: '8rem', md: '10rem'}}
        animationData={fire}
        filter={props?.gray ? 'grayscale(1)' : 'none'}
        loop
      />
    </motion.div>
  );
};

export default FireAnimation;