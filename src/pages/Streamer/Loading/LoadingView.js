import React, {useState} from "react";
import { StreamerStatus } from "@calgaryscientific/platform-sdk-react";
import { LaunchStatusType } from "@calgaryscientific/platform-sdk";
import YouTube from 'react-youtube';

import './LoadingView.scss';

const LoadingView = (props) => {

    const [isHidden, setIsHidden] = useState(false);

    // const greeterVideos = ['M--OsMIduBo', 
    //                        'HGqP4rl5Z6A',
    //                        '-BJ-T1SULpo',
    //                        'KaYaujUGHXc',
    //                        'WCmngYiL2iM']

    // const video = useMemo(() => {
    //   return greeterVideos[greeterVideos.length * Math.random() | 0]
    // });

    if (isHidden) return <div/>;
    
    let content;
    if (
      props.LaunchRequestStatus.status === LaunchStatusType.Unavailable ||
      props.LaunchRequestStatus.status === LaunchStatusType.Error ||
      props.StreamerStatus === StreamerStatus.Failed
    ) {
      content = (
        <div>
          <h3>The experience is presently unavailable.</h3>
          <h3>Please refresh to request a new session.</h3>
        </div>
      );
    } else {
      content = (
        <div className="loadingView" >
          <div className="video-background">
            <div className="video-foreground">
              <iframe title="Greeter" src="https://www.youtube.com/embed/M--OsMIduBo?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1" allow='autoplay; encrypted-media' frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>

          <div id="vidtop-content">
            <div className="vid-info">
              <h1>Please wait, your streaming experience is loading.</h1>
              <h3>Queue status: {props.LaunchRequestStatus.status}</h3>
              { 
                props.StreamerStatus === StreamerStatus.Streaming ?? <button onClick={() => {setIsHidden(true)}}>Ready</button>
              }
            </div>
          </div>
        </div>
      );
    }
    return (
      content
    );
  };

  export default LoadingView;