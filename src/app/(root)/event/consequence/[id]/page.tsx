// @ts-nocheck
'use client';

import Cause from "@/components/Cause";
import { ContextEvent } from "@/components/ContextProvider";
import CuaseSideBar from "@/components/CuaseSideBar";
import Loading from "@/components/Loading";
import React, { createContext, useContext, useEffect, useState } from "react";

// No exportamos `ActualEvent` porque no es necesario exportarlo
const ActualEvent = createContext(null);

const Consequence = ({ params: { id } }: { params: { id: number } }) => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { events } = useContext(ContextEvent);
  
  // Asegúrate de que `events` es un array y `id` es un índice válido
  let event = events ? events[id - 1] : null;

  useEffect(() => {
    const getCauses = async () => {
      if (event) {
        try {
          setCauses(event.causes);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCauses();
  }, [event]);

  if (loading) {
    return <Loading />;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <ActualEvent.Provider value={event}>
      <div className="flex justify-between items-center mr-5 ml-5 max-md:flex-col max-sm:flex-col max-w-lg:flex-row">
        <CuaseSideBar />
        <Cause id={id} />
      </div>
    </ActualEvent.Provider>
  );
};

export default Consequence;
