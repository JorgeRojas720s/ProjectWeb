// @ts-nocheck
import React, { useState } from "react";
import GenericCard from "./GenericCard";
import GenericTextArea from "./GenericTextArea";
import Image from "next/image";
// import { basurero } from "@/images/Icons";


const EventRisk = ({principalSetTextAreas}) => {
  const CATEGORIES = ["Categorias de Riesgo", "Descripcion del Riesgo"];

  const [textAreas, setTextAreas] = useState({
    categoriasderiesgo: [""],
    descripciondelriesgo: [""],
  });
  const [radioBtn, setRadioBtn] = useState("")

  const addTextArea = (category) => {
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
  };

  const deselectRadioButton = () => {
    const radioInput1 = document.getElementById("internal") as HTMLInputElement;
    const radioInput2 = document.getElementById("external") as HTMLInputElement;

    radioInput1.checked = false;
    radioInput2.checked = false;
  };

 
  const saveText = () => {
    const newEventRisk = {
      riskClassification: radioBtn,
      riskCategory: textAreas.categoriasderiesgo,
      riskDescription: textAreas.descripciondelriesgo,
    };

    principalSetTextAreas((prev) => ({
      ...prev,
      eventRisk: [
        ...prev.eventRisk,
        newEventRisk,
      ],
    }));

    console.log("dataaaaa 🤢🤢🤢🤢", textAreas);
  };

  return (
    <div>
      <section>
        <p className="text-purple-2 text-2xl font-bold my-4">
          Clasificacion según la estructura institucional de riesgos
        </p>

        <div className="flex flex-col items-center md:flex-row md:justify-between rounded-lg p-4 mx-2 border-2 border-purple-500 max-w-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="radio"
              id="external"
              name="risk"
              value="externo"
              className="form-radio text-purple-600 h-6 w-6"
              onClick={(e) => setRadioBtn(e.target.value)}
            />
            <label htmlFor="external" className="ml-2 text-gray-700 text-lg">
              Externo
            </label>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="radio"
              id="internal"
              name="risk"
              value="interno"
              className="form-radio text-purple-600 h-6 w-6"
              onClick={(e) => setRadioBtn(e.target.value)}
            />
            <label htmlFor="internal" className="ml-2 text-gray-700 text-lg">
              Interno
            </label>
          </div>
          {/* <button>
            <Image src={basurero} alt={"basurero"} width={26} height={26} />
          </button> */}
        </div>

        {CATEGORIES.map((Category, index) => {
          const categoryAux = Category.toLowerCase();
          const category = Category.toLowerCase().replace(/\s/g, "");
          console.log("hp: 🤬🤬🤬🤬: ", category);
          return (
            <div key={category}>
              <p className="text-purple-2 text-2xl font-bold mt-5">
                {categoryAux.substring(0, 1).toUpperCase() +
                  categoryAux.substring(1)}
              </p>
              <section className="grid justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {textAreas[category].map((_, id) => (
                  <div key={id} className="flex justify-center">
                    <GenericTextArea
                      id={id}
                      className="h-[100px]"
                      placeholder={`${CATEGORIES[index]} ${id + 1}`}
                      rows={10}
                      cols={30}
                      onChange={(event) =>
                        handleTextAreaChange(category, id, event)
                      }
                    />
                  </div>
                ))}

                <div className="flex justify-center h-[100px] xl:w-[200px] lg:w-[200px] md:w-[200px] pl-3 sm:w-fit m-5 transition-all duration-200 ease-in-out focus:border-l-8 focus:border-purple-1 rounded-lg border border-purple-1">
                  <button
                    className="text-purple-1 justify-center flex h-fit text-8xl"
                    onClick={() => addTextArea(category)}
                  >
                    {"+"}
                  </button>
                </div>
              </section>
            </div>
          );
        })}
      </section>
      <button
        className="bg-white py-3 px-6 text-purple-1 font-bold border border-purple-1.5 rounded-lg"
        onClick={saveText}
      >
        Save
      </button>
    </div>
  );
};

export default EventRisk;
