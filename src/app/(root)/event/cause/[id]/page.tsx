// @ts-nocheck
"use client";
import { ContextEvent } from "@/components/ContextProvider";
import GenericCard from "@/components/GenericCard";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function getEventConsequences(events, id) {
  let causesArray = [];
  for (let event of events) {
    for (let cause of event.causes) {
      if (cause.cau_fk_event == id) {
        causesArray.push(cause);
      }
    }
  }
  return causesArray;
}

function setTitle(events, id) {
  for (let event of events) {
    if(event.code == id){
      return event.event;
    }
  }
  return 'no title'
}


const Cause = ({ params: { id } }: { params: { id: string } }) => {
  const [consequences, setConsequences] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {events, setEvents} = useContext(ContextEvent);
  useEffect(() => {
    const getCauses = async () => {
      try {
        setConsequences(getEventConsequences(events,id));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCauses();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="justify-center">
      <h1 className="text-2xl flex justify-center text-purple-2 font-extrabold">
        {setTitle(events, id)}
      </h1>
      <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
        {consequences.map(({ con_id, con_consequence }, index) => {
          return (
            <GenericCard
              key={index}
              id={con_id}
              description={con_consequence}
              onClick={() => router.push(`/event/consequence/${con_id}`)}
              className="text-2xl items-center justify-center"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cause;
