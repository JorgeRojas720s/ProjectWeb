import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function EventCard({ title, description }:{title:string, description:string}) {
  return (
    <div>
      <Card className="h-[220px] xl:w-[420px] lg:w-[320px] md:w-[350px] sm:w-fit m-5">
        <CardHeader>
          <CardTitle className="text-purple-1">{title}</CardTitle>
          <CardDescription className="text-black">{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default EventCard;
