import React from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import {
  exampleIcon,
} from "../../../images/Icons"

const teamMembers = [
  {
    name: "John Doe",
    role: "Chief Executive Officer",
    experience: "Over 15 years of experience in business management.",
    imageIcon: exampleIcon,
  },
  {
    name: "Jane Smith",
    role: "Chief Operating Officer",
    experience: "Expert in process optimization and project management.",
    imageIcon: exampleIcon,
  },
  {
    name: "Michael Johnson",
    role: "Head of Software Development",
    experience: "Leader in developing innovative technological solutions.",
    imageIcon: exampleIcon,
  },
  {
    name: "Emily Wilson",
    role: "Marketing Manager",
    experience: "Specialist in digital marketing strategies and branding.",
    imageIcon: exampleIcon,
  },
  {
    name: "David Thompson",
    role: "Chief Financial Officer",
    experience: "Experienced in financial planning and risk management.",
    imageIcon: exampleIcon,
  },
  {
    name: "Sarah Anderson",
    role: "Human Resources Manager",
    experience: "Expert in talent acquisition and employee development.",
    imageIcon: exampleIcon,
  },
  {
    name: "Robert Brown",
    role: "Sales Director",
    experience:
      "Proven track record in driving sales and building client relationships.",
    imageIcon: exampleIcon,
  },
  {
    name: "Jessica Taylor",
    role: "Customer Support Manager",
    experience: "Dedicated to providing exceptional customer service.",
    imageIcon: exampleIcon,
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
