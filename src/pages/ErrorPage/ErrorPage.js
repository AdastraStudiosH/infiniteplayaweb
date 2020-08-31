import React from "react";
import './ErrorPage.scss';
import log from '../../Log';

const ErrorPage = (props) => {
    const title = props?.location?.state?.title || "Streaming session error";
    const message = props?.location?.state?.message || "";
    return (
        <div className="errorContainer">
            <div className="error">
            <p>{title}</p>
            <span>{message}</span>
            <span>You may also contact <a href="mailto:support@infiniteplaya.com">support</a>. </span>
            <span>But as this is a beta, we are not able to offer immediate technical or customer assistance.</span>
            <span>Meanwhile, head <a href="https://watch.infiniteplaya.com/">here</a> to watch all the amazing content for free.</span>
            <a href="/">Home</a>
            </div>
        </div>
        );
};

export default ErrorPage;