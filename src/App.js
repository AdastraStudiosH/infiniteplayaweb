import React, { useEffect } from 'react';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import './App.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import FirstPage from './pages/FirstPage/FirstPage';
import FAQ from './pages/FAQ/FAQ';
import ParticipatePage from './pages/ParticipatePage/ParticipatePage';
import ParticipateForm from './pages/ParticipateForm/ParticipateForm';
import Workspace from './pages/Workspace/Workspace';
import Streamer from './pages/Streamer/Streamer';
import Unsupported from './pages/UnsupportedBrowser/Unsupported';
import ConfirmPage from './pages/ConfirmPage/ConfirmPage';
import FailedPage from './pages/FailedPage/FailedPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { connect } from 'react-redux';
import { setUserData } from './redux/user/user.reducer';
import { bindActionCreators } from 'redux';
import log from './Log';

import './App.scss';

Amplify.configure({
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_EJ972dajD",
    userPoolWebClientId: "6b64mtqn4fjlq05coh8n4l70hj",
    oauth: {
      domain: 'infintyplaya.auth.eu-central-1.amazoncognito.com',
      redirectSignIn: window.location.origin,
      redirectSignOut: window.location.origin,
      responseType: 'code'
    }
  },
  API: {
    endpoints: [
      {
        name: 'PureWebCredentialsAPI',
        endpoint: `https://jb30y4s0cf.execute-api.eu-central-1.amazonaws.com/development`,
        custom_header: async () => ({
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        }),
      },
    ],
  },
});

const App = (props) => {

  const fetchUserData = async () => {

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/getuserdata', {
      method: 'POST',
      body: JSON.stringify({ 'AccessToken': localStorage.token })
    }).then(res => res.json())
    .then(data => props.setUserData(data))
    .catch(err => log.error(err))
  }


  useEffect(() => {
    fetchUserData();
  }, [JSON.stringify(props.user), localStorage.token])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={FirstPage} />
          {localStorage.token !== undefined && localStorage.token !== 'undefined' ? (
            <React.Fragment>
              <Route path="/faq" component={FAQ} />
              <Route path="/participate" component={ParticipatePage} />
              <Route path="/form" component={ParticipateForm} />
              <Route path="/workspace" component={Workspace} />
              <Route path="/error" component={ErrorPage} />
              <Route path="/streamer" component={Streamer} />
              <Route path="/unsupported" component={Unsupported} />
              <Route path="/payment_success" component={ConfirmPage} />
              <Route path="/payment_failed" component={FailedPage} />
            </React.Fragment>
          ) : <Redirect to="/" />}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUserData
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
