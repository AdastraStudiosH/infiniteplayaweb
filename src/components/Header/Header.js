import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import { connect } from 'react-redux';
import instagram from '../../images/instagram.png';
import facebook from '../../images/facebook.png';
import youtube from '../../images/youtube.png';
import vimeo from '../../images/vimeo.png';
import { Link } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';
import Auth from '@aws-amplify/auth';

import './Header.scss';
import Login from '../../pages/Login/Login';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux';
import { setAuthData } from '../../redux/auth/auth.reducer';

const Header = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoginOpen, toggleLoginOpener] = useState(false);

  const signOut = async () => {
    await Auth.signOut().then(() => {
      props.setAuthData(undefined);
      localStorage.nickname = undefined;
    }).catch(err => console.log(err));
  }

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
      {console.log(props.data, localStorage.auth, Object.values(localStorage))}
      {!props.data || localStorage.nickname === 'undefined' || !localStorage.nickname
        ? <button onClick={() => toggleLoginOpener(!isLoginOpen)}>Login</button>
        : (
          <React.Fragment>
            <Link to="/workspace"><button>{localStorage.nickname}</button> </Link>
            <button onClick={() => signOut()} style={{ marginLeft: '20px', width: '50px', padding: '0.2em 1em' }}>X</button>
          </React.Fragment>
        )
      }
      {isLoginOpen && <Login closeLogin={() => toggleLoginOpener(false)} />}
      
    </header>
  )
}

const mapStateToProps = state => ({
  data: state.auth.personal_data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);
