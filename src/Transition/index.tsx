import {Stage, useTransition} from '..';

type TransitionProps = {
  state: boolean;
  timeout: number;
  children: (stage: Stage, shouldMount: boolean) => React.ReactNode;
};

export function Transition({state, timeout, children}: TransitionProps) {
  const {stage, shouldMount} = useTransition(state, timeout);

  return children(stage, shouldMount);
}
