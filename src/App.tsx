import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { VirtualList } from "./components/virtual-list/virtual-list";
import { HeavyComponent } from "./components/heavy-component";

const MAX_ITEMS = 100_000;
const DEFAULT_ITEMS_TO_RENDER = 25_000;

export function App() {
  const [items] = useState(generateItems(MAX_ITEMS));
  const [sliderValue, setSliderValue] = useState(DEFAULT_ITEMS_TO_RENDER);
  const [itemsToRender, setItemsToRender] = useState(items);
  const toElement = useCallback(
    (item: string) => <HeavyComponent id={item} />,
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setItemsToRender(items.slice(0, sliderValue));
    }, 300);

    return () => clearTimeout(timer);
  }, [items, sliderValue]);
  return (
    <main>
      <h1 style={{ color: "black" }}>Virtualized list</h1>
      <p style={{ color: "black" }}>Items to render: {sliderValue}</p>
      <input
        type="range"
        min="0"
        max={MAX_ITEMS}
        value={sliderValue}
        style={{ maxWidth: "400px" }}
        onChange={(e) => setSliderValue(Number(e.target.value))}
      />
      <VirtualList
        className="list"
        items={itemsToRender}
        toElement={toElement}
      />
    </main>
  );
}

function generateItems(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${i + 1}`);
}
