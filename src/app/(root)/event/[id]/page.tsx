// @ts-nocheck
"use client";
import React, { useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import GenericCard from "@/components/GenericCard";
import { useRouter } from "next/navigation";
import { ContextEvent } from "@/components/ContextProvider";

function getEventCauses(events, id) {
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
      return event.title;
    }
  }
  return 'no title'
}

const Event = ({ params: { id } }: { params: { id: string } }) => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { events, setEvents } = useContext(ContextEvent);

  useEffect(() => {
    const getCauses = async () => {
      try {
        setCauses(getEventCauses(events,id));
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
    <>
      <div className="justify-center">
        <h1 className="text-2xl flex justify-center text-purple-2 font-extrabold text-center">
          {setTitle(events, id)}
        </h1>
        <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
          {causes.length > 0
            ? causes.map(({ cau_id, cau_cause }, index) => {
                return (
                  <GenericCard
                    key={index}
                    id={cau_id}
                    description={cau_cause}
                    onClick={() => router.push(`cause/${cau_id}`)}
                    className="text-2xl items-center justify-center"
                  />
                );
              })
            : "no causes found"}
        </div>
      </div>
    </>
  );
};

export default Event;
