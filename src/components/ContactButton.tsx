import React from "react";
import Image, { StaticImageData } from "next/image";
// Componente para un solo botón
export function ContactButton({
  href,
  alt,
  icon,
  text,
  
}: {
  href: string;
  alt: string;
  icon: StaticImageData;
  text: string
}) {
  function handleHover() {
    return <div className="translate-x-10"></div>;
  }
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="lg:block hidden my-1 group relative flex justify-center items-center text-white text-sm font-bold">
          <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-purple-600 to-purple-600 p-3 rounded-full cursor-pointer duration-300">
          <Image src={icon} alt={alt} width={45} height={45} />
            <span className="text-[0px] group-hover:text-sm duration-300">
              {text}
            </span>
          </div>
        </div>
      </a>
    </>
  );
}
