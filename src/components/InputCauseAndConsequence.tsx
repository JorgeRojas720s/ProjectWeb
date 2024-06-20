// @ts-nocheck
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";
import { TextCursor } from "lucide-react";
import EventAction from "@/components/EventAction";
import EventRisk from "@/components/EventRisk";
import EventControl from "@/components/EventControl";

const CATEGORIES = ["Causa", "Consecuencia"];

const InputCauseAndConsequence = ({
  cont,
  principalTextAreas,
  principalSetTextAreas,
  enableButton, //Pa controlar el button "Add new Cause"
}) => {
  const [textAreas, setTextAreas] = useState({
    causa: [""],
    consecuencia: [""],
  });

  const [selectEvent, setSelectEvent] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //Nuevox
  const [isSaved, setIsSaved] = useState(false);

  const btnClassName = `bg-white m-5 p-5 py-3 text-center text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-3 mb-10${
    isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"
  }`;

  const handleEventChange = (eventType) => {
    setSelectEvent(eventType);
  };

  const handleTextAreaChange = (category, index, event) => {
    const updatedAreas = [...textAreas[category]];
    updatedAreas[index] = event.target.value;
    setTextAreas((prev) => ({
      ...prev,
      [category]: updatedAreas,
    }));
  };

  const saveText = () => {
    const newCausaYConsecuencia = {
      causa: textAreas.causa,
      consecuencia: textAreas.consecuencia,
    };

    principalSetTextAreas((prev) => ({
      ...prev,
      causasYConsecuencias: [
        ...prev.causasYConsecuencias,
        newCausaYConsecuencia,
      ],
    }));

    setIsButtonDisabled(false);
    enableButton(); // Habilitar el botón cuando se guarda
    setIsSaved(true);
    console.log("data: .☠️☠️", textAreas);
  };

  const addTextArea = (category) => {
    setTextAreas((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  return (
    <div>
      {CATEGORIES.map((Category, index) => {
        const category = Category.toLowerCase();
        return (
          <div key={category}>
            <p className="text-purple-2 text-2xl font-bold">
              {category.substring(0, 1).toUpperCase() + category.substring(1)}
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
            {category === "consecuencia" ? (
              <button
                className="bg-white py-3 px-6 text-purple-1 font-bold border border-purple-1.5 rounded-lg"
                onClick={saveText}
              >
                Save
                {isSaved && <span className="ml-2 text-green-500">&#10003;</span>}
              </button>
            ) : (
              <></>
            )}
          </div>
        );
      })}

      {/* codigo kk de isma */}
      <div>
        <button
          className={
            btnClassName +
            ` ${
              selectEvent === "Risk"
                ? "underline decoration-purple-1 decoration-4 underline-offset-8"
                : ""
            }`
          }
          onClick={() => handleEventChange("Risk")}
          disabled={isButtonDisabled}
        >
          Riesgo
        </button>
        <button
          className={
            btnClassName +
            ` ${
              selectEvent === "Action"
                ? "underline decoration-purple-1 decoration-4 underline-offset-8"
                : ""
            }`
          }
          onClick={() => handleEventChange("Action")}
          disabled={isButtonDisabled}
        >
          Acciones
        </button>
        <button
          className={
            btnClassName +
            ` ${
              selectEvent === "Control"
                ? "underline decoration-purple-1 decoration-4 underline-offset-8"
                : ""
            }`
          }
          onClick={() => handleEventChange("Control")}
          disabled={isButtonDisabled}
        >
          Medidas de Control
        </button>
      </div>

      {selectEvent === "Risk" && (
        <EventRisk  principalSetTextAreas={principalSetTextAreas}/>
      )}
      {selectEvent === "Action" && (
        <EventAction principalSetTextAreas={principalSetTextAreas} />
      )}
      {selectEvent === "Control" && (
        <EventControl  principalSetTextAreas={principalSetTextAreas} />
      )}
    </div>
  );
};

export default InputCauseAndConsequence;
