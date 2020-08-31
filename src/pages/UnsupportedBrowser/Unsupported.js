import React from "react";
import './Unsupported.scss';

const Unsupported = (props) => {

    const isMobile = props?.location?.state?.isMobile || false;

    const content = isMobile ? 
                    <React.Fragment>
                        <p>Mobile support</p>
                        <span>Our 3D streaming experience is still being optimized for mobile. Please check back often!</span>
                        <span>Meanwhile, head <a href="https://watch.infiniteplaya.com/">here</a> to watch all the amazing content for free.</span>
                    </React.Fragment> 
                    : <React.Fragment><p>Unsupported browser</p>
                    <span>Sorry, it looks like you're trying to access the streaming session using an unsupported browser.</span>
                    <span>Please make sure you're using the latest version of Chrome or Safari.</span>
                    <span>If you believe you may have received this message in error, please contact <a href="mailto:support@infiniteplaya.com">support</a>. </span>
                    <span>As this is a beta, we are not able to offer immediate technical or customer assistance.</span>
                    <span>Meanwhile, head <a href="https://watch.infiniteplaya.com/">here</a> to watch all the amazing content for free.</span></React.Fragment>
    return (
    <div className="unsupportedContainer">
        <div className="unsupported">
            {content}
        <a href="/">Home</a>
        </div>
    </div>
    );
};
export default Unsupported;