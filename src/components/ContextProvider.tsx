// @ts-nocheck
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import EventClass from "../utils/EventClass.tsx";
import Loading from "./Loading";

export const ContextEvent = createContext();

async function getData() {
  const response = await fetch(`http://localhost:3000/api/events`);
  return response.json();
}

const createEvents = async (data) => {
  const eventsArray = [];
  for (const eventData of data) {
    const enventClass = new EventClass('');
    const eventInstance = await enventClass.createEvent(eventData);
    eventsArray.push(eventInstance);
  }
  return eventsArray;
}
 const ContextProvider = ({children}) => {
      const [loading, setLoading] = useState(true);
      const [events, setEvents] = useState([]);
      let hadChange = false;
      useEffect(() => {
        const getEvents = async () => {
          try {
            const data = await getData();
            let array = await createEvents(data);
            setEvents(array)
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getEvents();
      }, []);
      //se puede implementar el 'useMemo' para que no hayan renderizados cuando la info sigue siendo la misma
      if (loading) {
        return <Loading />;
      }
      return (
    <ContextEvent.Provider value={{ events, setEvents }}>
        {children}
    </ContextEvent.Provider>
  )
}

export default ContextProvider;
