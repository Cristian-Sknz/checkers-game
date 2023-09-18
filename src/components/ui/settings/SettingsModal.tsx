import React, { useCallback, useState } from 'react';
import {
  Checkbox,
  FormLabel,
  Heading,
  HStack, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader, ModalProps, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack
} from "@chakra-ui/react";

interface SettingsModalProps extends Omit<ModalProps, 'children'> {
  onMusicCheckbox(value: boolean): void;
  onVolumeChange(value: number): void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onMusicCheckbox, onVolumeChange, ...rest }) => {
  const [active, setActive] = useState(false);

  const onCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const actual = (/true/).test(e.currentTarget.value);
    setActive(!actual);
    onMusicCheckbox(!actual);
  }, [onMusicCheckbox]);

  return (
    <Modal isCentered {...rest}>
      <ModalContent color={'white'} bg={'#00000080'} shadow={'1'} backdropBlur={'4px'} backdropFilter={'auto'}>
        <ModalHeader bg={'#00000080'}>
          <Heading fontFamily={'Poppins'} size={'sm'}>Configurações</Heading>
          <ModalCloseButton/>
        </ModalHeader>

        <ModalBody py={6}>
          <HStack alignItems={'center'}>
            <Checkbox value={active.toString()} onChange={onCheckbox}/>
            <FormLabel mb={0}>Ativar Som</FormLabel>
          </HStack>
          <VStack alignItems={'flex-start'} mt={4}>
            <FormLabel>Volume</FormLabel>
            <Slider onChange={onVolumeChange} min={0} max={1} step={0.1} aria-label='slider-ex-2' colorScheme='pink' defaultValue={0.2}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;