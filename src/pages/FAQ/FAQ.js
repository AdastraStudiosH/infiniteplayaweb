import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import './FAQ.scss';

const FAQ = () => {
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
    <section className="faq">
      <Header />
        <div className="faq-wrapper">
          <div className="faq-item">
            <h3>What is The Infinite Playa?</h3>
            <span>The Infinite Playa™ (TIP) is a Recognized Universe of the Burning Man Multiverse. It is a multi-player, playable experience that puts you at the center of an infinite, explorable world of art, music, games, talks and performances. </span>
          </div>
          <div className="faq-item">
            <h3>Will i need to buy a ticket?</h3>
            <span>Our intention is to make TIP available to everyone who wants to experience it. Many parts of the experience will be free to all.</span>
            <span>We are doing our best to insure that any form of ticketing will be a nominal fee to cover our costs and to help support the non-profit Burning Man project.</span>
          </div>
          <div className="faq-item">
            <h3>What platforms will The Infinite Playa be available on?</h3>
            <span>We want everyone to experience the magic of the Playa, so TIP will be widely available on any browser or phone.</span>
            <span>We are also working on making the experience compatible on any smart TV.</span>
            <span style={{ marginTop: '19px' }}>Though this is not a VR experience, we are working on making certain areas in TIP explorable in VR.</span>
          </div>
          <div className="faq-item">
            <h3>How can i participate?</h3>
            <span>While Burning Man creates the container for Black Rock City, it is the citizens of BRC  that build it and the same is true of our container. We have built the framework for our world, a sprawling photo-real desert, festival, environment. We need you to make it come to life!</span>
            <span style={{ marginTop: '19px' }}>Artists, Camps and inspired individuals will all have the opportunity to bring their unique offerings to the Infinite Playa. These can range in scale from art pieces and installations rendered with full 3 dimensional detail, to live streamed performances added in via greenscreen, or talks, yoga classes and interactive Zoom panels.</span>
          </div>
          <div className="faq-item">
            <h3>How big can my camp be?</h3>
            <span>To create as authentic an experience as possible, we are limiting stage sizes to their relative proportions on the Playa.</span>
            <span style={{ marginTop: '19px' }}>For larger camps we are working to make multiple streams/feeds available so that participants can have multiple experience options within one venue. For example, a main stage, and also a smaller more intimate dome/tent interior experience.</span>
          </div>
          <div className="faq-item">
            <h3>What about my art car? Can you add it and can we drive it? </h3>
            <span>Yes we will have a limited number of fully driveable and programmable art cars roaming The Infinite Playa.</span>
          </div>
          <div className="faq-item">
            <h3>Will i get paid for my art?</h3>
            <span>We adhere to Burning Man's principle of decommodification, we can't pay you for your art, but we can and will credit you with links back to your website and/or social media.</span>
            <span style={{ marginTop: '19px' }}>We will be requiring a release form for all participants that clearly states that we do not own your IP, but you have granted TIP permission to use it for purposes of this digital experience.</span>
          </div>
          <div className="faq-item">
            <h3>Technical requirements for adding your camp/art car/art to The Infinite Playa:</h3>
            <span>We can accept a variety of file types (though we can't guarantee that we will be able to import your assets and place them).</span> 
            <span>Ideal file formats are as follows: </span>
            <span style={{ marginTop: '19px' }}>-  FBX and .OBJ</span>
            <span>- DCC files (Maya, Max, Sketchup etc) please send these files in their original formats</span>
            <span>- For CAD/Engineering files (Solidworks, Catia, Autocad) files should be in .STEP, .Catia, and .Iges format</span>
            <span>- Unreal assets</span>
            <span style={{ marginTop: '19px' }}>If you do not have existing 3D models of your assets, let us know and we can discuss options for getting your digital assets created.</span>
          </div>
          <div className="faq-item">
            <h3>Technical specs for adding video content to The Infinite Playa:</h3>
            <span>Please send us your video files in as close to original resolution as possible, but not larger than Prores 4444 HD.</span>
            <span style={{ marginTop: '19px' }}>Specific framing and greenscreen guidelines will be shared with those camps looking to add their performers directly onto our stages. We are also developing a toolkit to allow camps to program their stage lighting editorially.</span>
          </div>
          <div className="faq-item">
            <h3>Where do I submit my files?</h3>
            <span>For 2D art submit your files here: <a href="https://www.dropbox.com/request/QkaLFn85zoF8fHHKIvrr" target="_blanc">Art</a></span>
            <span>For Video Content Submit your files here: <a href="https://www.dropbox.com/request/JUn7HwVfKp2WOgO0WiF2" target="_blanc">Video</a></span>
          </div>
          <div className="faq-item">
            <h3>What is the deadline to submit files?</h3>
            <span>We are no longer accepting 3D models at this time. Video content and 2D art can be submitted thru the event.</span>
          </div>
          <div className="faq-item">
            <h3>What if i need help?</h3>
            <span>Due to the size constraints of our team, we are asking participants to practice the Burning Man principle of radical self reliance. We do not have a dedicated IT team, so please read the FAQs, do your best to follow our instructions and if all else fails submit a help request and we will do our best to get back to you in a timely manner.</span>
          </div>
          <div className="faq-item">
            <h3>Can I join the team?</h3>
            <span>We need programmers, 3D artists and modelers, people with Unreal Engine experience, social media and web experts, and folks to help with admin.</span>
            <span style={{ marginTop: '19px' }}>If this sounds like you, we'd love to talk with you. Please submit your information via the "Participate" button at the bottom of this form.</span>
          </div>
          <div className="faq-item">
            <h3>Why are you doing this?</h3>
            <span>The Infinite Playa is a huge endeavor that has taken countless hours to create, but we couldn't bear the thought of a world without Burning Man, especially in these challenging times.</span>
            <span style={{ marginTop: '19px' }}>Our intention is to keep the community connected and give them an opportunity to experience some of the magic they feel when they go to the actual Playa in our digital one.</span>
          </div>
        </div>
        <div className="faq-participate"><Link to="/participate">Participate</Link></div>
      <Footer />
    </section>
  )
}

export default FAQ;
