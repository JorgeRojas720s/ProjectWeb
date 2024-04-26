import React from "react";
import { ContactButton } from "./ContactButton";
import {
  phoneIcon,
  emailIcon,
  linkedinIcon,
  facebookIcon,
} from "../images/Icons";

const buttons = [
  { href: "tel:+1234567890",
   alt: "Phone", 
   icon: phoneIcon,
   text: "2770 4570" 
  },
  {
    href: "https://www.linkedin.com/in/yourprofile",
    alt: "LinkedIn",
    icon: linkedinIcon,
    text: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/yourprofile",
    alt: "Facebook",
    icon: facebookIcon,
    text: "Facebook",
  },
  { href: "mailto:your@email.com",
   alt: "Email", 
   icon: emailIcon,
   text: "fabianMamador@gmail.com"

   },
];

export default function ContactButtons() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end mr-2">
      {buttons.map(({text, icon, href, alt }, index) => (
        <ContactButton text={text} icon={icon} key={index} href={href} alt={alt} />
      ))}
    </div>
  );
}
