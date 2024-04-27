"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import GenericCard from "./GenericCard";
import { useRouter } from "next/navigation";

async function getData() {
  const response = await fetch(`http://localhost:3000/api/events`);
  return response.json();
}

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
    <div className="justify-center">
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
      </div>
    </div>
  );
}

export default Events;
