import React from "react";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: "Manejo de Eventos",
    description:
      "Ofrecemos servicios especializados para el manejo de eventos de todo tipo, desde su planificación hasta su ejecución.",
    features: [
      "Planificación de eventos",
      "Organización de actividades",
      "Coordinación de personal",
    ],
  },
  {
    title: "Análisis de Causas y Consecuencias",
    description:
      "Realizamos un análisis exhaustivo de las causas y consecuencias de los eventos, con el fin de identificar áreas de mejora y prevenir futuros incidentes.",
    features: [
      "Identificación de causas raíz",
      "Evaluación de consecuencias",
      "Recomendaciones de acciones preventivas",
    ],
  },
  {
    title: "Gestión de Riesgos",
    description:
      "Ofrecemos servicios de gestión de riesgos para ayudar a las organizaciones a identificar, evaluar y mitigar los riesgos potenciales.",
    features: [
      "Identificación de riesgos",
      "Evaluación de riesgos",
      "Planes de mitigación de riesgos",
    ],
  },
  {
    title: "Consultoría Empresarial",
    description:
      "Brindamos asesoramiento estratégico a empresas de diversos sectores para ayudarles a alcanzar sus objetivos y mejorar su rendimiento.",
    features: [
      "Análisis de mercado",
      "Planificación estratégica",
      "Reestructuración organizacional",
    ],
  },
  {
    title: "Desarrollo de Software",
    description:
      "Ofrecemos servicios de desarrollo de software a medida, desde aplicaciones web y móviles hasta soluciones empresariales personalizadas.",
    features: [
      "Aplicaciones web",
      "Aplicaciones móviles",
      "Integración de sistemas",
    ],
  },
  {
    title: "Marketing Digital",
    description:
      "Ayudamos a las empresas a aumentar su presencia en línea y a conectar con su audiencia a través de estrategias de marketing digital efectivas.",
    features: [
      "Publicidad en línea",
      "Redes sociales",
      "Optimización de motores de búsqueda (SEO)",
    ],
  },
  {
    title: "Capacitación y Desarrollo",
    description:
      "Ofrecemos programas de capacitación y desarrollo diseñados para mejorar las habilidades y el conocimiento de su personal.",
    features: [
      "Talleres y seminarios",
      "Programas de liderazgo",
      "Desarrollo de habilidades técnicas",
    ],
  },
];

const Services = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">
        Nuestros Servicios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
