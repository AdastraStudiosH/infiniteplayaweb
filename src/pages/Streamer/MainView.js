import React, {useEffect, useRef, useState} from "react";
import { Redirect } from "react-router-dom";
import { IdleTimeout, StreamerStatus, VideoStream } from "@calgaryscientific/platform-sdk-react";
import Slider from 'react-rangeslider'

import LoadingView from './Loading/LoadingView'
import { LaunchStatusType } from "@calgaryscientific/platform-sdk";

import 'react-rangeslider/lib/index.css'
import './MainView.scss';



const MainView = (props) => {
  const videoRef = useRef();

  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [volume, setVolume] = useState(props.Audio.volume * 100);
  const [speakerIcon, setSpeakerIcon] = useState('🔈');
  const [isReady, setIsReady] = useState(false);

  const onReady = () => {
    console.debug("Streaming ready.");
    setIsReady(true);
  };

  const volumeChange = (e) => {
    if (props.Audio) {
      setVolume(e);
      props.Audio.volume = e / 100;
    }

    if (e === 0) {
      setSpeakerIcon('🔈');
    } else if (e < 50) {
      setSpeakerIcon('🔉');
    } else {
      setSpeakerIcon('🔊');
    }
  };
  // Use pointer lock
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (currentVideo == null) return;
    if (props.StreamerStatus !== StreamerStatus.Streaming) return;

    const handler = (e) => {
      currentVideo.requestPointerLock();
    };

    const onPointerLockChanged = (e) => {
        if (document.pointerLockElement === currentVideo) {
          setIsPointerLocked(true); 
        } else {
          setIsPointerLocked(false);
        }
    };

    currentVideo.addEventListener("click", handler);
    document.addEventListener('pointerlockchange', onPointerLockChanged);
    return () => {
      currentVideo.removeEventListener("click", handler);
      document.removeEventListener('pointerlockchange', onPointerLockChanged);
    };
  });

  if (props.LaunchRequestStatus.status === LaunchStatusType.Error || props.LaunchRequestStatus.status === LaunchStatusType.Unavailable) {
    return <Redirect to={{
      pathname: "/error",
      state: {
        title: "Streaming service capacity",
        message: "The Infinite Playa streaming capacity is currently reached. Please either download the standalone experience, or try again later."
      }
    }}/>
  }

  if (props.StreamerStatus === StreamerStatus.Failed) {
    return <Redirect to={{
      pathname: "/error",
      state: {
        title: "Communication problem",
        message: "We detected a communication problem between your browser and the cloud service. Please ensure your browser is updated and you are disconnected from any VPN services."
      }
    }}/>
  }

  return isReady ? (<div style={{ height: "100%" }}>          
                  <IdleTimeout
                    Status={props.StreamerStatus}
                    WarningThreshold={300}
                    ExitThreshold={120}
                    ExitCallback={() => props.SignallingConnection?.close()}
                  />

                  <div className="escapeHint" style={{visibility: isPointerLocked ? 'visible' : 'hidden'}}>
                    <p>Press [Esc] for mouse</p>
                  </div>

                  <div className="volumeControl">
                    <span role="img" aria-label="unmute">{speakerIcon}</span>
                    <Slider
                      value={volume}
                      orientation="vertical"
                      onChange={volumeChange}
                    />
                  </div>

                  <div className="logout">
                    <button><a href="/workspace">Logout</a></button>
                  </div>
                  <VideoStream VideoRef={videoRef} Emitter={props.InputEmitter} Stream={props.VideoStream} UseNativeTouchEvents={props.UseNativeTouchEvents} />
                </div>)
        : // loading
        (<div style={{ height: "100%" }}>         
            <LoadingView LaunchRequestStatus={props.LaunchRequestStatus} StreamerStatus={props.StreamerStatus} OnReady={onReady} />
        </div>);
};

export default MainView