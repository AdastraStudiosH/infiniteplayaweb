import React, { useState } from 'react';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import { connect } from 'react-redux';
import { setAuthData, setSignUpError } from '../../redux/auth/auth.reducer';
import { setUserData } from '../../redux/user/user.reducer';
import { bindActionCreators } from 'redux';
import SignUp from './SignUp/SignUp';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import Terms from './Terms/Terms';
import TermsMain from './TermsMain/TermsMain';
import cross from '../../images/cross.svg';
import facebookLogo from '../../images/facebook.png';
import googleLogo from '../../images/google.png';

import './Login.scss';

const Login = (props) => {
  const [step, toggleSetStep] = useState(0);
  const [isAgeVerification, toggleSetAgeVerification] = useState(false);
  const [username, setUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isRequesting, toggleSetRequest] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const fetchUserData = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/getuserdata', {
      method: 'POST',
      body: JSON.stringify({ 'AccessToken': localStorage.token })
    }).then(res => res.json())
    .then(data => props.setUserData(data))
    .catch(err => console.log(err))
  }

  const signIn = () => {
    toggleSetRequest(true);
    Auth.signIn({
      username,
      password: loginPassword
    })
      .then((result) => {
        props.closeLogin();
        toggleSetRequest(false);
        localStorage.nickname = result.username;
        localStorage.token = result.signInUserSession.accessToken.jwtToken;
        props.setSignUpError(undefined);
        fetchUserData();
        props.setAuthData(result.username, result.signInUserSession.accessToken.jwtToken);
      })
      .catch((e) => {
        props.setSignUpError(e.message)
      });
  };

  const signUp = async () => {
    const result = await Auth.signUp({
      username: regUsername,
      password,
      attributes: {
        name: first_name,
        email: email,
        family_name: last_name,
        nickname: regUsername
      },
    }).then(() => {
      toggleSetStep(6);
      props.setSignUpError(undefined);
      signIn();
    }).catch(e => props.setSignUpError(e.message))
    return result;
  };

  return (
    <React.Fragment>
      <div className="login-wrapper" onClick={props.closeLogin}></div>
      <section className="login">
        {window.innerWidth < 500 && <div onClick={() => props.closeLogin()} className="login-cross">X</div>}
        {step === 0 ? (
          <React.Fragment>
            <h2>Login</h2>
            <input value={username} type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
            <input 
              type="password" 
              placeholder="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              onKeyPressCapture={e => e.code === 13 && signIn()}
            />
            <span onClick={() => toggleSetStep(1)}>Or create new account</span>
            {props.error && <div className="errors">{props.error}</div>}
            <button onClick={() => signIn()}>{isRequesting ? 'Requesting' : 'Login'}</button>
            <h3>Or sign in with</h3>
            <div className="oauth">
              <button
                className="facebook"
                onClick={
                  () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
                }
              >
                <img src={facebookLogo} alt="" />
                Facebook
              </button>
              <button className="google"
                onClick={
                  () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
                }
              >
                <img src={googleLogo} alt="" />
                Google
              </button>
            </div>
          </React.Fragment>
        ) : step === 1 ? (
          <SignUp
            error={props.error}
            signUp={signUp}
            regUsername={regUsername}
            first_name={first_name}
            setFirstName={setFirstName}
            last_name={last_name}
            setLastName={setLastName}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            email={email}
            setRegUsername={setRegUsername}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            toggleSetAgeVerification={toggleSetAgeVerification}
            isAgeVerification={isAgeVerification}
            toggleSetStep={toggleSetStep}
          />
        ) : step === 2 ? (
          <React.Fragment>
            <div className="age-verification">
              <span>Is your Age under 13 years?</span>
              <div>
                <button onClick={() => toggleSetStep(1)} error={props.setSignUpError("You must be over 13 years old to participate in the InfinitePlaya.")}>Yes</button>
                <button onClick={() => toggleSetStep(3)}>No</button>
              </div>
            </div>
          </React.Fragment>
        ) : step === 3 ? <WelcomeScreen toggleSetStep={toggleSetStep} />
          : step === 4 ? <Terms toggleSetStep={toggleSetStep} />
          : step === 5 ? <TermsMain toggleSetStep={toggleSetStep} error={props.error} signUp={signUp}/>
          : step === 6 ?
            (
            <React.Fragment>
              <div>
                <h2>Registration is succesful</h2>
                <p>To finish the Registration, please, confirm your email</p>
              </div>
            </React.Fragment> 
          ) :  ( <div>
            <h2>WHAT HAVE YOU DONE?</h2>
            <p>Look at the horrors you have wrought with your choices!</p>
          </div>)         
      }
      </section>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  data: state.auth.personal_data,
  error: state.auth.auth_error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setAuthData,
    setSignUpError,
    setUserData
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
