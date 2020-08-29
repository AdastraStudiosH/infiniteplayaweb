import React, {useEffect, useState} from "react";
import {isMobile} from 'react-device-detect';
import rotate from '../../images/mobile-rotate.svg';
import "./LaunchView.css";

const LaunchView = (props) => {

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    

    window.addEventListener('resize', handleResize)
  });

  const shouldRotate = isMobile && dimensions.height > dimensions.width;
  const rotateMessage = shouldRotate ? 
  <div>
    <img src={rotate} alt="Rotate your device"/>
    <p>Experience best viewed in landscape</p>
  </div> : <div/>;
  return (
    <div id="launchContainer">
      <div>
        <h1>Infinite Playa</h1>
          {rotateMessage}
          <button color="blue" onClick={() => props.Launch()}>Play(a)</button>
          
      </div>
    </div>
  );
};


export default LaunchView