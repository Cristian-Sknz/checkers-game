import React, { useEffect, useRef } from 'react';
import { useBoolean, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Settings from "./components/ui/settings";
import image from './assets/japanese-retro-street-art.jpg';
import music from './assets/sounds/Dream It - TrackTribe.mp3';

const CheckersApp: React.FC = () => {
  const [isOpen, { toggle }] = useBoolean();
  const audio = useRef<HTMLAudioElement>(new Audio(music));

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = 0.2;
      audio.current.loop = true;
    }
  }, []);

  return (
    <VStack p={2} bg={'black'} w={'full'} h={'100vh'} justifyContent={'center'}>
      <VStack w={'100%'} h={'100%'} bgImage={image} rounded={16} bgSize={'cover'} bgPosition={'center'} p={3}>
        <Outlet/>
        <Settings>
          <Settings.Modal
            isOpen={isOpen}
            onClose={toggle}
            onVolumeChange={(volume) => audio.current.volume = volume}
            onMusicCheckbox={(value) => {
              if (value) audio.current.play();
              audio.current.muted = !value;
            }}
          />
          <Settings.Button onClick={toggle}/>
        </Settings>
      </VStack>
    </VStack>
  );
};

export default CheckersApp;