import React from "react";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageIcon: StaticImageData;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageIcon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-xl font-bold text-purple-600">${price}</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <Image
          src={imageIcon}
          alt="Producto"
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductCard;
