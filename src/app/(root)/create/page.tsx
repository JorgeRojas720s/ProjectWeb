"use client";
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";

function Page() {
  const AMOUNT_TEXTAREAS = 10;

  const [textAreaValues, setTextAreaValues] = useState(
    Array.from({ length: AMOUNT_TEXTAREAS }, () => "")
  );

  const textAreas = Array.from(
    { length: AMOUNT_TEXTAREAS },
    (_, index) => index
  );
  
  const placeholders = [
    "hola",
    "hola2",
    "hola3",
    "hola4",
    "hola5",
    "hol6a",
    "hola7",
    "hol8a",
    "hol9a",
    "hol23a",
  ];

  function handleTextAreaChange(
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const newValues = [...textAreaValues]; //pa crear una copia, buena practica de react
    newValues[id] = event.target.value;
    setTextAreaValues(newValues);
  }

  function clickSend() {
    console.log("enviando infooooooo");
    console.log("Contenido de los textareas:", textAreaValues);
  }

  return (
    <div className="flex justify-center">
      <div className="w-auto m-8 bg-[#001925] p-8 border-l-4 border-purple-1 rounded-r-2xl">
        <div className="form">
          <span className="block text-white text-2xl font-bold mb-6">
            Formulario de Eventos
          </span>
          <section className="flex flex-wrap gap-x-20 justify-center">
            {textAreas.map((id) => (
              <GenericTextArea
                key={id}
                id={id}
                placeholder={placeholders[id]}
                rows={10}
                cols={30}
                value={textAreaValues[id]}
                onChange={(event) => handleTextAreaChange(id, event)}
              />
            ))}
          </section>

          {/* ------ */}
          <div className="flex gap-4">
            <div
              className="flex-1 bg-purple-1 py-3 text-center text-[#001925] font-bold 
            transition-all duration-200 ease-in-out hover:bg-transparent hover:border hover:border-purple-1 hover:text-purple-1"
              onClick={clickSend}
            >
              Enviar
            </div>
            <div className="flex-[0.3] drop-shadow-md">
              <div className="bg-[#001925] py-3 text-center text-purple-1 font-bold transition-all duration-200 ease-in-out hover:bg-purple-1 hover:text-[#001925]">
                Limpar
              </div>
            </div>
          </div>
          {/* ----- */}
        </div>
      </div>
    </div>
  );
}

export default Page;
