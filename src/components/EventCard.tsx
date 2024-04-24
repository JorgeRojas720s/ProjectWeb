'use client'
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";


function EventCard({ title, description}:{title:string, description:string}) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`event/${title}`)}>
      <Card className="h-[220px] xl:w-[420px] lg:w-[320px] md:w-[350px] sm:w-fit m-5 hover:translate-y-[-10px] cursor-pointer">
        <CardHeader>
          <CardTitle className="text-purple-1">{title}</CardTitle>
          <CardDescription className="text-black">{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default EventCard;
