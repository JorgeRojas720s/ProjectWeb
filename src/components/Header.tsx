import menuIcon from "../images/menu.png";
import Image from "next/image";

export default function Header() {
  const data = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/services" },
    { name: "Productos", href: "/products" },
    { name: "Equipo", href: "/team" },
  ];
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-end z-1000">
      <a
        href="/"
        className="absolute text-white text-2xl font-extrabold xl:left-52 xl:top-56 hidden sm:block md:left-24 md:top-52   "
      >
        Imagen Logo
      </a>
      <nav className="hidden sm:block">
        <ul className="flex justify-end space-x-4 mr-10 pt-3">
          <li>
            {data.map(({ name, href }) => (
              <a href={href} className="text-white hover:hover-li-tag px-3">
                {name}
              </a>
            ))}
          </li>
        </ul>
      </nav>
      <Image
        className="flex right-0 sm:hidden w-9 mt-3 mr-3"
        src={menuIcon}
        alt="menu"
      ></Image>
    </div>
  );
}
