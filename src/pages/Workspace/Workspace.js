import React from 'react';

import './Workspace.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Workspace = () => {
  return (
    <section className="workspace">
      <Header />
      <div className="workspace-wrapper">
        <div className="account">
          <h2 className="workspace-title">Account Info</h2>
          <div className="account-info">
            <div>
              <span>First Name</span>
              <span></span>
            </div>
            <div>
              <span>Last Name</span>
              <span></span>
            </div>
            <div>
              <span>Email</span>
              <span></span>
            </div>
            <div>
              <span>Username (Playa Name)</span>
              <span></span>
            </div>
            <div>
              <span>Time</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="workspace-button">
          <button>Start remote game session</button>
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
            <h3>Visitor</h3>
            <span>Two Hour Pass - $20</span>
            <button>Buy</button>
          </div>
          <div>
            <h3>Weekend Warrior</h3>
            <span>Five Hour Pass - $40</span>
            <button>Buy</button>
          </div>
          <div>
            <h3>Dusty Explorer</h3>
            <span>Ten Hour Pass - $75</span>
            <button>Buy</button>
          </div>
          <div>
            <h3>Founder's Package</h3>
            <span>24 Hour  Pass - $150 *includes executable</span>
            <button>Buy</button>
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
    </section>
  )
}

export default Workspace;
