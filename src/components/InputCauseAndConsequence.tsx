// @ts-nocheck
import React, { useState } from "react";
import GenericTextArea from "@/components/GenericTextArea";
import GenericCard from "@/components/GenericCard";

const CATEGORIES = ["Causa", "Consequencia"];

const InputCauseAndConsequence = () => {
  const [textAreas, setTextAreas] = useState({
    //pasar causa y consequencia por parametro
    causa: [""],
    consequencia: [""],
  });

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
                    // onChange={(event) =>
                    //   handleTextAreaChange("causesAndConsequences", id, event)
                    // }
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
    </div>
  );
};

export default InputCauseAndConsequence;
