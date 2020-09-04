import React, { useState } from 'react';

import './SignUp.scss';

const SignUp = (props) => {
  const [isErrors, showErrors] = useState(false);
  const [errMessage, errorMessage] = useState(false);
  const [doesEmailExist, setDoesEmailExist] = useState(false);  
  const [doesPlayaNameExist, setDoesPlayaNameExist] = useState(false);  

  const { signUp, error, last_name, setLastName, toggleSetStep, first_name, setFirstName, setEmail, email, regUsername, setRegUsername, repeatPassword, setRepeatPassword, password, setPassword } = props;

  const checkEmail = async (email) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/checkemail?e='+email)
    .then(res => res.json())
    .then(data => { 
        if (data){          
            setDoesEmailExist(data);          
        }
      }
      )
    .catch(err => {      
      console.error(err);
    })
  }

  
  const checkPlayaName = async (name) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/checkplayaname?u='+name)
    .then(res => res.json())
    .then(data => { 
        if (data){          
            setDoesPlayaNameExist(data);          
        }
      }
      )
    .catch(err => {      
      console.error(err);
    })
  }

  const validateFields = () => {
    checkEmail(email).then(checkPlayaName(regUsername)).then(e => {
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
      } else if (doesEmailExist){
        showErrors(true);
        errorMessage('The email address you added has already been registered');
        return false;
      } else if (doesPlayaNameExist){
        showErrors(true);
        errorMessage('The Playa name you chose has already been taken');
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
        errorMessage(null);
        showErrors(false);
        toggleSetStep(2)        
        return true;    
      } 
    })           
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
        <button onClick={() => validateFields() }>Submit</button>
      </div>
    )
}

export default SignUp;
