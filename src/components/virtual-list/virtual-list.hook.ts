import { useState } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const handleOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollPosition(scrollTop);
  };
  return { scrollPosition, handleOnScroll };
}

export function useElementHeight() {
  const [height, setHeight] = useState<number>(0);
  const setHeightFromEl = (el: HTMLDivElement | null) => {
    if (el) {
      console.log("Observing height for element:", el);
      const resizeObserver = new ResizeObserver(() => {
        const height = el.getBoundingClientRect().height;
        setHeight(height);
      });
      resizeObserver.observe(el);
      return () => resizeObserver.disconnect();
    }
  };
  return { height, setHeightFromEl };
}

export function useItemHeight() {
  const { height, setHeightFromEl } = useElementHeight();
  return { itemHeight: height, setItemHeightFromEl: setHeightFromEl };
}

export function useContainerHeight() {
  const { height, setHeightFromEl } = useElementHeight();
  return { containerHeight: height, setContainerHeightFromEl: setHeightFromEl };
}
