// @ts-nocheck
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";
import { TextCursor } from "lucide-react";

const CATEGORIES = ["Causa", "Consecuencia"];

const InputCauseAndConsequence = ({
  cont,
  principalTextAreas,
  principalSetTextAreas,
  bandera,
}) => {

  const [textAreas, setTextAreas] = useState({
    causa: [""],
    consecuencia: [""],
  });

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
              <button onClick={() => saveText()}> save</button>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InputCauseAndConsequence;
