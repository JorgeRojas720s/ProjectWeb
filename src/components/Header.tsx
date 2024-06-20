"use client";
import { useState } from "react";
import menuIcon from "../images/menu.png";
import { logo } from "../images/Icons";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const data = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/services" },
    { name: "Productos", href: "/products" },
    { name: "Equipo", href: "/team" },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-end z-1000">

      <nav className="hidden sm:block">
        <ul className="flex justify-end space-x-4 mr-10 pt-3">
          {data.map(({ name, href }, index) => (
            <li key={index}>
              <a href={href} className="text-white hover:hover-li-tag px-3">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative sm:hidden">
        <Image
          src={menuIcon}
          alt="menu"
          className="w-9 mt-3 mr-3 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && (
          <div className="absolute right-0 mt-12 bg-gray-800 text-white rounded-lg shadow-lg p-4">
            <ul className="flex flex-col space-y-2">
              {data.map(({ name, href }, index) => (
                <li key={index}>
                  <a
                    href={href}
                    className="block px-3 py-2 hover:bg-gray-700 rounded"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
