import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { setAuthData, setSignUpError } from '../../redux/auth/auth.reducer';
import { bindActionCreators } from 'redux';
import SignUp from './SignUp/SignUp';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import Terms from './Terms/Terms';
import TermsMain from './TermsMain/TermsMain';

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
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const signIn = () => {
    Auth.signIn({
      username,
      password: loginPassword
    })
      .then((result) => {
        props.closeLogin();
        console.log(result, result.storage, result.username);
        localStorage.nickname = result.username;
        props.setAuthData(result.username);
      })
      .catch((e) => {
        props.setSignUpError(e.message)
      });
  };

  const signUp = async () => {
    console.log(first_name, last_name, regUsername, email, password, repeatPassword);
    const result = await Auth.signUp({
      username: regUsername,
      name: first_name,
      last_name,
      email,
      password,
    }).then(() => {
      toggleSetStep(6);
      signIn()
    }).catch(e => props.setSignUpError(e.message))
    console.log(result)
    return result;
  };

  return (
    <React.Fragment>
      <div className="login-wrapper" onClick={props.closeLogin}></div>
      <section className="login">
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
            <button onClick={() => signIn()}>Login</button>
          </React.Fragment>
        ) : step === 1 ? (
          <SignUp 
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
                <button onClick={() => toggleSetStep(3)}>Yes</button>
                <button onClick={() => toggleSetStep(1)}>No</button>
              </div>
            </div>
          </React.Fragment>
        ) : step === 3 ? <WelcomeScreen toggleSetStep={toggleSetStep} />
          : step === 4 ? <Terms toggleSetStep={toggleSetStep} />
          : step === 5 ? <TermsMain error={props.error} signUp={signUp}/>
          : (
            <div>
              <h2>Registration is succesful</h2>
              <p>To finish the Registration, please, confirm your email</p>
            </div>
          ) 
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
    setSignUpError
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
