import React from "react";
import Image, { StaticImageData } from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  experience: string;
  imageIcon: StaticImageData;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  experience,
  imageIcon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="flex-shrink-0 mb-4">
        <Image
          src={imageIcon}
          alt={name}
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 font-semibold mb-2">{role}</p>
        <p className="text-gray-600">{experience}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
