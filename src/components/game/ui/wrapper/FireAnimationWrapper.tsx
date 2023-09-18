import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { shallow } from 'zustand/shallow';

import { connectUsingProps } from '../../../../hooks/connect';
import { CheckersStore, Place } from '../../../../stores/checkers-store';
import FireAnimation, { FireAnimationProps } from '../FireAnimation';

const FireAnimationWrapper = connectUsingProps<CheckersStore, FireAnimationProps>((props) => {
  const reference = useRef<Place[]>(props.values[0]);
  const timeout = useRef<NodeJS.Timeout | null>();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (props.values[0].length - reference.current.length == 2) {
      setActive(true);
      if (timeout.current != null) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      timeout.current = setTimeout(() => {
        timeout.current = null;
        setActive(false);
      }, 2000);
    }

    reference.current = props.values[0];
  }, [props.values[0]]);

  return <AnimatePresence>{active && <FireAnimation gray={props.gray}/>}</AnimatePresence>;
}, [
  [(state, { gray }) => state.status.captures[gray ? 0 : 1], shallow]
]);

export default FireAnimationWrapper;