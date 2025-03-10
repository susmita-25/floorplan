import React from "react";
import { useDrag } from "react-dnd";

const Room = ({ name, width, height }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "room", // Ensure this matches the accept type in FloorPlan.js
    item: { name, width, height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border border-gray-500 cursor-grab bg-white ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {name} ({width}x{height})
    </div>
  );
};

export default Room;
