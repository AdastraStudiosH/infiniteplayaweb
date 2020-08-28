import React from 'react';
import instagram from '../../images/instagram.png';
import facebook from '../../images/facebook.png';
import youtube from '../../images/youtube.png';
import vimeo from '../../images/vimeo.png';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="media-links">
        <a target="_blanc" href="https://www.facebook.com/infiniteplaya">
          <img src={facebook} alt="" />
        </a>
        <a target="_blanc" href="https://vimeo.com/infiniteplaya">
          <img src={vimeo} alt="" />
        </a>
        <a target="_blanc" href="https://www.youtube.com/channel/UCS1UBWaTE-45F_dJ3Ge31GQ">
          <img src={youtube} alt="" />
        </a>
        <a target="_blanc" href="https://www.instagram.com/theinfiniteplaya/">
          <img src={instagram} alt="" />
        </a>
      </div>
      <span>©2020 The Infinite Playa</span>
    </footer>
  )
}

export default Footer
