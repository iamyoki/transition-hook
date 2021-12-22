import {Stage} from '../useTransition';

export type Mode = 'default' | 'out-in' | 'in-out';

export type ListItem<S> = {
  state: S;
  key: number;
  stage: Stage;
};

export type ModeHookParam<S = any> = {
  state: S;
  timeout: number;
  mode?: Mode;
  keyRef: React.MutableRefObject<number>;
  list: ListItem<S>[];
  setList: React.Dispatch<React.SetStateAction<ListItem<S>[]>>;
};
