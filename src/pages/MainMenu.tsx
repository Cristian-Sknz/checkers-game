import { Button, HStack, Tooltip, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import CoolText from "../components/ui/CoolText";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <VStack position={'relative'} gap={0} w={'full'} h={'full'} backdropFilter={'auto'} backdropBlur={'2px'}
            justifyContent={'center'}>
      <VStack mb={'15%'} position={'relative'} fontFamily={'Rocher'} userSelect={'none'}>
        <CoolText
          initial={{ skewY: -10, scale: 1 }}
          whileHover={{ skewY: -10, scale: 1.1, y: -15 }}
          pr={'2rem'} fontSize={'8xl'}
        >
          Checkers
        </CoolText>
        <CoolText
          initial={{ skewY: -10, scale: 1 }}
          whileHover={{ skewY: -10, scale: 1.05 }}
          fontSize={'6xl'}
        >
          The Game
        </CoolText>
      </VStack>
      <HStack fontFamily={'Poppins'}>
        <Button _hover={{ bg: '#00000070' }} onClick={() => navigate(`/game/new`)} size={'lg'} color={'white'} border={'4px'} borderColor={'orange.300'} bg={'transparent'}>
          New Game
        </Button>

        <Tooltip label={"Modo online não está disponível."}>
          <Button isDisabled _hover={{ bg: '#00000070' }} size={'lg'} color={'white'} border={'4px'}
                  borderColor={'orange.300'}
                  bg={'transparent'}>
            Join Game
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default MainMenu;