import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import first from '../../images/first_back.png';
import hands from '../../images/hands.png';
import VideoComp from '../../components/VideoComp/VideoComp';
import Description from '../../components/Description/Description';

import './FirstPage.scss';
import Gallery from '../../components/Gallery/Gallery';
import BecomeInfinite from '../../components/BecomeInfinite/BecomeInfinite';

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

const FirstPage = () => {
  const [intervalId, setIntervalId] = useState(0);

  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 500);
  }
  
  const scrollToTop = () => {
    let intervalId = setInterval(scrollStep(), 500);
    setIntervalId({intervalId});
  }

  useEffect(() => {
    scrollToTop()
  }, []);
  
  return (
    <main>
      <section className="background">
        <Header />
        <Description />
        {/* <section className="main-buttons">
          <button><a href="https://watch.infiniteplaya.com/" target="_blanc">Watch The Infinity</a></button>
          <button>Experience The Infinity</button>
          <button>Infinite extras in VR</button>
        </section> */}
      </section>
      <section className="background-second">
        <VideoComp />
        <div className="fromVideoToGallery"></div>
        <Gallery />
        <BecomeInfinite />
        <Footer />
      </section>
    </main>
  )
}

export default FirstPage;
