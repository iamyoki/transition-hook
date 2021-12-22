import {useEffect, useRef, useState} from 'react';
import {
  Canceller,
  clearAnimationFrameTimeout,
  setAnimationFrameTimeout,
} from '../helpers/setAnimationFrameTimeout';

export type Stage = 'from' | 'enter' | 'leave';

export function useTransition(state: boolean, timeout: number) {
  // the stage of transition - 'from' | 'enter' | 'leave'
  const [stage, setStage] = useState<Stage>(state ? 'enter' : 'from');

  // the timer for should mount
  const timer = useRef<Canceller>({});
  const [shouldMount, setShouldMount] = useState(state);

  useEffect(
    function handleStateChange() {
      clearAnimationFrameTimeout(timer.current);

      // when true - trans from to enter
      // when false - trans enter to leave, unmount after timeout
      if (state === true) {
        setStage('from');
        setShouldMount(true);
        setAnimationFrameTimeout(() => {
          setStage('enter');
        });
      } else {
        setStage('leave');
        timer.current = setAnimationFrameTimeout(() => {
          setShouldMount(false);
        }, timeout);
      }

      return () => clearAnimationFrameTimeout(timer.current);
    },
    [state, timeout]
  );

  return {
    stage,
    shouldMount,
  };
}
