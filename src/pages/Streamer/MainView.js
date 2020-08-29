import React, {useState} from "react";
import { IdleTimeout, StreamerStatus, System, VideoStream } from "@calgaryscientific/platform-sdk-react";


import LoadingView from './Loading/LoadingView'

const MainView = (props) => {
  
    return (
      <div style={{ height: "100%" }}>          
          <IdleTimeout
            Status={props.StreamerStatus}
            WarningThreshold={300}
            ExitThreshold={120}
            ExitCallback={() => props.SignallingConnection?.close()}
          />
  
          <LoadingView LaunchRequestStatus={props.LaunchRequestStatus} StreamerStatus={props.StreamerStatus} />
          <VideoStream Emitter={props.InputEmitter} Stream={props.VideoStream} UseNativeTouchEvents={props.UseNativeTouchEvents} />
  
      </div>
    );
  };

  export default MainView