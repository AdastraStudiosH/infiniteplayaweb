import React, {useState} from "react";
import { StreamerStatus } from "@calgaryscientific/platform-sdk-react";
import { LaunchStatusType } from "@calgaryscientific/platform-sdk";

import './LoadingView.scss';

const LoadingView = (props) => {

    const [isHidden, setIsHidden] = useState(false);

   

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
          <div className="mapViewer">
            <iframe src="https://3ngage.se/burningman/" title="BurningMan" width="100%" height="100%"/>
          </div>

          <div id="vidtop-content">
            <div className="vid-info">
              <h1>Get ready to join the Playa. Your experience is loading.</h1>
              <h3>Queue status: {props.LaunchRequestStatus.status}</h3>
              { 
                props.LaunchRequestStatus.status === LaunchStatusType.Ready ? <button onClick={() => {setIsHidden(true)}}>Ready</button> : <p/>
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