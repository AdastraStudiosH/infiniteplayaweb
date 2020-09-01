import React, { useState } from 'react';
import next from '../../../images/next.svg';

import './TermsMain.scss';

const TermsMain = (props) => {
  const [isChecked, setChecked] = useState(false);

  if (props.error) props.toggleSetStep(1);

  return (
    <div className="terms-main">
      <div className="inner-content">
        <h2>THE INFINITE PLAYA CODE OF CONDUCT</h2>
        <p>We believe in diversity, inclusion and accountability and we are excited to welcome everyone to The Infinite Playa (TIP).</p>
        <p>The Infinite Playa has and maintains the right to restrict access to TIP of any individual or entity at any time in The Infinite Playa's sole discretion.</p>
        <p>To ensure that all participants feel safe, respected, and valued, we require that the citizens of our Playa to treat each other with respect, consideration, and abide by our code of conduct.</p>
        <p>The following types of behavior are unacceptable on TIP and will be grounds for immediate removal from the experience without remuneration.</p>
        <h3>Prohibited Online Behaviors</h3>
        <p><span>Consent violations.</span> Any content/interactions/expressions that is of a sexual, violent, graphic, and/or racist nature is considered a violation of consent. Content, interactions or expressions that may violate consent can be in the form of, but are not limited to: video, image, audio, chat, conduct, gesture, symbol, and/or discussion. Consent violations also include any depictions, incitement, or conduct involving non-consensual sexual acts, as well as doxxing, blackmail, and re-sharing of The Infinite Playa content (all of which are strictly prohibited). Any of the aforementioned behavior that occurs without the express consent of the involved participants and/or The Infinite Playa will be a violation (see Media Policy, below). </p>
        <p><span>Bullying.</span>  Bullying is defined as any content, interactions, expressions that intimidates, abuses, menaces, or threatens any participants and/or is intended to exclude, silence, shame, or degrade a participant (or group) and/or incites others to do so.</p>
        <p><span>Stalking/Harassment.</span> If someone asks you to leave them alone or stop communicating with them, continued engagement with them, including following them, is deemed stalking and, or harassment. Any content, interactions, or expressions consisting of verbal assaults, threats of violence or harm, degrading or shaming speech, humiliation, and/or repeated unwanted contact are considered stalking and/or harassment.</p>
        <p><span>Hate Speech.</span>  Hate speech is defined as any content, interactions, or expressions that consist of attacks and, or incitement of attacks against an individual or group of people based on race, ethnicity, national origin, gender, gender expression, religion, sexual orientation, immigration status, disability, health status, and/or any identifying characteristic, and is considered a violation of our code of conduct. Additionally, hate speech includes slurs and the incitement of hatred or violence against the aforementioned groups. Hate speech also includes, but is not limited to, praise and glorification of terrorism, organized crime, hate groups, and/or dangerous individuals or groups. </p>
        <p className="note"><span>NOTE:</span>  If you want to discuss hate speech for educational, historical, satirical, or artistic purpose, or manner with the spirit of challenging it or raising awareness, you must clearly declare your intention surrounding that content, speech or expression PRIOR to starting or engaging in it.</p>
        <p><span>Deliberate Derailment of an Online Event or Conversation.</span>  Any content that is unwelcome and intentionally controversial, contrary, repetitively off-topic, deliberately instigates anger or unwanted arguments, and/or any other content or conduct with the purpose of derailment or interruption of any online event, stream, or conversation, is a violation of our code of conduct.</p>
        <p><span>Endangering Self or Others.</span>  Behavior that endangers one’s self or others includes, but is not limited to: inciting, glorifying, instructing, and/or teaching self-harm or harm to others in any way. </p>
        <p><span>Commodification.</span> We believe in the principle of de-commodification and The Infinite Playa is intended to be a promotion-free place. Any commercial sponsorships, transactions, and/or advertising are not permitted.</p>
        <p><span>The Infinite Playa Media Policy.</span> Due to the nature of the internet and the platforms involved, privacy cannot be guaranteed for participants throughout The Infinite Playa experience.  However, as TIP is a consent-oriented community, participants are required to obtain consent from all the involved parties before re-sharing any aspect of the experience or any event.</p>
        <h3>TIP Adult Content Policy</h3>
        <p>Adult content (“18+”) is defined as any explicit sexual content and/or nudity for erotic purposes. All participants agree to:</p>
        <h3>Self Monitor: </h3>
        <ul>
          <li>
            <p><span>Minors in your Home.</span> Just like at any physical event, minors are the responsibility of their guardians at all times. All participants with minors in their household are expected to monitor their minors while they are participating in TIP to ensure that they are not accessing or showing adult content.</p>
          </li>
          <li>
            <p><span>Alternate Platforms.</span> 18+ content may occur in participant linked platforms where minors are not systemically blocked, such as Zoom, Facebook Live, or Twitch.  All participants are required to uphold the Terms of Service for those platforms as well as monitor their homes and streams to ensure minors do not access 18+ content.</p>
          </li>
        </ul>
        <p><span>Repercussions.</span>  Participants in violation can be removed from TIP, depending on the severity of the transgression. Repercussions of the violation will be strictly at the discretion of The Infinite Playa. Transgressions that violate federal, state, or local laws will be escalated to the appropriate authorities. </p>
        <h3>Agreement to Follow Code of Conduct:</h3>
        <p>I have read the foregoing, understand it, and agree to abide and uphold the above Code of Conduct and Policies during my participation in The Infinite Playa.</p>
      </div>
      <div className="registration-button-block">
        <div className="login-checkbox">
          <input onChange={() => setChecked(!isChecked)} type="checkbox" />
          <span> I Agree to The Terms</span>
        </div>
        {props.error !== undefined && <div className="errors"><span>{props.error}</span></div>}
        <button className={isChecked ? '' : 'non-clickable-button'} onClick={() => isChecked && props.signUp()}>Confirm <img src={next} alt="next" /></button>
      </div>
      {/* <div className="login-checkbox">
        <input onChange={() => setChecked(!isChecked)} type="checkbox" />
        <span>Agree</span>
      </div>
      <button className={isChecked ? '' : 'non-clickable-button'} onClick={() => isChecked && props.signUp()}>Confirm</button> */}
    </div>
  )
}

export default TermsMain;
