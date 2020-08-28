import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import './ParticipatePage.scss';

const ParticipatePage = () => {
  const [intervalId, setIntervalId] = useState(0);

  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 100);
  }
  
  const scrollToTop = () => {
    let intervalId = setInterval(scrollStep(), 500);
    setIntervalId({intervalId});
  }

  useEffect(() => {
    scrollToTop()
  }, [window.pageYOffset]);

  return (
    <section className="participate-section">
      <Header />
      <div className="participate-page">
        <h1>How Would You Like to Participate?</h1>
        <Link to="/form">
          <button className="participate-camps">Camps/Art Cars</button>
        </Link>
        <Link to="/form">
          <button className="participate-performers">Performers</button>
        </Link>
        <Link to="/form">
          <button className="participate-artists">Artists</button>
        </Link>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSc7TpkP9y7Oy5vUnfjTEBb5ecmTIOACrf7ySaL79CYnSU1F1g/viewform?usp=sf_link" target="_blanc">
          <button className="participate-volunteers">Volunteers</button>
        </a>
      </div>
      <Footer />
    </section>
  )
}

export default ParticipatePage;
