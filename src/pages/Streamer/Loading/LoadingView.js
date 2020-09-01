import React, {useState, useEffect} from "react";
import { StreamerStatus } from "@calgaryscientific/platform-sdk-react";
import { LaunchStatusType } from "@calgaryscientific/platform-sdk";
import log from '../../../Log';
import './LoadingView.scss';

const loadingFrames =  [' ⠋', ' ⠙', ' ⠹', ' ⠸', ' ⠼', ' ⠴', ' ⠦', ' ⠧', ' ⠇', ' ⠏'];
const LoadingView = (props) => {
  const [isHidden, setIsHidden] = useState(false);
  const [frame, setFrame] = useState('');

  useEffect(() => {
    log.debug("Launch request status", props.LaunchRequestStatus);
  }, [props.LaunchRequestStatus])

  useEffect(() => {
    if (props.LaunchRequestStatus.status === LaunchStatusType.Serviced) return;
    let frame = 0;
    let timeout = setInterval(() => {
      frame = (frame + 1 === loadingFrames.length) ? 0 : frame + 1;
      setFrame(loadingFrames[frame]);
    }, 80);

    return () => {
      setFrame('');
      clearTimeout(timeout);
    };
  }, [props.LaunchRequestStatus.status]);

    if (isHidden) return <div/>;
    let friendlyMessage = "";
    switch(props.LaunchRequestStatus.status) {
      case LaunchStatusType.Unknown:
        friendlyMessage = "Initiating request";
        break;
      case LaunchStatusType.Accepted:
        friendlyMessage = "Your request has been accepted";
        break;
      case LaunchStatusType.Queued:
        friendlyMessage = "You've entered the queue";
        break;
      case LaunchStatusType.Ready:
        friendlyMessage = "Your session is starting soon, get ready";
        break;
      case 'requested':
        friendlyMessage = "Your session is starting soon, get ready";
        break;
      case LaunchStatusType.Serviced:
      default: 
        friendlyMessage = "";
        break;
    }

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
          <div className="mapViewer">
            <iframe src="https://3ngage.se/burningman/" title="BurningMan" width="100%" height="100%"/>
          </div>

          <div id="vidtop-content">
            <div className="vid-info">
              <h1>We're loading your Infinite Playa experience. Please explore the world map while you wait.</h1>
              <h3>{friendlyMessage}{frame}</h3>
              { 
                props.LaunchRequestStatus.status === LaunchStatusType.Serviced ? <button onClick={() => {setIsHidden(true)}}>Ready</button> : <p/>
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