// @ts-nocheck
import React, { useState } from 'react'
import GenericCard from './GenericCard';
import GenericTextArea from './GenericTextArea';

interface ActionProps {
  eventTitle: string;
  eventDesription:string;
}

const EventAction = ({eventTitle,eventDesription}:ActionProps) => {

  const CATEGORIES = ["Accion"];

  const [textAreas, setTextAreas] = useState({
    accion: [""],
  });

  
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
  };

  return (
    <section>
    {CATEGORIES.map((Category, index) => {
      const category = Category.toLowerCase();
      return (
        <div key={category}>

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
  )
}

export default EventAction