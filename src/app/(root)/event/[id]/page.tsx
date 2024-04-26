"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import CauseCard from "@/components/CauseCard";

async function getData() {
  const response = await fetch(`http://localhost:3000/api/causes`);
  return response.json();
}

const Event = ({ params: { id } }: { params: { id: string } }) => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCauses = async () => {
      try {
        const data = await getData();
        setCauses(data);
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
        <h1 className="text-2xl flex justify-center">{id.replaceAll("%20", " ")}</h1>
        <div className="grid justify-center items-centers mt-10 w-full h-fit xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
          {causes.length>0? causes.map(({ cau_id, cau_cause }, index) => {
            
        console.log(causes)
            return <CauseCard key={index} id={cau_id} description={cau_cause}/>;
          
          }): 'no causes found'}
        </div>
      </div>
    </>
  );
};

export default Event;
