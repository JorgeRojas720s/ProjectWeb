//@ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import { ActualEvent } from "@/app/(root)/event/[id]/page";
import EventClass from "@/utils/EventClass";

const Cause = ({ id }: { id: number }) => {
  const event = useContext<EventClass | null>(ActualEvent);

  return (
    <div className="w-[700px] h-[440px] overflow-y-auto shadow-md rounded-2xl border border-zinc-950 m-10 md:w-full sm:w-full">
      <div className="m-3">
        <p className="text-purple-2 font-bold text-2xl">{event?.title}</p>
        <p>{event?.event}</p>
        {event?.causesXConsequences.map(({ causes,consequences}, index) => {
          return (
            <div key={index} className="text-lg">
              {/* Causes Title */}
              <p className="text-purple-1 font-semibold">
                {causes.cau_cause
                  ? `${causes.lenght > 1 ? "Causas" : "Causa"}:`
                  : ""}
              </p>
              {/* Causes */}
              {causes.lenght > 1 ? (
                causes.map(({ cau_cause }) => <p>{cau_cause}</p>)
              ) : (
                <p>{causes.cau_cause}</p>
              )}


              {/* no sirve */}
              {/* Consequences Title */}
              {console.log('conseqeuences:',consequences)}
              <p className="text-purple-1 font-semibold">
                {consequences
                  ? `${
                      consequences.lenght > 1 ? "Consecuencias" : "Consecuencia"
                    }:`
                  : ""}
              </p>
              {/* Consequences */}
              {consequences.lenght > 1 ? (
                consequences.map(({ con_consequence }) => (
                  <p>{con_consequence}</p>
                ))
              ) : (
                <p>{consequences.con_consequence}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cause;

// ids [

//   cxc = {
//     cau_id: 1,
//   con_id: 1
// },
// cxc = {
//   cau_id: 1,
//   con_id: 2
// },
// cxc = {
//   cau_id: 1,
//   con_id: 2
// }
//   ]
