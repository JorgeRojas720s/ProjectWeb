// @ts-nocheck
'use client';

import Cause from "@/components/Cause";
import { ContextEvent } from "@/components/ContextProvider";
import CuaseSideBar from "@/components/CuaseSideBar";
import React, { createContext, useContext } from "react";

// No exportamos `ActualEvent` porque no es necesario
const ActualEvent = createContext(null);

const Event = ({ params: { id } }: { params: { id: number } }) => {
  const { events } = useContext(ContextEvent);

  // Asegúrate de que `events` es un array y `id` es un índice válido
  let event = events ? events[id - 1] : null;

  if (!event) {
    return <div>Event not found</div>;
  }

  console.log(event);

  return (
    <ActualEvent.Provider value={event}>
      <div className="flex justify-between items-center mr-5 ml-5 max-md:flex-col max-sm:flex-col max-w-lg:flex-row">
        <CuaseSideBar />
        <Cause id={id} />
      </div>
    </ActualEvent.Provider>
  );
};

export default Event;
