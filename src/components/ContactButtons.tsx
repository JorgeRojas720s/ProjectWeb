import React from "react";
import { ContactButton } from "./ContactButton";

const buttons = [
  { href: "tel:+1234567890", alt: "Phone" },
  { href: "https://www.linkedin.com/in/yourprofile", alt: "LinkedIn" },
  { href: "https://www.facebook.com/yourprofile", alt: "Facebook" },
  { href: "mailto:your@email.com", alt: "Email" }
];

export default function ContactButtons() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end mr-2">
      {buttons.map((button, index) => (
        <ContactButton key={index} href={button.href} alt={button.alt} />
      ))}
    </div>
  );
}