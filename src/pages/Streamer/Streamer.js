import React, { useEffect, useState } from 'react';
import {PlatformNext, LaunchStatusType, WebSocketSignalling} from '@calgaryscientific/platform-sdk';
import {  useStreamer, DefaultStreamerOptions } from '@calgaryscientific/platform-sdk-react';
import LaunchView from './LaunchView';
import MainView from './MainView';
import useAsyncEffect from "use-async-effect";


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
    const [status, setStatus] = useState({ status: LaunchStatusType.Unknown, message: "Not started" });

    const [loading, setLoading] = useState(false);    
    const [streamerStatus, emitter, videoStream, audioStream, messageSubject] = useStreamer(signallingConnection, streamerOptions);

    // Cancel launch requests on navigating away
    useEffect(() => {
        window.addEventListener('beforeunload', async () => {
            if (launchRequest.status.getValue() !== LaunchStatusType.Serviced) {
                await launchRequest.cancel();
            }
        });
    }, [launchRequest]);

    // Fetch project definition
    useAsyncEffect(async () => {
        await platform.useAnonymousCredentials("4116aa26-1e9b-40f4-8131-0e9f2d0d2686");
        let models = await platform.getModels();
        setModelDefinition(models[0]);
    });

    // Monitor Launch Request Status
    useEffect(() => {
        if (launchRequest == null) return;
        const subscription = launchRequest.status.subscribe(
          statusEvent => {
            try {
              if (statusEvent.status === LaunchStatusType.Ready) {
                let signallingConnection = new WebSocketSignalling(statusEvent.message, false);
                setSignallingConnection(signallingConnection);
              }
              setStatus(statusEvent);
            } catch (err) {
                setStatus({ status: LaunchStatusType.Error, message: err });
            }
          },
          err => {
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

    if (audioStream) 
        audio.srcObject = audioStream;

    const view = loading ? 
    <MainView
    VideoStream={videoStream}
    StreamerStatus={streamerStatus}
    LaunchRequestStatus={status}
    SignallingConnection={signallingConnection}
    InputEmitter={emitter}
    UseNativeTouchEvents={true}
    /> :
    <LaunchView Launch={launch} />;
    
    return (
    <section className="streamer">
       {view}
    </section>
    );
};

export default Streamer;
