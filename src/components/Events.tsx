"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loading from "./Loading";
import CardAux from "./CardAux";

async function getData() {
  const response = await fetch(`http://localhost:3000/api/events`);
  return response.json();
}

function Events() {
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
    <div className="">
      <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
        {events.map(({ eve_description }, index) => {
          return (
            //  <EventCard
            //     key={index}
            //      title={"event"}
            //     description={eve_description}
            //    />
            <CardAux
              key={index}
              title={"event"}
              description={eve_description}
            ></CardAux>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
