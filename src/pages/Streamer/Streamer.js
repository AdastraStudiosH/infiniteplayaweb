import React, { useEffect, useState } from 'react';
import {PlatformNext, ModelDefinition} from '@calgaryscientific/platform-sdk';
import { useLaunchRequest, useStreamer, DefaultStreamerOptions } from '@calgaryscientific/platform-sdk-react';
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
    const [modelDefinition, setModelDefinition] = useState();
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
        await platform.useAnonymousCredentials("4116aa26-1e9b-40f4-8131-0e9f2d0d2686");
        let models = await platform.getModels();
        setModelDefinition(models[0]);
    });

    const streamerOptions = DefaultStreamerOptions;
    streamerOptions.useNetworkTraversalService = true;

    const [status, queueLaunchRequest, signallingConnection] = useLaunchRequest(platform, modelDefinition);
    const [streamerStatus, emitter, videoStream, audioStream, messageSubject] = useStreamer(signallingConnection, streamerOptions);

    const launch = async () => {
        setLoading(true);
        audio.load();
        await queueLaunchRequest();
    };

    if (audioStream) audio.srcObject = audioStream;


    const view = loading ? <MainView
    VideoStream={videoStream}
    StreamerStatus={streamerStatus}
    LaunchRequestStatus={status}
    SignallingConnection={signallingConnection}
    InputEmitter={emitter}
    UseNativeTouchEvents={true}
  /> : <LaunchView Launch={launch} />;
    

    return (
    <section className="streamer">
       {view}
    </section>
    );
};
export default Streamer;
