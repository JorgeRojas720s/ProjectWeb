// @ts-nocheck
"use client";
import React, { useContext } from "react";
import { Causes } from "@/app/(root)/event/consequence/[id]/page";

const Cause = ({ id }: { id: number }) => {
  const cause = useContext(Causes);
  return (
    <div className="w-[700px] h-[440px] overflow-y-auto shadow-md rounded-2xl border border-zinc-950 m-10 md:w-full sm:w-full">
      <div className="m-3">
        <h3 className="text-purple-1 text-xl">Cuasa: </h3>
        <p className="text-lg">{cause[id].cau_cause}</p>

        <h3 className="text-purple-1 text-xl">Consecuencias: </h3>
        <p className="text-lg">{cause[id].cau_cause}</p>
      </div>
    </div>
  );
};

export default Cause;
