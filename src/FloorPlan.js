import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { fabric } from "fabric";

const FloorPlan = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#f8f9fa",
    });
    canvas.setWidth(600);
    canvas.setHeight(400);

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  const [, drop] = useDrop(() => ({
    accept: "room", // Ensure this matches the type in Room.js
    drop: (item, monitor) => {
      const { name, width, height } = item;
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const x = offset.x - 100; // Adjust to position correctly
      const y = offset.y - 100;

      const rect = new fabric.Rect({
        left: x,
        top: y,
        width: width * 20,
        height: height * 20,
        fill: "lightblue",
        stroke: "black",
        strokeWidth: 2,
        selectable: true,
        hasControls: true,
      });

      const text = new fabric.Text(name, {
        left: x + 10,
        top: y + 10,
        fontSize: 16,
        fill: "black",
      });

      fabricCanvasRef.current.add(rect, text);
    },
  }));

  return (
    <div ref={drop} className="p-4 bg-gray-200 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Drag and Drop Rooms</h2>
      <canvas ref={canvasRef} className="border border-gray-400"></canvas>
    </div>
  );
};

export default FloorPlan;
