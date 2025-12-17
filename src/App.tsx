import { useState } from "react";
import "./App.css";
import { VirtualList } from "./components/virtual-list/virtual-list";
import { HeavyComponent } from "./components/heavy-component";

export function App() {
  const [items] = useState(generateItems(100_000));
  return (
    <main>
      <VirtualList
        style={{
          border: "1px solid black",
          borderRadius: "8px",
          margin: "16px",
          overflowY: "auto",
          height: "100%",
          flexGrow: 1,
        }}
        items={items}
        toElement={(item) => <HeavyComponent id={item} />}
      />
    </main>
  );
}

function generateItems(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${i + 1}`);
}
