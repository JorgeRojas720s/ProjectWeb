import React from "react";
import ProductCard from "@/components/ProductCard";
import {
  riskSystem,
  softwareTool,
  analyzingCamera,
  exampleIcon,
} from "../../../images/Icons";

const products = [
  {
    title: "Herramienta de Gestión de Eventos",
    description: "Software diseñado para facilitar la planificación, organización y seguimiento de eventos de todo tipo.",
    price: 1050.99,
    imageIcon: softwareTool,
  },
  {
    title: "Análisis de Causas y Consecuencias",
    description: "Herramienta especializada para realizar un análisis detallado de las causas y consecuencias de eventos.",
    price: 1500.99,
    imageIcon: analyzingCamera,
  },
  {
    title: "Sistema de Gestión de Riesgos",
    description: "Solución integral para identificar, evaluar y mitigar los riesgos potenciales en su organización.",
    price: 800.99,
    imageIcon: riskSystem,
  },
  {
    title: "Planificador de Eventos Profesional",
    description: "Herramienta avanzada para la planificación y coordinación de eventos corporativos y sociales.",
    price: 2500.99,
    imageIcon: exampleIcon,
  },
  {
    title: "Plataforma de Análisis de Datos",
    description: "Solución de inteligencia de negocios para analizar y visualizar datos complejos.",
    price: 3000.99,
    imageIcon: exampleIcon,
  },
  {
    title: "Cursos de Capacitación Empresarial",
    description: "Programas de capacitación en línea para desarrollar habilidades y conocimientos clave.",
    price: 1200.99,
    imageIcon: exampleIcon,
  },
  {
    title: "Servicios de Consultoría Empresarial",
    description: "Asesoramiento estratégico y soluciones personalizadas para mejorar el rendimiento de su negocio.",
    price: 5000.99,
    imageIcon: exampleIcon,
  },
];

const Products = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">
        Nuestros Productos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            price={product.price}
            imageIcon={product.imageIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
