import {useEffect} from 'react';
import {ListItem, ModeHookParam} from './types';

export function useDefaultMode<S>({
  state,
  timeout,
  mode,
  keyRef,
  list,
  setList,
}: ModeHookParam<S>) {
  useEffect(() => {
    // skip unmatched mode 🚫
    if (mode !== undefined && mode !== 'default') return;

    // skip fist mount and any unchanged effect 🚫
    const [lastItem] = list.slice(-1);
    if (lastItem.state === state) return;

    // 0 update key
    const prevKey = keyRef.current; // save prev key
    keyRef.current++; // update to last item key
    const curKey = keyRef.current; // save cur key (for async gets)

    // 1 add new item immediately with stage 'from'
    setList((prev) => prev.concat({state, key: curKey, stage: 'from'}));

    // 1.1 change this item immediately with stage 'enter'
    const isCurItem = (item: ListItem<S>) => item.key === curKey;
    setTimeout(() => {
      setList((prev) =>
        prev.map((item) => (isCurItem(item) ? {...item, stage: 'enter'} : item))
      );
    });

    // 1.2 leave prev item immediately with stage 'leave'
    const shouldItemLeave = (item: ListItem<S>) => item.key === prevKey;
    setList((prev) =>
      prev.map((item) =>
        shouldItemLeave(item) ? {...item, stage: 'leave'} : item
      )
    );

    // 2 unmount leaved item after timeout
    const shouldMountItem = (item: ListItem<S>) => item.key !== prevKey;
    setTimeout(() => {
      setList((prev) => prev.filter(shouldMountItem));
    }, timeout);
  }, [keyRef, list, mode, setList, state, timeout]);
}
