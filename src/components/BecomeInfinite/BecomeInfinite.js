import React from 'react';
import { Link } from 'react-router-dom';

import './BecomeInfinite.scss';

const BecomeInfinite = () => {
  return (
    <div className="become-infinite" id="become">
      <div className="become-wrapper">
        <h2>Become Infinite</h2>
        <span>To make The Infinite Playa a reality, we will be drawing  upon the talents and resources of our gifted community.</span>
        <span>For questions please see our <Link to="/faq">FAQ</Link> page. If you would like to participate or volunteer please fill out this short form:</span>
        <Link to="/participate"><button className="participate-button">participate</button></Link>
        <span>Join us and become part of the Infinite!</span>
        <div className="subscribe-button">
          <input 
            required  
            type="email" 
            placeholder="Enter your email here*"
            maxLength="250"
            pattern="^.+@.+\.[a-zA-Z]{2,63}$"
          />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default BecomeInfinite;
