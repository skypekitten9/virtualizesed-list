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
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const firstItem = measureRef.current.firstElementChild;
      if (firstItem) {
        setItemHeight(firstItem.getBoundingClientRect().height);
      }
    }
  }, [items]);

  useEffect(() => {
    if (containerRef.current && itemHeight > 0) {
      const container = containerRef.current;
      const containerHeight = container.getBoundingClientRect().height;
      const newAmountToRender = Math.ceil(containerHeight / itemHeight);
      console.log({ newAmountToRender, containerHeight, itemHeight });
      setRenderAmount(newAmountToRender);
    }
  }, [itemHeight, items]);

  const itemElements = items.map((item, index) => {
    if (index >= renderAmount) return null;
    return (
      <div
        ref={index === 0 ? measureRef : null}
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
    <div ref={containerRef} {...rest}>
      <div style={{ position: "relative", height: itemHeight * items.length }}>
        {itemElements}
      </div>
    </div>
  );
}
