import React from "react";

function Bedroom(props) {
  return (
    <div className="bedroom" id={`bed-${props.bedNum}`}>
      Bedroom {props.bedNum}
    </div>
  );
}

export default Bedroom;
