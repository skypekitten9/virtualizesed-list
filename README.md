# Virtualized List

A virtual list built from scratch in React that renders only the visible items in a scrollable container.

## What is a Virtual List?

A virtual list (also called windowing or virtual scrolling) is a technique that renders only the items currently visible in the viewport, rather than rendering all items at once. As the user scrolls, items are dynamically added and removed from the DOM.

## Benefits

- **Scalable**: Handles thousands of items without performance degradation
- **Memory Efficiency**: Minimal DOM nodes regardless of total list size
- **Smooth Scrolling**: Maintains 60fps even with large datasets
- **Lower CPU Usage**: Fewer elements to update and manage
