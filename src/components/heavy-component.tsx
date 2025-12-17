export type HeavyComponentProps = {
  id: string;
};

export function HeavyComponent({ id }: HeavyComponentProps) {
  const index = parseInt(id);

  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Simulating heavy computation by burning 1ms of CPU time
  }

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#f7c16fff",
    "#BB8FCE",
    "#85C1E2",
  ];
  const color = colors[index % colors.length];

  return (
    <div
      style={{
        padding: "20px",
        margin: "10px",
        backgroundColor: color,
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3
        style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}
      >{` Heavy component ${id}`}</h3>
      <div style={{ fontSize: "14px", opacity: 0.9 }}>
        Index: {index} | Rendered at: {new Date().toLocaleTimeString()}
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{
              padding: "4px 8px",
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Tag {i + 1}
          </span>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: "14px" }}>
        This component simulates heavy rendering by burning CPU cycles and
        rendering complex nested elements. Without virtualization, rendering
        thousands of these would freeze the browser.
      </p>
    </div>
  );
}
