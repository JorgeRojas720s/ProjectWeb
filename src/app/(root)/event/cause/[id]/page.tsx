"use client";
import GenericCard from "@/components/GenericCard";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

async function getData({id}:{id:string}) {
  const response = await fetch(`http://localhost:3000/api/consequences/`);
  return response.json();
}

const Cause = ({ params: { id } }: { params: { id: string } }) => {
  const [consequences, setConsequences] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const title = id.replaceAll("%20", " ");
  useEffect(() => {
    const getCauses = async () => {
      try {
        const data = await getData({id});
        setConsequences(data);
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
        {title.length > 50 ? title.substring(0, 30) : title}
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
