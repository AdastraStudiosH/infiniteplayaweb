import React from 'react';

import './FailedPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const FailedPage = () => {
    return (
        <div className="failedPage confirm-page">
            <Header />
            <section>
                <p>
                Your payment was cancelled or not completedly succcesfully. <a href="/workspace">Please try again.</a>
                </p>
            </section>
            <Footer />
        </div>
    )
}

export default FailedPage;
