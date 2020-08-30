import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import Login from '../../pages/Login/Login';
import { bindActionCreators } from 'redux';
import { setAuthData } from '../../redux/auth/auth.reducer';

import "./Header.scss";

const Header = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, toggleLoginOpener] = useState(false);
  const [IsSignOut, toggleSetSignOut] = useState(false);

  useEffect(() => {
    Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn": {
          const user = await Auth.currentAuthenticatedUser();
          const nickname = user.signInUserSession.idToken.payload.nickname;
          const token = user.signInUserSession.accessToken.jwtToken;
          localStorage.nickname = nickname;
          localStorage.token = token;
          props.setAuthData(nickname, token);
          break;
        }
        default: {
          break;
        }
      }
    });
  }, []);

  const signOut = async () => {
    props.setAuthData(undefined);
    localStorage.nickname = undefined;
    localStorage.token = undefined;
    await Auth.signOut();
    toggleSetSignOut(true);
  }

  if (IsSignOut) return <Redirect to="/" />

  return (
    <header className="header">
      <Link className="logo" to="/"><img src={logo} alt="logo" /></Link>
      {window.innerWidth < 500 && (
        <div onClick={() => setOpen(!isOpen)} className={isOpen ? 'hamburger open' : "hamburger"}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      { window.innerWidth < 500 && (
        <div className={`wrapper-links ${isOpen ? 'header-open' : ''}`} onClick={() => setOpen(false)}>
          <HLink to="/#video">Experience the infinite</HLink>
          <HLink to="/#gallery">gallery</HLink>
          <HLink to="/#become">become infinite</HLink>
          <Link className={window.location.pathname.includes('faq') ? 'active-link' : ''} to="/faq">faq</Link>
        </div>
      )}
      <div className="links">
        <HLink to="/#video">Experience the infinite</HLink>
        <HLink to="/#gallery">gallery</HLink>
        <HLink to="/#become">become infinite</HLink>
        <Link className={window.location.pathname.includes('faq') ? 'active-link' : ''} to="/faq">faq</Link>
      </div>
      {!props.data || localStorage.token === 'undefined' || !localStorage.token
        ? <div className="header-authorized">
            <button onClick={() => toggleLoginOpener(!isLoginOpen)}>Login</button>
         </div>
        : (
          <div className="header-authorized">
            <Link to="/workspace"><button>{props.user ? props.user.userAttributes.nickname : 'username'}</button> </Link>
            <button onClick={() => signOut()} style={{ marginLeft: '20px', width: '50px', padding: '0.2em 1em' }}>X</button>
          </div>
        )
      }
      {isLoginOpen && <Login closeLogin={() => toggleLoginOpener(false)} />}
      
    </header>
  )
}

const mapStateToProps = state => ({
  data: state.auth.personal_data,
  user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);
