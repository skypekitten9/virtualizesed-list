import { memo } from "react";
import {
  useContainerHeight,
  useItemHeight,
  useScrollPosition,
} from "./virtual-list.hook";
import { calculateItemsToRender } from "./virtual-list.util";

export type VirtualListProps<T> = {
  items: T[];
  toElement: (item: T) => React.ReactNode;
  itemClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const VirtualList = memo(function VirtualList<T>({
  items,
  toElement,
  ...rest
}: VirtualListProps<T>) {
  const { scrollPosition, handleOnScroll } = useScrollPosition();
  const { itemHeight, setItemHeightFromEl } = useItemHeight();
  const { containerHeight, setContainerHeightFromEl } = useContainerHeight();
  const { itemsToRender, start } = calculateItemsToRender({
    containerHeight,
    scrollPosition,
    itemHeight,
    items,
  });

  const itemElements = itemsToRender.map((item, index) => {
    const relativeIndex = start + index;
    return (
      <div
        ref={(el) => {
          if (index === 0) {
            setItemHeightFromEl(el);
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
    <div
      ref={(el) => {
        setContainerHeightFromEl(el);
      }}
      onScroll={handleOnScroll}
      {...rest}
    >
      <div style={{ position: "relative", height: itemHeight * items.length }}>
        {itemElements}
      </div>
    </div>
  );
}) as <T>(props: VirtualListProps<T>) => React.JSX.Element;
