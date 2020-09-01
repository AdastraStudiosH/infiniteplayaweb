import React, { useState } from 'react';

import './SignUp.scss';

const SignUp = (props) => {
  const [isErrors, showErrors] = useState(false);
  const [errMessage, errorMessage] = useState(false);

  const { signUp, error, last_name, setLastName, toggleSetStep, first_name, setFirstName, setEmail, email, regUsername, setRegUsername, repeatPassword, setRepeatPassword, password, setPassword } = props;

  const validateFields = () => {
    let reg = /\d/;

      if (first_name.length === 0){
        showErrors(true);
        errorMessage('Please enter a first name');
        return false;
      } else if (last_name.length === 0) {
        showErrors(true);
        errorMessage('Please enter a last name');
        return false;
      } else if ((email.length === 0) || !email.includes('@') || !email.includes('.')) {
        showErrors(true);
        errorMessage('Please enter a valid email address');
        return false;           
      } else if (regUsername.length === 0){
        showErrors(true);
        errorMessage('Please enter a valid Playa name');
        return false;        
      } else if ((password.length < 8) || (!reg.test(password))) {
        showErrors(true);
        errorMessage('Please enter a valid password.  Your password must be at least 8 characters, and include at least one number.');
        return false;
      } else {
        showErrors(false);
        return true;    
      }            
  }

  return (
    <div className="signup-wrapper">
        <h2>Create An Account</h2>
        <span onClick={() => toggleSetStep(0)}>Already have an account? Sign-In</span>
        <div className="signup-name">
          <div className="signup-input">
            <label>First Name: *</label>
            <input 
              type="text" 
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="signup-input">
            <label>Last Name: *</label>
            <input 
              type="text" 
              value={last_name}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="signup-input">
          <label>Email: *</label>
          <input 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-input">
          <label>Playa (User) Name</label>
          <input 
            type="text" 
            value={regUsername}
            onChange={e => setRegUsername(e.target.value)} 
          />
        </div>
        <div className="signup-input">
          <label>PW</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="login-checkbox">
          <input type="checkbox" />
          <span>Opt in to share your information with Burning Man.</span>
        </div> */}
        {error && <div id="errors">{error}</div>}
        {isErrors && <div id="errors">{errMessage}</div>}
        <button onClick={() => validateFields() && toggleSetStep(2)
        }>Submit</button>
      </div>
    )
}

export default SignUp;
