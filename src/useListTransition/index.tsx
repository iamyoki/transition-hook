import {Fragment, useEffect, useRef, useState} from 'react';
import {Stage} from '..';
import {insertArray} from '../helpers/insertArray';
import {setAnimationFrameTimeout} from '../helpers/setAnimationFrameTimeout';

type RenderCallback<Item> = (item: Item, stage: Stage) => React.ReactNode;

type ItemWithState<Item> = {
  item: Item;
  key: number;
  stage: Stage;
};

type ItemWithKey<Item> = {
  item: Item;
  index: number;
};

export function useListTransition<Item>(list: Array<Item>, timeout: number) {
  const keyRef = useRef(0);
  // change list to our list form with extra information.
  const initialList: Array<ItemWithState<Item>> = list.map((item, key) => ({
    item,
    key: keyRef.current,
    stage: 'enter',
  }));

  const [listState, setListState] = useState(initialList);

  useEffect(
    function handleListChange() {
      let newItemsWithIndex: Array<ItemWithKey<Item>> = [];

      list.forEach((item, index) => {
        if (listState.every((itemState) => itemState.item !== item)) {
          newItemsWithIndex.push({item, index});
        }
      });

      // 1 add new items into list state
      if (newItemsWithIndex.length > 0) {
        keyRef.current++;
        setListState((prevListState) =>
          newItemsWithIndex.reduce(
            (prev, {item, index}, i) =>
              insertArray(prev, index, {
                item,
                key: keyRef.current,
                stage: 'from',
              }),
            prevListState
          )
        );
      }

      // 2 enter those new items immediatly
      if (
        newItemsWithIndex.length === 0 &&
        listState.some((item) => item.stage === 'from')
      ) {
        setAnimationFrameTimeout(() => {
          setListState((prev) =>
            prev.map((item) => ({
              ...item,
              stage: item.stage === 'from' ? 'enter' : item.stage,
            }))
          );
        });
      }

      // 3 leave items from list state
      const subtractItemStates = listState.filter(
        (itemState) =>
          !list.includes(itemState.item) && itemState.stage !== 'leave'
      );
      const subtractItems = subtractItemStates.map((item) => item.item);

      if (newItemsWithIndex.length === 0 && subtractItemStates.length > 0) {
        setListState((prev) =>
          prev.map((itemState) =>
            subtractItemStates.includes(itemState)
              ? {...itemState, stage: 'leave'}
              : itemState
          )
        );

        setAnimationFrameTimeout(() => {
          setListState((prev) =>
            prev.filter((item) => !subtractItems.includes(item.item))
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
