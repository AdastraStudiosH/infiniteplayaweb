import { Link } from 'react-router-dom';
import './Workspace.scss';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/user/user.reducer';
import log from '../../Log';

import './Workspace.scss';

const stripePromise = loadStripe('pk_live_51HHEqjHyf8bGDaR7P9FvP0WZYtp2eHoeal1L2xl7zVBa8xdrUez5dVerblY6TDBo9KrrhB38SOWdUiYg6VDJk7FI00vifO1mIZ');

const Workspace = (props) => {
  const [isPaymentLoading, toggleLoadPayment] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState('available');  

  const fetchUserData = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/getuserdata', {
      method: 'POST',
      // headers: headers,
      body: JSON.stringify({ 'AccessToken': localStorage.token })
    }).then(res => res.json())
    .then(data => props.setUserData(data))
    .catch(err => log.error(err))
  }  
  const fetchDeploymentStatus = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    await fetch('https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/deploymentstatus')
    .then(res => res.json())
    .then(data => { 
        if (data.body){
          var status=JSON.parse(data.body);          
          if (status.status){
            setDeploymentStatus(status.status);            
          }
        }
      }
      )
    .catch(err => {      
      log.error(err);
    })
  }


  useEffect(() => {
    fetchUserData();
    fetchDeploymentStatus();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paymentFunc = async (price) => {
    const stripe = await stripePromise;

    toggleLoadPayment(true);

    try
    {

    
    const response = await fetch(
      'https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/paymentCreateCheckoutSession', 
      { 
        method: 'POST', 
        body: JSON.stringify({ 
          'AccessToken': localStorage.token, 
          'price': price 
        })
      });

      const session = await response.json();
      if (session.errorType)
        throw new Error("Failed to create Stripe session: " + session);
        
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId
      });
    
      log.info("Stripe session created successfully: " + result);
    }
    catch(err) {
      log.error(err);
    }
    finally {
      toggleLoadPayment(false);
    }
  }
  let playTimeRemaining = props.user && props.user.playerData.PlayTime > 0;    
  return (
    <section className="workspace">
      <Header />
      <div className="workspace-wrapper">
        <div className="account">
          <h2 className="workspace-title">Hi {props.user && props.user.userAttributes.nickname}, welcome to the Infinite Playa! </h2>
          <div className="account-info">
            <div>
              You currently have {props.user && `${Math.floor(props.user.playerData.PlayTime)} `} minutes of play time in the Infinite Playa.<br/><br/>
              {
                deploymentStatus==='prelaunch' && (
                  <div>We are currently in pre-launch sale of Playa game time.  To ensure the best possible experience for you while we roll out the Infinite Playa
                  we will be limiting the number of hours available for purchase. <br/><br/>
                  
                  You can purchase play time in the Infinite Playa below.  <br/>
                  Access to the Playa will be opening on Friday September 11th at 12:00 PM Pacific Time.<br/><br/>
                  We can't wait to see you!  
                  </div>                  
                )
              }{
                deploymentStatus==='available' && (
                  <div>                                        
                    You can purchase more time below. <br/>
                  </div>
                )
              }                          
            </div>
          </div>
        </div>
        {
            (deploymentStatus==='available' || deploymentStatus==='locked') && playTimeRemaining && (
               <div className="workspace-button">
                <Link to="/streamer"><button>Start playing now</button> </Link>
                <a href={props.user && props.user.playerData.AllowPCClient ? "https://drive.google.com/file/d/1TzWSWrMCF_q4R_0todXqMDUUM0ZIyVa3/view" : '#'}>
                  <button>Download Game client</button>
                </a>
                </div>
            )
        }{
            !playTimeRemaining && (
              <div className="workspace-button">
               <a href="/workspace#purchase"><button>Purchase Time to begin playing</button> </a>
               </div>
           )
        }

        <h2 className="workspace-title">Purchases</h2>
        <div className="donate">
          <p>Make an additional donation to the Burning Man Project</p>
          <div>
            <a href="https://donate.burningman.org/?utm_source=infinite-playa&utm_medium=donate&utm_campaign=multiverse" target="_blank"></a>
          </div>
        </div>

        { deploymentStatus==='locked' && (
                  <div className="locked">
                    While we work to ensure the best possible experience for you, we have temporarily stopped the purchase of game time. <br/><br/>
                    If you have already purchased game time in the Playa, feel free to use it.  We'll be re-launching purchases shortly.  Stay tuned.<br/><br/>
                  </div>
                )
    } { (deploymentStatus==='available' || deploymentStatus==='prelaunch' )&& (
            
        <div className="workspace-block">
          <h2>Pay as you go:</h2>
          <p>For the interactive gaming experience, streamed directly into your Safari or Chrome, browser purchase one of our hourly passes.*</p><br/>
          <p>Please note that the browser based experience is optimized for users in North America.</p> 
          <div id="purchase" className="purchases">
            <div className="purchase-item">
              <h3>Visitor</h3>
              <span className="purchase-amount">$20</span>
              <span>Two Hour Pass</span>
              <button onClick={() => paymentFunc('price_1HLcFAHyf8bGDaR7gEVOAEK7')}>Select</button>
            </div>
            <div className="purchase-item">
              <h3>Weekend Warrior</h3>
              <span className="purchase-amount">$40</span>
              <span>Five Hour Pass</span>
              <button onClick={() => paymentFunc('price_1HLcEeHyf8bGDaR7iRgrcipv')}>Select</button>
            </div>
            <div className="purchase-item">
              <h3>Dusty Explorer</h3>
              <span className="purchase-amount">$75</span>
              <span>Ten Hour Pass</span>
              <button onClick={() => paymentFunc('price_1HLcDtHyf8bGDaR7uBGq1sOM')}>Select</button>
            </div>
            <div className="purchase-item">
              <h3>Founder's Package*</h3>
              <span className="purchase-amount">$150</span>
              <span>24 Hour Pass</span>
              <button onClick={() => paymentFunc('price_1HLcD7Hyf8bGDaR7srl0sp9I')}>Select</button>
              <a 
                href={props.user && props.user.playerData.AllowPCClient ? "https://drive.google.com/file/d/1TzWSWrMCF_q4R_0todXqMDUUM0ZIyVa3/view" : '#'}
                className="purchase-remark"
              ><span>*includes executable file</span></a>
            </div>          
          </div>
          <div className="remark">*In game time will be clocked between login and logout. As long as you logout of the game whatever time you have remaining will be valid the next time you log in.</div> <br/>
          <div className="remark remark-second">Experience is optimized for keyboard and mouse input, touch devices experience some interactive limitations.</div>
        </div>
       )}
        <div className="workspace-block">
          <h2>Downloadable Game:</h2>
          <p className="reqs">If you have a current gaming PC (gtx 1080 or better) you can purchase our downloadable executable file for $100 for unlimited play all week long. </p>
          <div className="purchase-item">
            <h3>Downloadable Game File</h3>
            <span>Play all week!</span>
            <span>$100</span>
            <button onClick={() => paymentFunc('price_1HN6kGHyf8bGDaR7xF8kjAPE')}>Select</button>
            <a 
              className="purchase-remark" 
              href={props.user && props.user.playerData.AllowPCClient ? "https://drive.google.com/file/d/1TzWSWrMCF_q4R_0todXqMDUUM0ZIyVa3/view" : '#'}
            ><span>*includes executable file</span></a>
          </div>
        </div>
            
        <p className="desc">We want as many people as possible to experience the magic of The Infinite Playa! We have worked diligently to make it playable in web browsers and mobile devices, for those without high end computers. However, the technology that makes this possible comes with unavoidable per minute costs. For those that find the cost of the interactive experience prohibitive, please visit https://watch.infiniteplaya.com/ where you can view most of the performances, talks and art for free.</p>
      </div>
      <Footer />
      {isPaymentLoading && <div className="payment-loading">{''}</div>}
    </section>
  )
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setUserData
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
