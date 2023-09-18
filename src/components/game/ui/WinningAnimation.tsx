import React from 'react';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import trophy from '../../../assets/trophy.json';
import confetti from '../../../assets/confetti-2.json';

const ChakraLottie = chakra(Lottie);

const WinningAnimation: React.FC = () => {
  const size = useBreakpointValue({
    base: '210px',
    sm: '280px',
    md: '300px',
    lg: '420px'
  })

  return (
    <motion.div
      initial={{ scale: 0.7}}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        width: size, height: '115%',
        overflow: 'hidden',
        zIndex: 15
      }}
    >
      <ChakraLottie position={'absolute'} animationData={confetti}/>
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 15
        }}
      >
        <motion.div
          initial={{ x: 37, rotate: 5 }}
          animate={{ x: 37, rotate: -5 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
          }}
        >
          <ChakraLottie
            left={-20} top={-16}
            animationData={trophy}
            position={'absolute'}
            loop={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WinningAnimation;