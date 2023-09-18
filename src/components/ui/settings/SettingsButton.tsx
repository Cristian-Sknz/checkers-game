import React from 'react';
import { ButtonProps, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const SettingsButton: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      position={'absolute'}
      top={6} right={6}
      aria-label={'Configurações'}
      colorScheme={'red'}
      icon={<FontAwesomeIcon icon={faGear}/>}
      {...props}
    />
  );
};

export default SettingsButton;