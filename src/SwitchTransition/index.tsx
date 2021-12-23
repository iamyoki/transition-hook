import {Stage, useSwitchTransition} from '..';
import {Mode} from '../useSwitchTransition/types';

type SwitchTransitionProps<S = any> = {
  state: S;
  timeout: number;
  mode: Mode;
  children: (state: S, stage: Stage) => React.ReactNode;
};

export function SwitchTransition<S>({
  state,
  timeout,
  mode,
  children,
}: SwitchTransitionProps<S>) {
  const transition = useSwitchTransition(state, timeout, mode);

  return transition(children);
}
