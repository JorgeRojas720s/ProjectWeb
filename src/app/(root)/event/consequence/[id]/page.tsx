'use client'
import Cause from "@/components/Cause";
import CuaseSideBar from "@/components/CuaseSideBar";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export const Causes = createContext([null]);

async function getData() {
  const response = await fetch(`http://localhost:3000/api/causes`);
  return response.json();
}

const Consequence = ({ params: { id } }: { params: { id: number } }) => {
  const [causes, setCauses] = useState([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
    <Causes.Provider value={causes}>
      <div className="flex justify-between items-center mr-5 ml-5 max-md:flex-col max-sm:flex-col max-w-lg:flex-row">
        <CuaseSideBar />
        <Cause id={id}/>
      </div>
    </Causes.Provider>
  );
};

export default Consequence;
