import {useEffect, useRef} from 'react';
import {
  Canceller,
  clearAnimationFrameTimeout,
  setAnimationFrameTimeout,
} from '../helpers/setAnimationFrameTimeout';
import {ModeHookParam} from './types';

export function useOutInMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  const timerRef = useRef<Canceller>({});

  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== 'out-in') return;

    const [lastItem] = list.slice(-1);

    // if state has changed && stage is enter (trigger prev last item to leave)
    if (lastItem.state !== state && lastItem.stage === 'enter') {
      // 1 leave prev last item
      setList([{...lastItem, stage: 'leave'}]);
    }

    // if state has changed && stage is leave (add new item after prev last item leave ani ends)
    if (lastItem.state !== state && lastItem.stage === 'leave') {
      // 2 add new item after prev last item leave animation ends
      clearAnimationFrameTimeout(timerRef.current);
      timerRef.current = setAnimationFrameTimeout(() => {
        keyRef.current++;
        setList([{state, key: keyRef.current, stage: 'from'}]);
      }, timeout);
    }

    // if state hasn't change && stage is from
    if (lastItem.state === state && lastItem.stage === 'from') {
      // 3 change that new item's stage to 'enter' immediately
      setAnimationFrameTimeout(() => {
        setList((prev) => [{...prev[0], stage: 'enter'}]);
      });
    }

    return () => clearAnimationFrameTimeout(timerRef.current);
  }, [keyRef, list, mode, setList, state, timeout]);
}
