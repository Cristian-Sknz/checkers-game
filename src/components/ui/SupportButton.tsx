import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const SupportButton: React.FC = () => {
  return (
    <Tooltip fontFamily={'Poppins'} label={'Apoie este projeto no Github!'} hasArrow>
      <IconButton
        as={'a'}
        href={'https://github.com/cristian-sknz'}
        target={'_blank'} size={{ base: 'xs', md: 'sm' }}
        rel={'external'}
        fontFamily={'Poppins'}
        aria-label={'Curta o projeto no Github'}
        icon={<FontAwesomeIcon icon={faHeart}/>}
      />
    </Tooltip>
  );
};

export default SupportButton;