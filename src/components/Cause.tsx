//@ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import { ActualEvent } from "@/app/(root)/event/[id]/page";
import EventClass from "@/utils/EventClass";

const Cause = ({ id, causeId }: { id: number; causeId: number }) => {
  const event = useContext<EventClass | null>(ActualEvent);
  const renderItems = (items, pluralTitle, SingularTitle, postFix)=>{
    return(
      <>
        <p className="text-purple-1 font-semibold">
          {items.length > 1 ? pluralTitle: SingularTitle}:
        </p>
        <div>
          {items.length > 0 ? (
            items.map((obj, index )=> (
              <p key={index}>{`${index +1}. ${obj[postFix]}`}</p>
            ))
          ):(
            <p>{`${items[postFix] != undefined? items[postFix]: 'No tiene'}`}</p>
          )}
        </div>
      </>
    )
  }

    const renderRisk = (items, pluralTitle, SingularTitle, postFix)=>{
      return(
        <>
          <p className="text-purple-1 font-semibold">
            {items.length > 1 ? pluralTitle: SingularTitle}:
          </p>
          <div>
            {items.length > 0 ? (
              items.map((obj, index )=> (
                <p key={index}>{`${index +1}. ${obj[postFix]}`}</p>
              ))
            ):(
              <p>{`${items[postFix] != undefined? items[postFix]: 'No tiene'}`}</p>
            )}
          </div>
        </>
      )
  }
  return (
    <div className="w-[700px] h-[440px] overflow-y-auto shadow-md rounded-2xl border border-zinc-950 m-10 md:w-full sm:w-screen">
      <div className="m-3">
        <p className="text-purple-2 font-bold text-2xl">{event?.title}</p>
        <p>{event?.event}</p>
        {event?.causesXConsequences.map(({ causes, consequences }, index) => {
          if (causeId === index) {
            return (
              <div key={index} className="text-l">
                {/* Render Causas */}
                {renderItems(causes, 'Causas', 'Causa', 'cau_cause')}
                {renderItems(consequences, 'Consecuencias', 'Consecuencia', 'con_consequence')}
                {renderRisk(event.causesXRisk)}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Cause;