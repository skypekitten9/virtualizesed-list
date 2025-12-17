export type VirtualListProps<T> = {
  items: T[];
  height: number;
  itemHeight: number;
  toElement: (item: T) => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function VirtualList<T>({ items, toElement }: VirtualListProps<T>) {
  return <div>{items.map(toElement)}</div>;
}
