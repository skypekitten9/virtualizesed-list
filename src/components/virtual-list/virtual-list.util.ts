type CalculateItemsToRenderProps<T> = {
  scrollPosition: number;
  itemHeight: number;
  containerHeight: number;
  items: T[];
};
export function calculateItemsToRender<T>({
  containerHeight,
  scrollPosition,
  itemHeight,
  items,
}: CalculateItemsToRenderProps<T>) {
  const amount = itemHeight === 0 ? 0 : Math.ceil(containerHeight / itemHeight);
  const start = itemHeight === 0 ? 0 : Math.floor(scrollPosition / itemHeight);
  const end = Math.min(start + amount + 1, items.length);

  const itemsToRender = items.slice(start, end);
  return { itemsToRender, start, end };
}
