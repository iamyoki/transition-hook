import {Fragment, useRef, useState} from 'react';
import {Stage} from '../useTransition';
import {ListItem, Mode} from './types';
import {useDefaultMode} from './useDefaultMode';
import {useInOutMode} from './useInOutMode';
import {useOutInMode} from './useOutInMode';

type RenderCallback<S> = (state: S, stage: Stage) => React.ReactNode;

export function useSwitchTransition<S>(state: S, timeout: number, mode?: Mode) {
  const keyRef = useRef(0);
  const firstDefaultItem: ListItem<S> = {
    state,
    key: keyRef.current,
    stage: 'enter',
  };
  const [list, setList] = useState([firstDefaultItem]);

  // for default mode only
  useDefaultMode({state, timeout, keyRef, mode, list, setList});

  // for out-in mode only
  useOutInMode({state, timeout, keyRef, mode, list, setList});

  // for in-out mode only
  useInOutMode({state, timeout, keyRef, mode, list, setList});

  function transition(renderCallback: RenderCallback<S>) {
    return list.map((item) => (
      <Fragment key={item.key}>
        {renderCallback(item.state, item.stage)}
      </Fragment>
    ));
  }

  return transition;
}
