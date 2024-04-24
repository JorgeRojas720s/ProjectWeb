import React from "react";
import { ContactButton } from "./ContactButton";
import { phoneIcon, emailIcon, linkedinIcon, facebookIcon } from "../images/Icons";

const buttons = [
  { href: "tel:+1234567890", alt: "Phone", icon: phoneIcon },
  { href: "https://www.linkedin.com/in/yourprofile", alt: "LinkedIn", icon:linkedinIcon },
  { href: "https://www.facebook.com/yourprofile", alt: "Facebook", icon: facebookIcon },
  { href: "mailto:your@email.com", alt: "Email", icon: emailIcon}
];

export default function ContactButtons() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end mr-2">
      {buttons.map(({icon, href, alt}, index) => (
        <ContactButton icon={icon} key={index} href={href} alt={alt} />
      ))}
    </div>
  );
}