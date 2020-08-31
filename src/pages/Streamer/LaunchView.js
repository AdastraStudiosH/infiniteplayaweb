import React, {useEffect, useState, useRef} from "react";
import title from '../../images/title.png';

import "./LaunchView.scss";

// const greeterVideos = ['https://youtu.be/M--OsMIduBo', 
//                            'https://youtu.be/HGqP4rl5Z6A',
//                            'https://youtu.be/-BJ-T1SULpo',
//                            'https://youtu.be/KaYaujUGHXc',
//                            'https://youtu.be/WCmngYiL2iM']

const greeterVideos = ['https://d2yfukh5cx27cp.cloudfront.net/Intro_Helix.mp4',
                       'https://d2yfukh5cx27cp.cloudfront.net/Intro_DaleyDale.mp4',
                       'https://d2yfukh5cx27cp.cloudfront.net/Intro_FoxyFlambe.mp4',
                       'https://d2yfukh5cx27cp.cloudfront.net/Intro_Helix.mp4',
                       'https://d2yfukh5cx27cp.cloudfront.net/Intro_Lynnfinity.mp4',
                       'https://d2yfukh5cx27cp.cloudfront.net/Intro_Natasha.mp4']

const video = greeterVideos[greeterVideos.length * Math.random() | 0];

const LaunchView = (props) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handler = () => {
      if (videoRef.current === null) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  const playing = isMuted ? <span role="img" aria-label="unmute">&#128264;</span> : <span role="img" aria-label="unmute">&#128266;</span>
  return (
    <div id="launchContainer">
      <div>
          <div className="player">
          <video ref={videoRef} id="greeterVideo" poster={title} loop autoPlay muted>
            <source src={video} type="video/mp4"/>
          </video>
          </div>
          <button className="unmute">{playing}</button>
          <button className="continue" disabled={!props.Ready} onClick={() => props.Launch()}>[ Press to Continue ]</button>
        </div>
    </div>
  );
};


export default LaunchView