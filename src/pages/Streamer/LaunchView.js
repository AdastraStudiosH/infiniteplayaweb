import React, {useEffect, useState, useMemo} from "react";
import ReactPlayer from 'react-player';
import {isMobile} from 'react-device-detect';
import rotate from '../../images/mobile-rotate.svg';
import "./LaunchView.scss";

const greeterVideos = ['https://youtu.be/M--OsMIduBo', 
                           'https://youtu.be/HGqP4rl5Z6A',
                           'https://youtu.be/-BJ-T1SULpo',
                           'https://youtu.be/KaYaujUGHXc',
                           'https://youtu.be/WCmngYiL2iM']

const video = greeterVideos[greeterVideos.length * Math.random() | 0];

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
        <h1>Welcome to The Infinite Playa</h1>
          <div className="player">
          <ReactPlayer 
            url={video}
            controls={false}
            playsinline={true}
            config={{
              
              youtube: {
                playerVars: { modestbranding: 1, playsinline: 1, autoplay: 1 }
              }
            }}
          />
          </div>
          <button color="blue" onClick={() => props.Launch()}>[ Press to Continue ]</button>
          {rotateMessage}
        </div>
    </div>
  );
};


export default LaunchView