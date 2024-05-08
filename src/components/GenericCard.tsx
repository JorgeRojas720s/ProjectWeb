import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface genericCardProps {
  id: number;
  title?: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

const GenericCard = ({
  id,
  description,
  title,
  onClick,
  className,
}: genericCardProps) => {
  const router = useRouter();
  return (
    <>
    <div>
      <div onClick={onClick}>
        <Card className="h-[220px] xl:w-[420px] lg:w-[320px] md:w-[350px] p-5 sm:w-fit m-5 hover:translate-y-[-10px] cursor-pointer hover:ease-linear transition-all">
          <CardHeader>
            {title != null ? (
              <CardTitle className={`text-purple-1 ${className != null? className : ""}`}>{title}</CardTitle>
            ) : (
              <></>
            )}
            <CardDescription
              className={`text-black text-base ${
                className != null ? className : ""
              }`}
            >
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
    </>
  );
};

export default GenericCard;
