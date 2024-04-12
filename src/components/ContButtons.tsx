import React from 'react';
import phoneIcon from "../images/phone.png";
import emailIcon from "../images/email.png";
import linkedinIcon from "../images/linkedin.png";
import facebookIcon from "../images/facebook.png";
import Image from 'next/image';

export default function ContButtons() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end mr-2">
      <a
        href="tel:+1234567890"
        className="bg-purple-600 text-white p-3 rounded-full inline-flex items-center justify-center mb-4 transition-transform transform-gpu hover:translate-x-[-10px]"
      >
        <Image src={phoneIcon} alt="Phone" width={45} height={45} />
      </a>
      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 text-white p-3 rounded-full inline-flex items-center justify-center mb-4 transition-transform transform-gpu hover:translate-x-[-10px]"
      >
        <Image src={linkedinIcon} alt="LinkedIn" width={45} height={45} />
      </a>
      <a
        href="https://www.facebook.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 text-white p-3 rounded-full inline-flex items-center justify-center mb-4 transition-transform transform-gpu hover:translate-x-[-10px]"
      >
        <Image src={facebookIcon} alt="Facebook" width={45} height={45} />
      </a>
      <a
        href="mailto:your@email.com"
        className="bg-purple-600 text-white p-3 rounded-full inline-flex items-center justify-center mb-4 transition-transform transform-gpu hover:translate-x-[-10px]"
      >
        <Image src={emailIcon} alt="Email" width={45} height={45} />
      </a>
    </div>
  );
}