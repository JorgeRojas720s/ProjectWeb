import "../app/css/Header.css";
import menuIcon from "../images/menu.png"
import Image from "next/image"


export default function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between z-1000">
        <a href="#" className="text-white text-2xl font-extrabold ">Logo</a>
        <nav className="navBar">
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
        <Image className="flex right-0" src={menuIcon} alt="menu"></Image>
  </div>
  );
}
