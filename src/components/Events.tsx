// @ts-nocheck
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import GenericCard from "./GenericCard";
import { useRouter } from "next/navigation";
import EventClass from "../utils/EventClass";
async function getData() {
  const response = await fetch(`http://localhost:3000/api/events`);
  // const response = await fetch(`${process.env.API_URL}/events`);
  return response.json();
}

const createEvents = async (data) => {
  const eventsArray = [];
  for (const eventData of data) {
    const enventClass = new EventClass("");
    const eventInstance = await enventClass.createEvent(eventData);
    eventsArray.push(eventInstance);
  }
  return eventsArray;
};

function Events() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getData();
        let array = await createEvents(data);
        console.log(array);
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
            id={"+"}
            title="+"
            className="justify-center flex h-fit text-8xl"
            onClick={() => router.push(`create/`)}
          />
        </div>
      </div>
    </>
  );
}

export default Events;
