import { useState } from "react";

export type VirtualListProps<T> = {
  items: T[];
  toElement: (item: T) => React.ReactNode;
  itemClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function VirtualList<T>({
  items,
  toElement,
  ...rest
}: VirtualListProps<T>) {
  const [itemHeight, setItemHeight] = useState<number>(0);
  const [renderAmount, setRenderAmount] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const setRenderAmountFromEl = (el: HTMLDivElement | null) => {
    if (el) {
      const containerHeight = el.getBoundingClientRect().height;
      const newAmountToRender =
        itemHeight === 0 ? 0 : Math.ceil(containerHeight / itemHeight);
      console.log({ itemHeight, containerHeight, newAmountToRender });
      setRenderAmount(newAmountToRender);
    }
  };
  const setScrollPosFromEl = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollPosition(scrollTop);
  };

  const { start, end } = calculateItemsToRender({
    amount: renderAmount,
    scrollPosition,
    itemHeight,
    totalItems: items.length,
  });
  const itemsToRender = items.slice(start, end);
  const itemElements = itemsToRender.map((item, index) => {
    const relativeIndex = start + index;
    return (
      <div
        ref={(el) => {
          if (relativeIndex === 0 && el) {
            const height = el.getBoundingClientRect().height;
            setItemHeight(height);
          }
        }}
        key={relativeIndex}
        style={{
          position: "absolute",
          top: relativeIndex * itemHeight,
          width: "100%",
        }}
      >
        {toElement(item)}
      </div>
    );
  });

  return (
    <div ref={setRenderAmountFromEl} onScroll={setScrollPosFromEl} {...rest}>
      <div style={{ position: "relative", height: itemHeight * items.length }}>
        {itemElements}
      </div>
    </div>
  );
}

type RenderInterval = { start: number; end: number };
type CalculateItemsToRenderProps = {
  amount: number;
  scrollPosition: number;
  itemHeight: number;
  totalItems: number;
};
function calculateItemsToRender({
  amount,
  scrollPosition,
  itemHeight,
  totalItems,
}: CalculateItemsToRenderProps): RenderInterval {
  const start = itemHeight === 0 ? 0 : Math.floor(scrollPosition / itemHeight);
  const end = Math.min(start + amount + 1, totalItems - 1);
  return { start, end };
}
