import { chakra, StackProps } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import React from 'react';

type CoolTextProps = Omit<StackProps, keyof MotionProps> & MotionProps;

const CoolText: React.FC<CoolTextProps> = ({ children, ...props }) => {
  return (
    <MotionCoolText {...props as any}>
      <MotionCoolSpan>{children}</MotionCoolSpan>
    </MotionCoolText>
  );
};

const BG_COLOR = '#9e601e';
const BG_SHADOW = '#e08e37';

// https://codepen.io/mireille1306/pen/BawdXzY
// Inspired in Mireille1306
const MotionCoolText = chakra(motion.h1, {
  baseStyle: {
    transform: 'skew(0, -10deg)',
    color: '#ffbcbc',
    fontWeight: '900',
    fontSize: '4rem',
    lineHeight: '0.60em',
    textAlign: 'center',
    textShadow: `3px 1px 1px ${BG_COLOR}, 2px 2px 1px ${BG_SHADOW}, 4px 2px 1px ${BG_COLOR},
		3px 3px 1px ${BG_SHADOW}, 5px 3px 1px ${BG_COLOR}, 4px 4px 1px ${BG_SHADOW},
		6px 4px 1px ${BG_COLOR}, 5px 5px 1px ${BG_SHADOW}, 7px 5px 1px ${BG_COLOR},
		6px 6px 1px ${BG_SHADOW}, 8px 6px 1px ${BG_COLOR}, 7px 7px 1px ${BG_SHADOW}, 9px 7px 1px${BG_COLOR};`
  }
});

const MotionCoolSpan = chakra(motion.span, {
  baseStyle: {
    display: 'block',
    position: 'relative',
    _before: {
      content: 'attr(data-text)',
      position: 'absolute',
      zIndex: 1,
    }
  }
});

export default CoolText;