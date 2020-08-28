import React, { useState, useEffect } from 'react';

import './ParticipateForm.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ParticipateForm = () => {
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
        <section className="participate-form">
            <Header />
            <div className="participate-wrapper">
                <div className="participate-data">
                    <div className="form-grid">
                        <div>
                            <label>What's your first name?</label>
                            <input placeholder="First Name" type="text" />
                        </div>
                        <div>
                            <label>What's your last name?</label>
                            <input placeholder="Last Name" type="text" />
                        </div>
                        <div>
                            <label>What's your email address?</label>
                            <input placeholder="Email" type="email" />
                        </div>
                        <div>
                            <label>What's your phone number?</label>
                            <input placeholder="Phone" type="phone" />
                        </div>
                    </div>
                    <button>Next</button>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default ParticipateForm;
