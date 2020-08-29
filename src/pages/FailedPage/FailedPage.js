import React from 'react';

import './FailedPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const FailedPage = () => {
    return (
        <div className="confirm-page">
            <Header />
            <section>
                Payment Failed
            </section>
            <Footer />
        </div>
    )
}

export default FailedPage;
