import { useState } from "react";
import "./App.css";
import { VirtualList } from "./components/virtual-list/virtual-list";

export function App() {
  const [items] = useState(generateItems(100));
  return (
    <main>
      <div>App</div>
      <VirtualList
        style={{
          border: "1px solid black",
          overflowY: "auto",
          flexGrow: 1,
        }}
        items={items}
        toElement={toElement}
      />
    </main>
  );
}
function toElement(item: string): React.ReactNode {
  return <div>{item}</div>;
}
function generateItems(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
}
