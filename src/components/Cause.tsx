//@ts-nocheck
"use client";
import React, { useContext } from "react";
import { ActualEvent } from "@/app/(root)/event/[id]/page";
import EventClass from "@/utils/EventClass";
import CausesConsequeces from "./CausesConsequeces";
import Risk from "./Risk";
import ControlMeasures from "./ControlMeasures";
import Action from "./Action";

const Cause = ({ id, causeId }: { id: number; causeId: number }) => {
  const event = useContext<EventClass | null>(ActualEvent);

  return (
    <div className="w-[700px] h-[440px] overflow-y-auto shadow-md rounded-2xl border border-zinc-950 m-10 md:w-full sm:w-screen">
      <div className="m-3">
        <p className="text-purple-2 font-bold text-2xl">{event?.title}</p>
        <p>{event?.event}</p>
        {event?.causesXConsequences.map(({ causes, consequences }, index) => {
          if (causeId === index) {
            return (
              <div key={index} className="text-l">
                <CausesConsequeces
                  items={causes}
                  singularTitle={"Causa"}
                  pluralTitle={"Causas"}
                  postFix={"cau_cause"}
                />

                <CausesConsequeces
                  items={consequences}
                  singularTitle={"Consecuencia"}
                  pluralTitle={"Consecuencias"}
                  postFix={"con_consequence"}
                />

                <br />
                {event?.causesXRisk?.length > 0 ? (
                  <Risk
                    items={event.causesXRisk}
                    pluralTitle={"Riesgos"}
                    singularTitle={"Riesgo"}
                    index={index}
                  />
                ) : event?.consequencesXControlMeasurements?.length > 0 ? (
                  <ControlMeasures
                    items={event?.consequencesXControlMeasurements}
                    pluralTitle="Control de Medidas"
                    singularTitle="Control de Medida"
                    index={index}
                  />
                ) :(
                  
                  <Action 
                    items={event?.consequencesXActions}
                    index={index}
                  />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Cause;