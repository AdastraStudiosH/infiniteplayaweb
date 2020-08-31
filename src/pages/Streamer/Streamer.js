import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import useAsyncEffect from "use-async-effect";
import {
  PlatformNext,
  PlatformCredentials,
  LaunchStatusType,
  WebSocketSignalling,
} from "@calgaryscientific/platform-sdk";
import {
  useStreamer,
  DefaultStreamerOptions,
  System,
  StreamerStatus,
} from "@calgaryscientific/platform-sdk-react";

import LaunchView from "./LaunchView";
import MainView from "./MainView";
import { API, Auth } from "aws-amplify";
import log from '../../Log';

import "./Streamer.scss";

// Initialize platform reference
const platform = new PlatformNext();

// Initialize audio.
// load() must be called from a user interaction, especially to retain iOS audio
// this can be 'mouseup', 'touchend' or 'keypress'
// Pass the audioStream created from useStreamer as the srcObject to play game audio.
const audio = new Audio();
audio.autoplay = true;
audio.volume = 0.5;

const Streamer = () => {
  const streamerOptions = DefaultStreamerOptions;
  streamerOptions.useNetworkTraversalService = true;

  const [modelDefinition, setModelDefinition] = useState(null);
  const [launchRequest, setLaunchRequest] = useState(null);
  const [signallingConnection, setSignallingConnection] = useState(null);
  const [status, setStatus] = useState({
    status: LaunchStatusType.Unknown,
    message: "Not started",
  });

  const [loading, setLoading] = useState(false);
  const [
    streamerStatus,
    emitter,
    videoStream,
    audioStream,
    messageSubject,
  ] = useStreamer(signallingConnection, streamerOptions);

  // Cancel launch requests on navigating away
  useEffect(() => {
    window.addEventListener("beforeunload", async () => {
      if (launchRequest == null) return;
      if (launchRequest.status.getValue() !== LaunchStatusType.Serviced) {
        log.info("Cancelling pending launch request.");
        await launchRequest.cancel();
      }
    });
  }, [launchRequest]);

  // Send Cognito details to game
  useAsyncEffect(async () => {
    if(streamerStatus === StreamerStatus.Streaming) {
      let currentSession = await Auth.currentSession();
      let id_token = currentSession.getIdToken().getJwtToken();
      let access_token = currentSession.getAccessToken().getJwtToken();
      let refresh_token = currentSession.getRefreshToken().getJwtToken();
      emitter.EmitUIInteraction({id_token, access_token, refresh_token});   
      
      log.info("Sending credentials to game.");
    }
  },[streamerStatus]);

  // Fetch project definition
  useAsyncEffect(async () => {
    //await platform.useAnonymousCredentials("e42dc69a-115e-49b0-bd0c-ce95d700c76b");

    const credentials = new PlatformCredentials();
    const res = await API.get("PureWebCredentialsAPI", "/credentials", {});
    credentials.fromJSON(res);
    log.debug("Received platform access credentials: ", credentials);
    // @ts-ignore
    platform.credentials = credentials;
    let models = await platform.getModels();
    setModelDefinition(models[0]);
  }, []);

  // Monitor Launch Request Status
  useEffect(() => {
    if (launchRequest == null) return;
    const subscription = launchRequest.status.subscribe(
      (statusEvent) => {
        try {
          if (statusEvent.status === LaunchStatusType.Ready) {
            let signallingConnection = new WebSocketSignalling(
              statusEvent.message,
              false
            );
            setSignallingConnection(signallingConnection);
          }
          setStatus(statusEvent);
        } catch (err) {
          setStatus({ status: LaunchStatusType.Error, message: err });
        }
      },
      (err) => {
        setStatus({ status: LaunchStatusType.Error, message: err });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [launchRequest]);

  // Execute launch on user action
  const launch = async () => {
    if (modelDefinition == null) return;

    setLoading(true);
    audio.load();

    let lr = await platform.requestModel(modelDefinition);
    setLaunchRequest(lr);
  };

  if (audioStream) audio.srcObject = audioStream;

  // Render / redirect unsupporte\d
  if (!System.IsBrowserSupported() || isMobile) {
    return <Redirect to={{
      pathname: "/unsupported",
      state: {isMobile}
    }}/>
  }

 

  // Render
  const view = loading ? (
    <MainView
      VideoStream={videoStream}
      StreamerStatus={streamerStatus}
      LaunchRequestStatus={status}
      SignallingConnection={signallingConnection}
      InputEmitter={emitter}
      UseNativeTouchEvents={true}
    />
  ) : (
    <LaunchView Launch={launch} Ready={modelDefinition !== null}/>
  );

  return <section className="streamer">{view}</section>;
};

export default Streamer;
