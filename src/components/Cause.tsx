// @ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import { ActualEvent } from "@/app/(root)/event/consequence/[id]/page";

const Cause = ({ id }: { id: number }) => {
  const event = useContext(ActualEvent);
  const [causes, setCauses] = useState(event.causes);
  const [consequences, setConsequences] = useState(event.consequences);
  console.log(event)

  return (
    <div className="w-[700px] h-[440px] overflow-y-auto shadow-md rounded-2xl border border-zinc-950 m-10 md:w-full sm:w-full">
      <div className="m-3">
      <p className="text-purple-2 font-bold text-2xl">{event.title}</p>
        <h3 className="text-purple-1 text-xl">Causa: </h3>
        <p className="text-lg">
          {causes.length > 0
            ? causes.map(({ cau_cause }) => cau_cause)
            : "No tiene causas"}
        </p>
        <h3 className="text-purple-1 text-xl">Consecuencias: </h3>
        <p className="text-lg">
          {consequences.length > 0
            ? consequences.map(({ con_consequence }) => con_consequence)
            : "No tiene consecuencias"}
        </p>
      </div>
    </div>
  );
};

export default Cause;
