// @ts-nocheck
"use client";
import { ContextEvent } from "@/components/ContextProvider";
import GenericCard from "@/components/GenericCard";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Cause = ({ params: { id } }: { params: { id: string } }) => {
  const [consequences, setConsequences] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {events, setEvents} = useContext(ContextEvent);
  let event = events[id-1];
  useEffect(() => {
    const getCauses = async () => {
      try {
        setConsequences(event.consequences);
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
console.log(event)
  return (
    <div className="justify-center">
      <h1 className="text-2xl flex justify-center text-purple-2 font-extrabold">
        {event.title}
      </h1>
      <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
        {consequences.length>1? consequences.map(({ con_id, con_consequence }, index) => {
          return (
            <GenericCard
              key={index}
              id={con_id}
              description={con_consequence}
              onClick={() => router.push(`/event/consequence/${id}`)}
              className="text-2xl items-center justify-center"
            />
          );
        }):(
          <GenericCard
          key={consequences.con_id}
          id={consequences.con_id}
          description={consequences.con_consequence}
          onClick={() => router.push(`/event/consequence/${id}`)}
          className="text-2xl items-center justify-center"
        />
        )}
      </div>
    </div>
  );
};

export default Cause;
