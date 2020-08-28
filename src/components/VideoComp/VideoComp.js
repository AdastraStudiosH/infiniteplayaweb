import React from 'react';

import './VideoComp.scss';

const VideoComp = () => {
  return (
    <div className="video" id="video">
      <iframe src="https://player.vimeo.com/video/432624947" width="80%" height="80%" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
    </div>
  )
}

export default VideoComp;
