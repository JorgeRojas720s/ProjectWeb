import React from 'react'

const HeaderWithOutIcon = () => {
    const data = [
        { name: "Inicio", href: "/" },
        { name: "Servicios", href: "/services" },
        { name: "Productos", href: "/products" },
        { name: "Contacto", href: "/contact" },
      ];
      return(
        <div className="absolute top-0 left-0 right-0 flex items-center justify-end z-1000">
        <nav className="hidden sm:block">
          <ul className="flex space-x-4 mr-10 pt-3">
            <li>
             {data.map(({name, href}) => (<a href={href} className="text-white hover:hover-li-tag px-3">{name}</a>))}
            </li>
          </ul>
        </nav>
      </div>
      )
}

export default HeaderWithOutIcon