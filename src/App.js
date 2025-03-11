import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FloorPlan from "./FloorPlan";
import Room from "./Room";
import axios from "axios";
import { axiosInstance } from "./axios.interceptor";

// const roomData = [
//   { name: "Living Room", width: 15, height: 10, dimension: "15X10" },
//   {
//     name: "Bedroom", width: 8, height: 8, dimension: "8X8",
//     accessories: {
//       window: [{ name: "Windows", width: 2, height: 2, position: "top-right" },
//       { name: "Windows", width: 2, height: 2, position: "bottom-right" },
//       { name: "Windows", width: 2, height: 2, position: "top-center" },
//       { name: "Windows", width: 2, height: 2, position: "bottom-center" },
//       { name: "Windows", width: 2, height: 2, position: "top-left" },
//       { name: "Windows", width: 2, height: 2, position: "bottom-left" },
//       { name: "Windows", width: 2, height: 2, position: "left-center" },
//       { name: "Windows", width: 2, height: 2, position: "right-center" }
//       ],
//       // door: [{ name: "Door", width: 2, height: 2 ,position:"left-center"}],
//     }
//   },
//   {
//     name: "Kitchen", width: 6, height: 6, dimension: "6X6",
//     accessories: {
//       window: [{ name: "Windows", width: 2, height: 2, position: "top-left" },
//       { name: "Windows", width: 2, height: 2, position: "left-center" }
//       ],
//       door: [{ name: "Door", width: 2, height: 2, position: "bottom-left" }],
//     }
//   },
//   { name: "Bath", width: 5, height: 3, dimension: "5X3" },
// ];



const App = () => {
  const [roomData, setRoomData] = useState([])
  useEffect(()=>{
    axiosInstance.get('/api/floorplan').then((resp)=>{
      console.log(resp)
      setRoomData(resp.data)
    }).catch((e)=>{
      console.log(e);
      
    })
  },[])
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Floor Plan Designer</h1>
        <div className="flex gap-4">
          {roomData.map((room, index) => (
            <Room key={index} {...room} />
          ))}
        </div>
        <FloorPlan />
      </div>
    </DndProvider>
  );
};

export default App;
