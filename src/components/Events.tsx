// @ts-nocheck
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import GenericCard from "./GenericCard";
import { useRouter } from "next/navigation";
import { EventsData } from "@/app/page";
import Consequence, { Causes } from "@/app/(root)/event/consequence/[id]/page";

async function getData() {
  const response = await fetch(`http://localhost:3000/api/events`);
  // const response = await fetch(`${process.env.API_URL}/events`);
  return response.json();
}

// Event:{
//   Consequence:[{}],
//   Causes:[{}],
// }

function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getData();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col w-fit ">
        <h1 className="text-2xl flex justify-center text-purple-2 font-extrabold">
          {"Events"}
        </h1>
        <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
          {events.map(({ eve_id, eve_title, eve_description }, index) => {
            return (
              <GenericCard
              id={eve_id}
              key={index}
              title={eve_title}
              description={eve_description}
              onClick={() => router.push(`event/${eve_title}`)}
              />
            );
          })}
          <GenericCard 
            id={'+'}
            title="+"
            className="justify-center flex h-fit text-8xl"
            onClick={()=>router.push(``)}
          />
        </div>
      </div>
    </>
  );
}

export default Events;
