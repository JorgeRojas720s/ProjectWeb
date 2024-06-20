// @ts-nocheck
"use client";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";
import InputCauseAndConsequence from "@/components/InputCauseAndConsequence";

//globals
const CATEGORIES = [""];
let cont = -1;
function Page() {
  const router = useRouter();

  const [textAreas, setTextAreas] = useState({
    event: [""],
    causasYConsecuencias: [],
    eventRisk: [],
    eventAction: [],
    eventControl: [],
  });

  const [selectEvent, setSelectEvent] = useState(null);

  const [causesAndConsequences, setCausesAndConsequences] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //Nuevox

  const btnClassName = `bg-white m-5 p-5 py-3 text-center text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-3 mb-10${
    isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"
  }`;

  const addCausesXConsequences = () => {
    cont++;
    console.log("anteeeeeeeeees: ", textAreas.causasYConsecuencias);
    setCausesAndConsequences((prevCausesAndConsequences) => [
      ...prevCausesAndConsequences,
      <InputCauseAndConsequence
        key={cont}
        cont={cont}
        principalTextAreas={textAreas}
        principalSetTextAreas={setTextAreas}
        enableButton={() => setIsButtonDisabled(false)}
      />,
    ]);
    setIsButtonDisabled(true);
  };

  // const addTextArea = (category) => {
  //   console.log("adtexxxxxxxxxxxxxxxxxxxxxxt", category);
  //   setTextAreas((prev) => ({
  //     ...prev,
  //     [category]: [...prev[category], ""],
  //   }));
  // };

  const handleTextAreaChange = (category, index, event) => {
    const updatedAreas = [...textAreas[category]];
    updatedAreas[index] = event.target.value;
    setTextAreas((prev) => ({
      ...prev,
      [category]: updatedAreas,
    }));

    if (
      category === "event" &&
      event.target.value.trim() !== "" &&
      index === 0
    ) {
      setIsButtonDisabled(false);
    } else if (
      category === "event" &&
      event.target.value.trim() === "" &&
      index === 0
    ) {
      setIsButtonDisabled(true);
    }
  };

  const clickSend = () => {

    if (textAreas.event.length !== 0 && textAreas.event.every(e => e !== '')) {

      fetch("http://localhost:3000/api/events/register", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(textAreas),
      }).then((res) => {
        console.log("Toda la infiooooo: ", textAreas);
        console.log("response: ", res);
        console.log("json: 👻👻👻👻👻 ", JSON.stringify(textAreas));
      });

      router.push("/");
    } else {
      alert("Evento vacío");
    }
  };

  // const handleEventChange = (eventType) => {
  //   setSelectEvent(eventType);
  // };

  return (
    <div className="flex justify-center">
      <div className="w-screen m-8 p-8 shadow-md rounded-r-2xl">
        <span className="block text-purple-2 text-2xl font-bold mb-6 border-b-8 border-b-purple-1.5">
          Formulario de Eventos
        </span>

        <section>
          <p className="text-purple-2 text-2xl font-bold">Evento</p>
          <GenericTextArea
            id={0}
            placeholder={"Event Title"}
            rows={10}
            cols={30}
            className="h-8 w-80 border border-purple-1 overflow-hidden placeholder:"
            onChange={(event) => handleTextAreaChange("event", 0, event)}
          />
          <div className="flex justify-start">
            <GenericTextArea
              id={0}
              placeholder={"Event Description"}
              rows={10}
              cols={30}
              className="h-32"
              onChange={(event) => handleTextAreaChange("event", 1, event)}
            />
          </div>

          <div>
            {/* aqui se agrega la nueva causa y consequencia */}
            {causesAndConsequences &&
              causesAndConsequences.map((item, index) => (
                <div key={index}>
                  <div>{item}</div>
                </div>
              ))}
            <button
              className={`bg-white px-3 py-3 text-center text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-3 mb-10 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:cursor-pointer"
              }`}
              onClick={addCausesXConsequences}
              disabled={isButtonDisabled}
            >
              Add new Cause and Consequence
            </button>
          </div>
        </section>

        <div className="flex gap-4 mt-6">
          <div
            className="flex-1 bg-purple-1 py-3 text-center text-white font-bold hover:cursor-pointer"
            onClick={clickSend}
          >
            Enviar
          </div>
          <div className="flex-[0.3] drop-shadow-md">
            <div className="bg-white py-3 text-center text-purple-1 font-bold border border-purple-1.5 hover:cursor-pointer">
              Limpiar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
