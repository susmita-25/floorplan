import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { fabric } from "fabric";

const FloorPlan = () => {

  function addDoorWindows(x, y, win, width, height,type) {
    let winX = x;
    let winY = y;
  
    if (win.position === "top-right") {
      winX = x + width * 20 - (win.width * 5);
      winY = y;
    } else if (win.position === "top-left") {
      winX = x;
      winY = y;
    } else if (win.position === "bottom-right") {
      winX = x + width * 20- (win.width * 5);
      winY = y + height * 20-(win.height * 5);
    } else if (win.position === "bottom-left") {
      winX = x;
      winY = y + height * 20-(win.height * 5);
    } else if (win.position === "top-center") {
      winX = x + width * 10- (win.width * 5);
      winY = y;
    } else if (win.position === "left-center") {
      winX = x;
      winY = y + height * 10-(win.height * 5);
    } else if (win.position === "right-center") {
      winX = x + width * 20- (win.width * 5);
      winY = y + height * 10-(win.height * 5);
    } else if (win.position === "bottom-center") {
      winX = x + width * 10- (win.width * 5);
      winY = y + height * 20-(win.height * 5);
    }
  
    const window_rect = new fabric.Rect({
      left: winX,
      top: winY,
      width: win.width * 5,
      height: win.height * 5,
      fill: "lightblue",
      stroke: "black",
      strokeWidth: 2,
      selectable: true,
    });
    let text = type === 'door' ? 'D' : 'W';
    const window_text = new fabric.Text(text, {
      left: winX + 2,
      top: winY + 2,
      fontSize: 10,
      fill: "black",
    });
    return { window_rect, window_text };
  }

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
      const { name, width, height, dimension, accessories } = item;
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
      let textName = dimension ? name+"("+dimension+")" : name
      const text = new fabric.Text(textName, {
        // left: x + 10,
        // top: y + 10,
        left: (width*4) + x,
        top: (height*6) + y,
        fontSize: 14,
        fill: "black",
      });

      const text_1 = new fabric.Text(width+"", {
        left:(width*10) + x,
        top: y + 5,
        fontSize: 10,
        fill: "black",
      });

      const text_2 = new fabric.Text(height+"", {
        left: x + 5,
        top: (height*10) + y,
        fontSize: 10,
        fill: "black",
      });
      debugger;

      
      let objects = [rect, text, text_1, text_2];
      
      if (accessories?.window) {
        accessories.window.forEach((win) => {
          const { window_rect, window_text } = addDoorWindows(x, y, win, width, height,"window");
          objects.push(window_rect, window_text);
        });
      }

      if(accessories?.door){
        accessories.door.forEach((door) => {
          const { window_rect, window_text } = addDoorWindows(x, y, door, width, height,"door");
          objects.push(window_rect, window_text);
        });
        const rect = new fabric.Rect({
          left: x,
          top: y,
          width: 1,
          height: 1,
          fill: "lightblue",
          stroke: "black",
          strokeWidth: 2,
          selectable: true,
          hasControls: true,
        });
      }

      let group = new fabric.Group(objects, {
        left: 100,
        top: 100
      });

      fabricCanvasRef.current.add(group);
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


