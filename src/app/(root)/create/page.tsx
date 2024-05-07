"use client";
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";

const CATEGORIES = ["causa", "consecuencia", "riesgo"];

function Page() {
  const [textAreas, setTextAreas] = useState<{ [key: string]: string[] }>({
    causa: [""],
    consecuencia: [""],
    riesgo: [""],
  });

  function addTextArea(category: string) {
    setTextAreas((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
    
  };


  
  function handleTextAreaChange( category: string, index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ){
    console.log("categoryyyyyyy:", category)
    const updatedAreas = [...textAreas[category]]; 
    updatedAreas[index] = event.target.value;
    setTextAreas((prev) => ({
      ...prev,
      [category]: updatedAreas, 
    }));
  };

  const clickSend = () => {
    console.log("Toda la infiooooo: ", textAreas);
  };

  return (
    <div className="flex justify-center">
      <div className="w-auto m-8 bg-[#001925] p-8 border-l-4 border-purple-1 rounded-r-2xl">
        <span className="block text-white text-2xl font-bold mb-6">
          Formulario de Eventos
        </span>




        {/* ------------ */}
        <div className="flex justify-around mb-6">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              className="bg-white"
              onClick={() => addTextArea(category)}
            >
              {CATEGORIES[index]}
            </button>
          ))}
        </div>



        {CATEGORIES.map((category) => {
          return (
            <div key={category}>
              {/* <h2 className="text-white">{CATEGORIES[index]}</h2> */}
              <h2 className="text-white">+++++++++++++++++++++</h2>
              <section className="flex flex-wrap gap-x-20 justify-center mt-6">
                {textAreas[category].map((_, id) => (
                  <div key={id} className="flex flex-col items-start">
                    <GenericTextArea
                      id={id}
                      placeholder={`${
                        category.charAt(0).toUpperCase() + category.slice(1)
                      } ${id + 1}`}
                      rows={10}
                      cols={30}
                      onChange={(event) =>
                        handleTextAreaChange(category, id, event)
                      }
                    />
                  </div>
                ))}
              </section>
            </div>
          );
        })}
        {/* ------------ */}





        <div className="flex gap-4 mt-6">
          <div
            className="flex-1 bg-purple-1 py-3 text-center text-[#001925] font-bold"
            onClick={clickSend}
          >
            Enviar
          </div>
          <div className="flex-[0.3] drop-shadow-md">
            <div className="bg-[#001925] py-3 text-center text-purple-1 font-bold">
              Limpiar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
