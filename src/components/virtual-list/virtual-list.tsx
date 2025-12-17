import { useState, useRef, useEffect } from "react";

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

  const setRenderAmountFromEl = (el: HTMLDivElement | null) => {
    if (el) {
      const containerHeight = el.getBoundingClientRect().height;
      const newAmountToRender = Math.ceil(containerHeight / itemHeight);
      console.log({ newAmountToRender, containerHeight, itemHeight });
      setRenderAmount(newAmountToRender);
    }
  };

  const { start, end } = calculateItemsToRender({
    amount: renderAmount,
    scrollPosition: 0,
    itemHeight,
    totalItems: items.length,
  });
  const itemsToRender = items.slice(start, end);
  const itemElements = itemsToRender.map((item, index) => {
    return (
      <div
        ref={(el) => {
          if (index === 0 && el) {
            const height = el.getBoundingClientRect().height;
            setItemHeight(height);
          }
        }}
        key={index}
        style={{
          position: "absolute",
          top: index * itemHeight,
          width: "100%",
        }}
      >
        {toElement(item)}
      </div>
    );
  });

  return (
    <div ref={setRenderAmountFromEl} {...rest}>
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
}: CalculateItemsToRenderProps): RenderInterval {
  return { start: 0, end: amount };
}
