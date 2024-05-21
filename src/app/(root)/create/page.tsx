// @ts-nocheck
"use client";
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";
import InputCauseAndConsequence from "@/components/InputCauseAndConsequence";

const CATEGORIES = ["Causa", "Consequencia", "Riesgo"];

function Page() {
  const [textAreas, setTextAreas] = useState({
    event: [""],
    causa: [""],
    consequencia: [""],
    riesgo: [""],
  });

  const [arrayGrande, setArrayGrande] = useState([]);

  const handleClick = () => {
    setArrayGrande((prevArrayGrande) => [
      ...prevArrayGrande,
      <InputCauseAndConsequence />,
    ]); //colocar componente quii
  };

  const addTextArea = (category) => {
    setTextAreas((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  //preguntar si esta arrowfunction se puede pasar como parametro a otro componentte
  const handleTextAreaChange = (category, index, event) => {
    const updatedAreas = [...textAreas[category]];
    updatedAreas[index] = event.target.value;
    setTextAreas((prev) => ({
      ...prev,
      [category]: updatedAreas,
    }));
  };

  const clickSend = () => {
    console.log("Toda la infiooooo: ", textAreas);

    fetch("http://localhost:3000/api/events/register", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textAreas),
    }).then((res) => {
      console.log("response: ", res);
      console.log("json:  ", JSON.stringify(textAreas));
    });
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

          {CATEGORIES.map((Category, index) => {
            const category = Category.toLowerCase();
            return (
              <div key={category}>
                {category === "riesgo" ? (
                  <div>
                    {/* aqui se agrega la nueva causa y consequencia */}
                    {arrayGrande &&
                      arrayGrande.map((item, index) => (
                        <div key={index}>
                          <div>------------------------</div>
                          <div>{item}</div>
                        </div>
                      ))}
                    <button
                      className="bg-whithe py-3 text-center text-purple-1 font-bold border border-purple-1.5 hover:cursor-pointer rounded-lg mt-3 mb-10 "
                      onClick={() => handleClick()}
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
        </section>

        <div className="flex gap-4 mt-6">
          <div
            className="flex-1 bg-purple-1 py-3 text-center text-white font-bold hover:cursor-pointer"
            onClick={clickSend}
          >
            Enviar
          </div>
          <div className="flex-[0.3] drop-shadow-md">
            <div className="bg-whithe py-3 text-center text-purple-1 font-bold border border-purple-1.5 hover:cursor-pointer">
              Limpiar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
