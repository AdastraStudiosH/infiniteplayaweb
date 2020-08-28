import React, { useState } from 'react';

import './WelcomeScreen.scss';

const WelcomeScreen = (props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <section className="welcome">
      <span>Welcome intrepid explorer to The Infinite Playa, a recognized universe of the Burning Man Multiverse.
The Infinite Playa is an Unsupported Beta Experience. Should you choose to contribute by purchasing a ticket for this interactive experience, you will become a test pilot and pioneer, exploring and supporting the world’s first fully interactive, virtual arts festival. 
Your participation, feedback and engagement will fuel the future of this collaborative experience.
The Infinite Playa is entirely participant funded. Tickets are based on hourly usage and priced to offset per user server and streaming costs, programming, development, and incorporation of community art work. Additionally, a portion of every ticket goes to support the non-profit Burning Man Project and the future of the event in Black Rock City.
By continuing, you acknowledge your understanding that this is an Unsupported Beta Experience and, due to the nature of testing, includes features and functions in various states of performance and reliability. The experience may have technical issues and/or at times be totally unavailable. Experience features and/or functions may also be added or removed without warning. The Infinite Playa website and experience are provided “as is,” with all faults, and The Infinite Playa makes no expressed or implied representations or warranties of any kind related to this Website or the materials contained on this Website. All sales are final (no refunds).</span>
      <div className="login-checkbox">
        <input onChange={() => setChecked(!isChecked)} type="checkbox" />
        <span>Agree</span>
      </div>
      <button className={isChecked ? '' : 'non-clickable-button'} onClick={() => isChecked && props.toggleSetStep(4)}>Continue</button>
    </section>
  )
}

export default WelcomeScreen;
