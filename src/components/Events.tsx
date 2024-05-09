// @ts-nocheck
"use client";
import React, { useContext } from "react";
import GenericCard from "./GenericCard";
import { useRouter } from "next/navigation";
import {ContextEvent} from '../components/ContextProvider';

function Events() {
  const router = useRouter();
  const {events, setEvents} = useContext(ContextEvent);
  console.log(events)
  return (
    <>
      <div className="flex flex-col w-fit ">
        <h1 className="text-2xl flex justify-center text-purple-2 font-extrabold">
          {"Events"}
        </h1>
        <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
          {events.map((event, index) => {
            return (
              <GenericCard
                id={event.event}
                key={index}
                title={event.title}
                description={''}
                onClick={() => router.push(`event/${event.code}`)}
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
