import { Link } from 'react-router-dom';
import './Workspace.scss';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { loadStripe } from '@stripe/stripe-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUserData } from '../../redux/user/user.reducer';

import './Workspace.scss';

const stripePromise = loadStripe('pk_live_51HHEqjHyf8bGDaR7P9FvP0WZYtp2eHoeal1L2xl7zVBa8xdrUez5dVerblY6TDBo9KrrhB38SOWdUiYg6VDJk7FI00vifO1mIZ');

const Workspace = (props) => {
  const [isPaymentLoading, toggleLoadPayment] = useState(false);

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
    .catch(err => console.log(err))
  }


  useEffect(() => {
    fetchUserData();
  }, [])

  const paymentFunc = async (price) => {
    const stripe = await stripePromise;

    toggleLoadPayment(true);

    const response = await fetch(
      'https://qamxec6q0b.execute-api.eu-central-1.amazonaws.com/prod/paymentCreateCheckoutSession', 
      { 
        method: 'POST', 
        body: JSON.stringify({ 
          'AccessToken': localStorage.token, 
          'price': price 
        })
      }).catch(() => toggleLoadPayment(false));

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId
    })
  }

  return (
    <section className="workspace">
      <Header />
      <div className="workspace-wrapper">
        <div className="account">
          <h2 className="workspace-title">Account Info</h2>
          <div className="account-info">
            <div>
              <span>First Name</span>
              <span>{props.user && props.user.userAttributes.name}</span>
            </div>
            <div>
              <span>Last Name</span>
              <span>{props.user && props.user.userAttributes.family_name}</span>
            </div>
            <div>
              <span>Email</span>
              <span>{props.user && props.user.userAttributes.email}</span>
            </div>
            <div>
              <span>Username (Playa Name)</span>
              <span>{props.user && props.user.userAttributes.nickname}</span>
            </div>
            <div>
              <span>Time</span>
              <span>{props.user && props.user.playerData.PlayTime}</span>
            </div>
          </div>
        </div>
        <div className="workspace-button">
          <Link to="/streamer"><button>Start a streaming experience</button> </Link>
          <button>Download Game client</button>
        </div>
        <h2 className="workspace-title">Purchases</h2>
        <div className="workspace-block">
          <h2>Downloadable Game:</h2>
          <p>If you have a current gaming PC (gtx 1080 or better) you can purchase our downloadable executable file for $100 for unlimited play all week long. </p>
        </div>
        <div className="workspace-block">
          <h2>Pay as you go:</h2>
          <p>For the full interactive gaming experience streamed directly into your Safari or Chrome browser purchase one of our hourly passes.*</p>
        </div>
        {/* <div className="workspace-prices">
          <div>
            <span>Visitor</span>
            <span>Two Hour Pass - $20	</span>
          </div>
          <div>
            <span>Weekend Warrior	</span>
            <span>Five Hour Pass - $40	</span>
          </div>
          <div>
            <span>Dusty Explorer	</span>
            <span>Ten Hour Pass - $75	</span>
          </div>
          <div>
            <span>Founder's Package</span>
            <span>24 Hour  Pass - $150 *includes executable</span>
          </div>
        </div> */}
        <p className="remark">*In game time will be clocked between login and logout. As long as you logout of the game whatever time you have remaining will be valid the next time you log in. Experience is optimized for keyboard and mouse input, touch devices experience some interactive limitations.</p>
        <div className="purchases">
          <div>
            <h3>Free (Development, $0.5)</h3>
            <span>Free</span>
            <button onClick={() => paymentFunc('price_1HLgFRHyf8bGDaR74oeBc1m2')}>Buy</button>
          </div>
          <div>
            <h3>Visitor</h3>
            <span>Two Hour Pass - $20</span>
            <button onClick={() => paymentFunc('price_1HLcFAHyf8bGDaR7gEVOAEK7')}>Buy</button>
          </div>
          <div>
            <h3>Weekend Warrior</h3>
            <span>Five Hour Pass - $40</span>
            <button onClick={() => paymentFunc('price_1HLcEeHyf8bGDaR7iRgrcipv')}>Buy</button>
          </div>
          <div>
            <h3>Dusty Explorer</h3>
            <span>Ten Hour Pass - $75</span>
            <button onClick={() => paymentFunc('price_1HLcDtHyf8bGDaR7uBGq1sOM')}>Buy</button>
          </div>
          <div>
            <h3>Founder's Package</h3>
            <span>24 Hour  Pass - $150 *includes executable</span>
            <button onClick={() => paymentFunc('price_1HLcD7Hyf8bGDaR7srl0sp9I')}>Buy</button>
          </div>
        </div>
        <div className="donate">
          <h3>Make an additional donation to the Burning Man Project</h3>
          <div>
            <a href="https://donate.burningman.org/?utm_source=infinite-playa&utm_medium=donate&utm_campaign=multiverse" target="_blank"></a>
          </div>
          <p>We want as many people as possible to experience the magic of The Infinite Playa! We have worked diligently to make it playable in web browsers and mobile devices, for those without high end computers. However, the technology that makes this possible comes with unavoidable per minute costs. For those that find the cost of the interactive experience prohibitive, please visit https://watch.infiniteplaya.com/ where you can view most of the performances, talks and art for free.</p>
        </div>
      </div>
      <Footer />
      {isPaymentLoading && <div className="payment-loading">Loading</div>}
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
