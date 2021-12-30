import React from 'react';
import {Stage, useListTransition} from '..';

type ListTransitionProps<Item> = {
  list: Array<Item>;
  timeout: number;
  children: (item: Item, stage: Stage) => React.ReactNode;
};

export function ListTransition<Item>({
  list,
  timeout,
  children,
}: ListTransitionProps<Item>) {
  const transition = useListTransition(list, timeout);

  return transition(children);
}
