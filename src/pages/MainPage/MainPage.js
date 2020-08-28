import React from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const MainPage = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default MainPage;
