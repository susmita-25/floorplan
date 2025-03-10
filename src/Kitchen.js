import React from "react";
import Oven from "./Oven";
import Sink from "./Sink";

function Kitchen(props) {
  return (
    <div id="kitchen">
      Kitchen
      <Oven />
      <Sink />
    </div>
  );
}

export default Kitchen;
