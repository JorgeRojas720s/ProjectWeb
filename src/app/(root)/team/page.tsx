import React from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import {
  janeImage,
  davidImage,
  emilyImage,
  jessicaImage,
  jhonImage,
  michaelImage,
  robertImage,
  sarahImage,
} from "../../../images/Icons";

const teamMembers = [
  {
    name: "John Doe",
    role: "Director Ejecutivo",
    experience: "Más de 15 años de experiencia en gestión empresarial.",
    imageIcon: jhonImage,
  },
  {
    name: "Jane Smith",
    role: "Directora de Operaciones",
    experience: "Experta en optimización de procesos y gestión de proyectos.",
    imageIcon: janeImage,
  },
  {
    name: "Michael Johnson",
    role: "Jefe de Desarrollo de Software",
    experience:
      "Líder en el desarrollo de soluciones tecnológicas innovadoras.",
    imageIcon: michaelImage,
  },
  {
    name: "Emily Wilson",
    role: "Gerente de Marketing",
    experience: "Especialista en estrategias de marketing digital y branding.",
    imageIcon: emilyImage,
  },
  {
    name: "David Thompson",
    role: "Director Financiero",
    experience:
      "Experimentado en planificación financiera y gestión de riesgos.",
    imageIcon: davidImage,
  },
  {
    name: "Sarah Anderson",
    role: "Gerente de Recursos Humanos",
    experience: "Experta en adquisición de talento y desarrollo de empleados.",
    imageIcon: sarahImage,
  },
  {
    name: "Robert Brown",
    role: "Director de Ventas",
    experience:
      "Historial comprobado en impulsar ventas y construir relaciones con clientes.",
    imageIcon: robertImage,
  },
  {
    name: "Jessica Taylor",
    role: "Gerente de Atención al Cliente",
    experience: "Dedicada a proporcionar un servicio al cliente excepcional.",
    imageIcon: jessicaImage,
  },
];

const Team = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">
        Nuestro Equipo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            experience={member.experience}
            imageIcon={member.imageIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
