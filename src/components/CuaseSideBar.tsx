// @ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import { ActualEvent } from "@/app/(root)/event/consequence/[id]/page";

const CuaseSideBar = () => {
  const event = useContext(ActualEvent);
  const [causes, setCauses] = useState(event.causes);
  console.log(event);
  console.log(causes);
  return (
    <>
      <div className="bg-purple-1 w-[350px] h-[440px] rounded-3xl m-10 overflow-y-auto relative">
        <h1 className="text-white justify-center items-center flex pt-3 font-bold">
          Causas
        </h1>
        <nav>
          <ul className="mt-5 justify-start ml-2">
            {causes.map(({ cau_cause }, index) => {
              let cause = cau_cause;
              return (
                <li key={index} className="text-white p-1 hover:cursor-pointer">
                  <a>
                    {"▶ "}
                    {cause.length > 25 ? cause.substring(0, 15) + "..." : cause}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CuaseSideBar;
