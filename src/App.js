import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FloorPlan from "./FloorPlan";
import Room from "./Room";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Floor Plan Designer</h1>
        <div className="flex gap-4">
          <Room name="Living Room" width={10} height={10} />
          <Room name="Bedroom" width={8} height={8} />
          <Room name="Kitchen" width={6} height={6} />
        </div>
        <FloorPlan />
      </div>
    </DndProvider>
  );
};

export default App;
