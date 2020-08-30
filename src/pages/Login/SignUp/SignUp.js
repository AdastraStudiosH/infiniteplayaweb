import React, { useState } from 'react';

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
      } else if (password !== repeatPassword) {
        showErrors(true);
        errorMessage('Please ensure that your password is the same in both password fields.');
        return false;
      } else {
        showErrors(false);
        return true;    
      }            
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
        {isErrors && <div className="errors">{errMessage}</div>}
        <button onClick={() => {
          if (validateFields()){
            toggleSetStep(2);
          } else{
            signUp();
          }          
        }}>Sign Up</button>
      </React.Fragment>
    )
}

export default SignUp;
