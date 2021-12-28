export function insertArray<Item>(
  array: Array<Item>,
  asIndex: number,
  item: Item
) {
  const newArr = [...array];
  newArr.splice(asIndex, 0, item);
  return newArr;
}
