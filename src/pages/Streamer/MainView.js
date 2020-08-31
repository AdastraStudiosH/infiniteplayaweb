import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { IdleTimeout, StreamerStatus, System, VideoStream } from "@calgaryscientific/platform-sdk-react";


import LoadingView from './Loading/LoadingView'
import { LaunchStatusType } from "@calgaryscientific/platform-sdk";

const MainView = (props) => {
  
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