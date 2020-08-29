import React from 'react';

import './ConfirmPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ConfirmPage = () => {
    return (
        <div className="confirm-page">
            <Header />
            <section>
                Payment Succesfull
            </section>
            <Footer />
        </div>
    )
}

export default ConfirmPage;
