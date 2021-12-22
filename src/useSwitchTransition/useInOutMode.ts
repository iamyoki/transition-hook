import {useEffect, useRef} from 'react';
import {
  Canceller,
  clearAnimationFrameTimeout,
  setAnimationFrameTimeout,
} from '../helpers/setAnimationFrameTimeout';
import {ModeHookParam} from './types';

export function useInOutMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  const timerRef = useRef<Canceller>({});
  const timerRef2 = useRef<Canceller>({});

  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== 'in-out') return;

    const [lastItem, secondLastItem] = list.reverse();

    // if state has changed && stage is enter (add new item)
    if (lastItem.state !== state && lastItem.stage === 'enter') {
      // 1 add new item with stage 'from'
      keyRef.current++;
      setList((prev) =>
        prev.slice(-1).concat({state, key: keyRef.current, stage: 'from'})
      );
    }

    // if state hasn't changed && stage is from (enter that new item)
    if (lastItem.state === state && lastItem.stage === 'from') {
      // 2 set that new item's stage to 'enter' immediately
      setAnimationFrameTimeout(() => {
        setList([secondLastItem, {...lastItem, stage: 'enter'}]);
      });
    }

    // if state hasn't changed
    // && stage is enter
    // && second last item exist
    // && second last item enter
    // (leave second last item)
    if (
      lastItem.state === state &&
      lastItem.stage === 'enter' &&
      secondLastItem &&
      secondLastItem?.stage === 'enter'
    ) {
      // 3 leave second last item after new item enter animation ends
      clearAnimationFrameTimeout(timerRef.current);
      timerRef.current = setAnimationFrameTimeout(() => {
        setList([{...secondLastItem, stage: 'leave'}, lastItem]);
      }, timeout);
    }

    // if second last item exist
    // && second last item is enter
    // (unmount second last item)
    if (secondLastItem && secondLastItem.stage === 'leave') {
      // 4 unmount second last item after it's leave animation ends
      clearAnimationFrameTimeout(timerRef2.current);
      timerRef2.current = setAnimationFrameTimeout(() => {
        setList([lastItem]);
      }, timeout);
    }

    return () => {
      clearAnimationFrameTimeout(timerRef.current);
      clearAnimationFrameTimeout(timerRef2.current);
    };
  }, [keyRef, list, mode, setList, state, timeout]);
}
