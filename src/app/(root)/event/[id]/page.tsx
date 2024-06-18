// @ts-nocheck
'use client';

import Cause from "@/components/Cause";
import { ContextEvent } from "@/components/ContextProvider";
import CuaseSideBar from "@/components/CuaseSideBar";
import React, { createContext, useContext, useState } from "react";

export const ActualEvent = createContext(null);

const Event = ({ params: { id } }: { params: { id: number } }) => {
  const { events } = useContext(ContextEvent);
  const [causeId, setCauseId] = useState(0)

  let event = events ? events[id - 1] : null;

  if (!event) {
    return <div>Event not found</div>;
  }

  console.log(event);

  return (
    <ActualEvent.Provider value={event}>
      <div className="flex justify-between items-center mr-5 ml-5 max-md:flex-col max-sm:flex-col max-w-lg:flex-row">
        <CuaseSideBar setCauseId={setCauseId} causeId={causeId}/>
        <Cause id={id} causeId={causeId}/>
      </div>
    </ActualEvent.Provider>
  );
};

export default Event;
