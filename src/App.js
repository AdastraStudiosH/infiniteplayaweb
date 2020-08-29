import React, { useEffect, useState } from 'react';
import Amplify from '@aws-amplify/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import FirstPage from './pages/FirstPage/FirstPage';
import FAQ from './pages/FAQ/FAQ';
import ParticipatePage from './pages/ParticipatePage/ParticipatePage';
import ParticipateForm from './pages/ParticipateForm/ParticipateForm';
import Workspace from './pages/Workspace/Workspace';
import Streamer from './pages/Streamer/Streamer';
import Unsupported from './pages/UnsupportedBrowser/Unsupported';
import ConfirmPage from './pages/ConfirmPage/ConfirmPage';
import FailedPage from './pages/FailedPage/FailedPage';
import { connect } from 'react-redux';

Amplify.configure({
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_EJ972dajD",
    userPoolWebClientId: "6b64mtqn4fjlq05coh8n4l70hj",
  },
});

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <MainPage>
            <Route exact={true} path="/" component={FirstPage} />
            <Route path="/faq" component={FAQ} />
            <Route path="/participate" component={ParticipatePage} />
            <Route path="/form" component={ParticipateForm} />
            <Route path="/workspace" component={Workspace} />
            <Route path="/streamer" component={Streamer} />
            <Route path="/unsupported" component={Unsupported} />
            <Route path="/payment_success" component={ConfirmPage} />
            <Route path="/payment_failed" component={FailedPage} />
          </MainPage>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {

}

export default connect()(App);
