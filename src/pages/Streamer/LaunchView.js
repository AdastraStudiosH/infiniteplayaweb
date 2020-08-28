import React from "react";
import "./LaunchView.css";

const LaunchView = (props) => {
  return (
    <div id="launchContainer">
      <div>
        <h1>Infinite Playa</h1>
          <button color="blue" onClick={() => props.Launch()}>Play(a)</button>
      </div>
    </div>
  );
};


export default LaunchView