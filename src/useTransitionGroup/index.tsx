import {Fragment, useEffect, useState} from 'react';
import {Stage} from '..';
import {setAnimationFrameTimeout} from '../helpers/setAnimationFrameTimeout';

type RenderCallback<Item> = (item: Item, stage: Stage) => React.ReactNode;

type ListItem<Item> = {
  item: Item;
  key: number;
  stage: Stage;
};

export function useTransitionGroup<Item>(list: Array<Item>, timeout: number) {
  // change list to our list form with extra information.
  const initialList: Array<ListItem<Item>> = list.map((item, key) => ({
    item,
    key,
    stage: 'enter',
  }));

  const [listState, setListState] = useState(initialList);

  useEffect(
    function handleListChange() {
      // add new item
      if (list.length > listState.length) {
        const newItems: Array<ListItem<Item>> = list
          .filter((item) => !listState.some((item2) => item2.item === item))
          .map((item, index) => ({
            item,
            key: index + listState.length,
            stage: 'from',
          }));

        setListState((prev) => prev.concat(newItems));
        setAnimationFrameTimeout(() => {
          setListState((prev) =>
            prev.map((item) => ({
              ...item,
              stage: item.stage === 'from' ? 'enter' : item.stage,
            }))
          );
        });
      }

      // remove item
      if (list.length < listState.length) {
        const removeItems = listState.filter(
          (item) => !list.includes(item.item)
        );
        setListState((prev) =>
          prev.map((item) =>
            removeItems.includes(item) ? {...item, stage: 'leave'} : item
          )
        );
        setAnimationFrameTimeout(() => {
          setListState((prev) =>
            prev.filter((item) => !removeItems.includes(item))
          );
        }, timeout);
      }
    },
    [list, listState, timeout]
  );

  function transition(renderCallback: RenderCallback<Item>) {
    return listState.map((item) => (
      <Fragment key={item.key}>
        {renderCallback(item.item, item.stage)}
      </Fragment>
    ));
  }

  return transition;
}
