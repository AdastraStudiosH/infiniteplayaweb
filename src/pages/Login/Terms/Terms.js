import React from 'react';

import './Terms.scss';

const Terms = (props) => {
  return (
    <div className="terms">
      <h2>TERMS & CONDITIONS FOR BETA SOFTWARE</h2>
      <p>This page (together with the documents referred to herein) contain the terms and conditions of use for  “The Infinite Playa Beta Software” which must be accepted before use or installation of any of “The Infinite Playa Beta Software”.   Please read these terms and conditions carefully before using or installing any software from this website.   By proceeding, and by using or installing any software from this website, you agree to be bound by these terms and conditions.   These terms and conditions constitute a legal and enforceable contract between you and The Infinite Playa LLC (“The Infinite Playa“). If you do not agree to these terms and conditions, abandon the registration process now and do not use or install “The Infinite Playa Beta Software.”</p>
      <h3>1. Beta User Conditions</h3>
      <p> 1.1 	Your use of the The Infinite Playa Beta software and experience is governed by these 
        terms and conditions (“Beta User Conditions”) which you should read carefully before using or installing The Infinite Playa Beta software and experience. These Beta User Conditions represent a binding contract between The Infinite Playa and you. If you do not agree with these “Beta User Conditions”, do not install or use The Infinite Playa Beta software and experience.
      </p>
      <p>1.2 	The Infinite Playa may update or amend these “Beta User Conditions” at any time. You   
        will be provided notice of any updates or amendments.
      </p>
      <p>1.3 	These “Beta User Conditions” apply to you regardless of how you have accessed The 
        Infinite Playa Beta software and experience and regardless of the territory in which you live or conduct business.
      </p>
      <h3>2. The Infinite Playa Beta Software; No Warranty And No Liability</h3>
      <p>2.1 	The Infinite Playa Beta Software is provided to you "as is" without warranty of any kind, 
        either expressed or implied. We hereby advise you and expressly represent that The Infinite Playa Beta Software is not a final product and, as such, may contain various errors and/or defects, and may be unstable.
      </p>
      <p>2.2 	To the maximum extent permitted by applicable law, The Infinite Playa will not be liable 
        to you or anyone else for any loss, expense, damages, or injury of any kind arising out of 
        the use and/or inability to use The Infinite Playa Beta Software.
      </p>
      <h3>3. No Technical Support</h3>
      <p>The Infinite Playa will not provide any technical support, maintenance or any other services for The Infinite Playa website and/or experience.</p>
      <h3>4. External Content</h3>
      <p>From time to time, The Infinite Playa website may include links to other websites. These links are provided for your convenience and to provide further information. All provided external links are available to use at your discretion, and do not constitute or represent any endorsement by The Infinite Playa of the content of the website(s). The Infinite Playa has no responsibility for the content of the linked website(s). Any products, services, or information available through this website that you explore will be at your own risk.</p>
      <h3>5. Reproduction</h3>
      <p>The Infinite Playa website contains material which is owned by and/or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Any use or reproduction other than as authorized by The Infinite Playa in writing is strictly prohibited.</p>
      <h3>6. Privacy Policy</h3>
      <p>The Infinite Playa recognizes the importance of maintaining the privacy of personal data which it collects and processes.  The following outlines The Infinite Playa's Privacy Policy:</p>
      <p>The information we collect may include your personal data, such as your name, contact information, IP addresses, product and service selections and other data that may identify you. We may collect personal data about you at several different points, including but not limited to when we correspond with you, when you visit our website or use the software,  when you register as a user, and when you provide content. Any content you provide will be considered “public” and is not subject to privacy protections. Additionally, we may collect certain information automatically when you use the software and visit the site. This information may include your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, details about your browser, operating system or device, location information, Internet service provider, pages that you visit, information about the links you click, and other information about how you use The Infinite Playa software and website. Information we collect may be associated with accounts and other devices. Our Services, such as those related to location data management, may collect precise geo-location information in accordance with applicable law.</p>
      <p>Any information that The Infinite Playa collects will be used only for and by The Infinite Playa, and will not be shared, or sold, to anyone. The Infinite Playa will comply with all applicable laws and regulations respecting data collected, and to protect your privacy.  As noted elsewhere in these Terms and Conditions, The Infinite Playa is not responsible for any websites that you may use or visit by clicking a link on our website and/or from within the experience, as these are links to third-parties websites not controlled or created by The Infinite Playa.</p>
      <p>The Infinite Playa may use the information that we collect about you to allow you to register, provide you with access, communicate with you, verify or maintain the quality or safety of a service, process your financial information and other payment methods for products or services purchased, manage our business,  and analyze and improve our services pursuant to our legitimate interest (including protecting against malicious, deceptive, fraudulent or illegal activity, performing research and analysis, improving, upgrading or enhancing our services, verifying your identity and preventing fraud, and enforcing our terms and conditions.</p>
      <h3>7. Governing Law and Jurisdiction</h3>
      <p>These Beta User Conditions and the relationship between the parties to this agreement shall be governed by the laws of the State of California and the United States, without regard to conflict of laws principles.  Any action arising from these User Conditions can be brought and maintained only in the federal or state courts located in Los Angeles County, California.</p>
      <h3>8. Entire Agreement</h3>
      <p>These Beta User Conditions (together with the documents to which they refer) contain the entire agreement between you and The Infinite Playa relating to the use of The Infinite Playa Beta software and experience. You acknowledge that you have not relied on any representation, warranty, or other assurance except those set forth herein and on the Beta Portal.</p>
      <h3>9. DMCA Notice and Takedown Policy</h3>
      <p>The Infinite Playa  maintains the following DMCA Notice and Takedown Policy. The Infinite Playa respects the intellectual property rights of third parties, and expects others to do the same. As part of our effort to recognize the copyrights of third parties, The Infinite Playa complies with the U.S. Digital Millennium Copyright Act ("DMCA") and is therefore protected by the limitations on liability recognized by 17 U.S.C. § 512; commonly known as the "safe harbor" provisions of the DMCA. If you believe that your work has been copied, reproduced, altered, or published in a way that constitutes copyright infringement under federal law, or your copyrights have been otherwise violated, please click the <span>“DMCA Notice and Takedown”</span> link and fill out all the required information. This will notify our Designated Agent. The Infinite Playa will then proceed in a timely manner to notify the Contributor of the alleged infringement, and take steps to disable or remove the material in question.</p>
      <p className="accept">By clicking the “accept” button, you acknowledge that: (1) you are 13 years of age or older, and if you are between the ages of 13 and 18, you have obtained consent from your parent or guardian; and (2) you have read, understood, and accepted the terms and conditions of this agreement.</p>
      <button onClick={() => props.toggleSetStep(6)}>Accept</button>
    </div>
  )
}

export default Terms;
