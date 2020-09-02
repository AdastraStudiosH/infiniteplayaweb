import React, { useState, useEffect } from 'react';
import title from '../../images/title.png';
import exp_button from '../../images/exp_button.png';
import watch_button from '../../images/watch_button.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import arrow from '../../images/arrow.svg';
import { HashLink as HLink } from 'react-router-hash-link';
import { bindActionCreators } from 'redux';
import { setIsLogin } from '../../redux/auth/auth.reducer';

import './Description.scss';

const Description = (props) => {

  console.log(props.isSignOut);

  return (
    <div className="description">
      <img src={title} alt="title" />
      {/* <p>go "home" at home</p> */}
      <p>Welcome Home</p>
      <div className="description-buttons">
        <div>
          <a 
            onClick={() => {
              props.isSignOut && props.setIsLogin(!props.isLogin)
            }} 
            href="https://watch.infiniteplaya.com/">
            <img src={watch_button} />
            <span>Free Live Streaming Content</span>
          </a>
        </div>
        <div>
          <Link 
            onClick={() => {
              props.isSignOut && props.setIsLogin(!props.isLogin)
            }} to={props.isSignOut ? '#' : "/streamer"}>
            <img src={exp_button} />
            <span>Interactive Paid Experience</span>
          </Link>
        </div>
      </div>

      <a href="https://www.infiniteplaya.com/" target="_blanc"><button>About The Infinite</button></a>
      
      {/* <span>This year, for the first time in its history, Burning Man canceled in the face of the COVID-19 crisis</span>
      <span>Without the Burn where do we go to be inspired, to be free, to turn ourwildest dreams into reality and to celebrate the joy of profound human connection?</span>
      <span>To this end we have endeavored to create a virtual playa that will provide users with the simulated experience of going “Home” without actually leaving their homes.</span>
      <span>Welcome to The Infinite Playa, a world built for Burners, by Burners!</span>
      <HLink to="/#video" className="arrow">
        <svg preserveAspectRatio="xMidYMid meet" id="comp-jwet46j7svgcontent" data-bbox="72.5 20 55 160" viewBox="72.5 20 55 160" height="52" width="17" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="img">
          <g>
              <path d="M127.5 49.186L100 20 72.5 49.186l2.957 2.808 22.116-23.476V180h4.854V28.518l22.116 23.476 2.957-2.808z"></path>
          </g>
        </svg>  
      </HLink> */}
    </div>
  )
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isSignOut: state.auth.isSignOut
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setIsLogin
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Description);
