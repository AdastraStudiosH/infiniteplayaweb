import React, { useState } from 'react';

const SignUp = (props) => {
  const [isErrors, showErrors] = useState(false);

  const { signUp, error, last_name, setLastName, toggleSetStep, first_name, setFirstName, setEmail, email, regUsername, setRegUsername, repeatPassword, setRepeatPassword, password, setPassword } = props;

  const validateFields = () => {
    let reg = /^[\S]+.*[\S]+$/;

    if (first_name.length === 0 || last_name.length === 0 || email.length === 0 || !email.includes('@') || regUsername.length === 0 || !reg.test(password) || password !== repeatPassword) {
      showErrors(true);
      return false;
    }

    showErrors(false);
    return true;
  }

  return (
    <React.Fragment>
        <h2>Register</h2>
        <input 
          type="text" 
          value={first_name}
          autoComplete='undefined'
          onChange={e => setFirstName(e.target.value)} 
          placeholder="name" 
        />
        <input 
          type="text" 
          value={last_name}
          autoComplete='undefined'
          onChange={e => setLastName(e.target.value)} 
          placeholder="last name" 
        />
        <input 
          type="email"
          autoComplete='undefined' 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="email" 
        />
        <input 
          type="text" 
          value={regUsername}
          autoComplete="no"
          onChange={e => setRegUsername(e.target.value)} 
          placeholder="username (Playa Name)" 
        />
        <input 
          type="password"
          autoComplete='undefined'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password" 
        />
        <input 
          type="password" 
          placeholder="repeat password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
        <span onClick={() => toggleSetStep(0)}>Back to Sign In</span>
        <div className="login-checkbox">
          <input type="checkbox" />
          <span>Opt in to share your information with Burning Man.</span>
        </div>
        {error && <div className="errors">{error}</div>}
        {isErrors && <div className="errors">Need to fill all the fields</div>}
        <button onClick={() => {
          error ? signUp() : validateFields() && toggleSetStep(2)
        }}>Sign Up</button>
      </React.Fragment>
    )
}

export default SignUp;
