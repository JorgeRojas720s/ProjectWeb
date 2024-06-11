// @ts-nocheck
"use client";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";
import InputCauseAndConsequence from "@/components/InputCauseAndConsequence";
import EventAction from "@/components/EventAction";
import EventControl from "@/components/EventControl";
import EventRisk from "@/components/EventRisk";
//globals
const CATEGORIES = ["Riesgo"]; //"Causa", "Consequencia",
let cont = -1;
let bandera;
function Page() {
  const router = useRouter();

  const [textAreas, setTextAreas] = useState({
    event: [""],
    causasYConsecuencias: [],
    riesgo: [""],
  });
  const [selectEvent, setSelectEvent] = useState(null);

  const [causesAndConsequences, setCausesAndConsequences] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //Nuevox
  const auxArray = [];

  const handleClick = () => {
    console.log("bandera: ", bandera);
    bandera = true;
    cont++;
    // saveText();
    console.log("anteeeeeeeeees: ", textAreas.causasYConsecuencias);
    setCausesAndConsequences((prevCausesAndConsequences) => [
      ...prevCausesAndConsequences,
      <InputCauseAndConsequence
        key={cont}
        cont={cont}
        principalTextAreas={textAreas}
        principalSetTextAreas={setTextAreas}
        bandera={bandera}
        enableButton={() => setIsButtonDisabled(false)}
      />,
    ]);
    bandera = false;
    setIsButtonDisabled(true);
  };

  const addTextArea = (category) => {
    console.log("adtexxxxxxxxxxxxxxxxxxxxxxt", category);
    setTextAreas((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const handleTextAreaChange = (category, index, event) => {
    const updatedAreas = [...textAreas[category]];
    updatedAreas[index] = event.target.value;
    setTextAreas((prev) => ({
      ...prev,
      [category]: updatedAreas,
    }));

    if (category === "event" && event.target.value.trim() !== "") {
      setIsButtonDisabled(false);
    } else if (category === "event" && event.target.value.trim() === "") {
      setIsButtonDisabled(true);
    }
  };

  const clickSend = () => {
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
      console.log("json:  ", JSON.stringify(textAreas));
    });

    // router.push("/");
  };

  const btnClassName = `bg-white m-5 p-5 py-3 text-center text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-3 mb-10${
    isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"
  }`;

  const handleEventChange = (eventType) => {
    setSelectEvent(eventType);
  };

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
            <button
              className={btnClassName + ` ${selectEvent === 'Risk'?'underline decoration-purple-1 decoration-4 underline-offset-8':''}`}
              onClick={() => handleEventChange("Risk")}
              disabled={isButtonDisabled}
            >
              Riesgo
            </button>
            <button
              className={btnClassName + ` ${selectEvent === 'Action'?'underline decoration-purple-1 decoration-4 underline-offset-8':''}`}
              onClick={() => handleEventChange("Action")}
              disabled={isButtonDisabled}
            >
              Acciones
            </button>
            <button
              className={btnClassName + ` ${selectEvent === 'Control'?'underline decoration-purple-1 decoration-4 underline-offset-8':''}`}
              onClick={() => handleEventChange("Control")}
              disabled={isButtonDisabled}
            >
              Medidas de Control
            </button>
          </div>

          {selectEvent === "Risk" && (
            <EventRisk eventTitle="title" eventDesription="description" />
          )}
          {selectEvent === "Action" && (
            <EventAction eventTitle="title" eventDesription="description" />
          )}
          {selectEvent === "Control" && (
            <EventControl eventTitle="title" eventDesription="description" />
          )}

          {
            //ESTO ES LO QUE CAMBIA
          }

          {CATEGORIES.map((Category, index) => {
            const category = Category.toLowerCase();
            return (
              <div key={category}>
                {category === "riesgo" ? (
                  <div>
                    {/* aqui se agrega la nueva causa y consequencia */}
                    {causesAndConsequences &&
                      causesAndConsequences.map((item, index) => (
                        <div key={index}>
                          {" "}
                          {/* pasar el index para conoces algrupo que pertenece*/}
                          <div>------------------------</div>
                          <div>{item}</div>
                        </div>
                      ))}
                    <button
                      className={`bg-white py-3 text-center text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-3 mb-10 ${
                        isButtonDisabled
                          ? "cursor-not-allowed opacity-50"
                          : "hover:cursor-pointer"
                      }`}
                      onClick={handleClick}
                      disabled={isButtonDisabled}
                    >
                      Add new Cause
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <p className="text-purple-2 text-2xl font-bold">
                  {category.substring(0, 1).toUpperCase() +
                    category.substring(1)}
                </p>
                <section className="grid justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {textAreas[category].map((_, id) => (
                    <div key={id} className="flex justify-center">
                      <GenericTextArea
                        id={id}
                        className="h-[220px]"
                        placeholder={`${CATEGORIES[index]} ${id + 1}`}
                        rows={10}
                        cols={30}
                        onChange={(event) =>
                          handleTextAreaChange(category, id, event)
                        }
                      />
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <GenericCard
                      id={index}
                      title="+"
                      className="justify-center flex h-fit text-8xl"
                      onClick={() => addTextArea(category)}
                    />
                  </div>
                </section>
              </div>
            );
          })}

          {
            //HASTA ACÁ
          }
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
