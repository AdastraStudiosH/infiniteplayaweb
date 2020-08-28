import React, {useState} from "react";
import {FullScreen} from "react-full-screen";
import { IdleTimeout, StreamerStatus, System, VideoStream } from "@calgaryscientific/platform-sdk-react";


import LoadingView from './Loading/LoadingView'

const MainView = (props) => {
    const [isFull, setIsFull] = useState(false);
  
    // Fullscreen API presently supported on iPad, but not iPhone or iPod
    const isIPhone = System.Browser().os === "iOS" && !window.navigator.userAgent.includes("iPad");
    return (
      <div style={{ height: "100%" }}>
          <h1> MainView </h1>
          <IdleTimeout
            Status={props.StreamerStatus}
            WarningThreshold={300}
            ExitThreshold={120}
            WarningCallback={() => setIsFull(false)}
            ExitCallback={() => props.SignallingConnection?.close()}
          />
  
          <LoadingView LaunchRequestStatus={props.LaunchRequestStatus} StreamerStatus={props.StreamerStatus} />
          <VideoStream Emitter={props.InputEmitter} Stream={props.VideoStream} UseNativeTouchEvents={props.UseNativeTouchEvents} />
  
          <button
            onClick={() => setIsFull(true)}
            style={{ position: "absolute", top: 10, right: 10 }}
            className={isIPhone || isFull || props.StreamerStatus !== StreamerStatus.Streaming ? "hidden" : ""}
          >
            FS
          </button>
  
          {props.StreamerStatus !== StreamerStatus.Streaming && (
            <img alt="PureWeb Logo" src="/pureweb.svg" style={{ width: 100, position: "absolute", bottom: 50, right: 10 }} />
          )}
      </div>
    );
  };

  export default MainView