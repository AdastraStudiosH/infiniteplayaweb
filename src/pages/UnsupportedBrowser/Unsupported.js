import React from "react";
import './Unsupported.scss';

const Unsupported = () => {

    return (
    <div className="unsupportedContainer">
        <div className="unsupported">
        <p>Unsupported browser detected</p>
        <span>Sorry, it looks like you're trying to access the streaming session using an unsupported browser.</span>
        <span>Please make sure you're using the latest version of Chrome or Safari.</span>
        <span>If you believe you may have received this message in error, please contact <a href="mailto:support@infiniteplaya.com">support</a>. </span>
        <span>As this is a beta, we are not able to offer immediate technical or customer assistance.</span>
        <a href="/">Home</a>
        </div>
    </div>
    );
};
export default Unsupported;