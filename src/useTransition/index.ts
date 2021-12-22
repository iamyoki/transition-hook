import {useEffect, useRef, useState} from 'react';

export type Stage = 'from' | 'enter' | 'leave';

export function useTransition(state: boolean, timeout: number) {
  // the stage of transition - 'from' | 'enter' | 'leave'
  const [stage, setStage] = useState<Stage>(state ? 'enter' : 'from');

  // the timer for should mount
  const timer = useRef<number>();
  const [shouldMount, setShouldMount] = useState(state);

  useEffect(
    function handleStateChange() {
      clearTimeout(timer.current);

      // when true - trans from to enter
      // when false - trans enter to leave, unmount after timeout
      if (state === true) {
        setStage('from');
        setShouldMount(true);
        setTimeout(() => {
          setStage('enter');
        });
      } else {
        setStage('leave');
        timer.current = setTimeout(() => {
          setShouldMount(false);
        }, timeout);
      }
    },
    [state, timeout]
  );

  return {
    stage,
    shouldMount,
  };
}
