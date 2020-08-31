import React, {useEffect, useState, useMemo} from "react";
import ReactPlayer from 'react-player';
import {isMobile} from 'react-device-detect';
import rotate from '../../images/mobile-rotate.png';
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
  
  if (shouldRotate) {
    return (
    <div id="launchContainer">      
      <div id="rotateMessage">
        <h3>Please rotate your device</h3>
        <img src={rotate} alt="Please rotate your device"/>
      </div>
    </div>);
  }
  else
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
          <button onClick={() => props.Launch()}>[ Press to Continue ]</button>
        </div>
    </div>
  );
};


export default LaunchView