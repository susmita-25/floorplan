import React from "react";
import { useDrop } from "react-dnd";

function DropZone({ children }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ROOM",
    drop: (item) => console.log(`Dropped ${item.name}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="drop-zone"
      style={{
        minHeight: "150px",
        border: "2px dashed gray",
        backgroundColor: isOver ? "lightgreen" : "white",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
}

export default DropZone;
