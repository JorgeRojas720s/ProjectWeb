import React from "react";
import Image, { StaticImageData } from "next/image";
// Componente para un solo botón
export function ContactButton({
  href,
  alt,
  icon,
}: {
  href: string;
  alt: string;
  icon: StaticImageData;
}) {
  // let icon;
  // // Determinar qué icono utilizar según la alt proporcionada
  // switch (alt) {
  //   case 'Phone':
  //     icon = phoneIcon;
  //     break;
  //   case 'LinkedIn':
  //     icon = linkedinIcon;
  //     break;
  //   case 'Facebook':
  //     icon = facebookIcon;
  //     break;
  //   case 'Email':
  //     icon = emailIcon;
  //     break;
  //   default:
  //     icon = null;
  // }
function handleHover(){
  return(
    <div className="translate-x-10">
      
    </div>
  )
}
  return (
    <>
      <a
        href={href}
        className={`bg-purple-600 text-white p-3 rounded-full inline-flex items-center justify-center mb-4 transition-transform transform-gpu hover:${()=>handleHover}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Utilizar el icono correspondiente */}
        <Image src={icon} alt={alt} width={45} height={45} />
      </a>
    </>
  );
}
