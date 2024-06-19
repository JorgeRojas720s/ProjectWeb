// @ts-nocheck
import React, { useState } from "react";
import GenericCard from "./GenericCard";
import GenericTextArea from "./GenericTextArea";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const EventAction = ({ principalSetTextAreas }) => {
  const CATEGORIES = [
    "Accion Propuesta",
    "Acciones seleccionadas segun la disponibilidad de recursos",
    "Responsable",
    "Indicador",
  ];
  const [date, setDate] = useState("");
  const [textAreas, setTextAreas] = useState({
    accionpropuesta: [""],
    accionesseleccionadassegunladisponibilidadderecursos: [""],
    responsable: [""],
    indicador: [""],
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

  const saveText = () => {
    console.log("que tueneeeeeeeeeeeeee", date);

    const newEventAction = {
      proposedAction: textAreas.accionespropuestas,
      selectedActions:
        textAreas.accionesseleccionadassegunladisponibilidadderecursos,
      responsible: textAreas.responsable,
      indicator: textAreas.indicador,
      date: date,
    };

    principalSetTextAreas((prev) => ({
      ...prev,
      eventAction: [...prev.eventAction, newEventAction],
    }));

    console.log("dataaaaa 😵‍💫😵‍💫", textAreas);
  };

  return (
    <div>
      <section>
        {CATEGORIES.map((Category, index) => {
          const categoryAux = Category.toLowerCase();
          const category = Category.toLowerCase().replace(/\s/g, "");
          console.log("waoo 👽👽: ", category);
          return (
            <div key={category}>
              {category === "responsable" ? (
                <section className="mb-3">
                  <p className="text-purple-2 text-2xl font-bold my-4">
                    Plan de seguimiento a las acciones
                  </p>
                </section>
              ) : (
                <></>
              )}
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
                      placeholder={
                        `${CATEGORIES[index]}` +
                        `${
                          category ===
                          "accionesseleccionadassegunladisponibilidadderecursos"
                            ? ` ${id + 1}`
                            : ""
                        }`
                      }
                      rows={10}
                      cols={30}
                      onChange={(event) =>
                        handleTextAreaChange(category, id, event)
                      }
                    />
                  </div>
                ))}

                {category ===
                "accionesseleccionadassegunladisponibilidadderecursos" ? (
                  <div className="flex justify-center h-[100px] xl:w-[200px] lg:w-[200px] md:w-[200px] pl-3 sm:w-fit m-5 transition-all duration-200 ease-in-out focus:border-l-8 focus:border-purple-1 rounded-lg border border-purple-1">
                    <button
                      className="text-purple-1 justify-center flex h-fit text-8xl"
                      onClick={() => addTextArea(category)}
                    >
                      {"+"}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </section>
            </div>
          );
        })}
      </section>
      <div className="ml-28 mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Basic date picker"
              onChange={(newDate) => {
                const formattedDate = newDate
                  ? dayjs(newDate).format("YYYY-MM-DD")
                  : "";
                setDate(formattedDate);
              }}
            />
            {console.log("date de abajo: ", date)}
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <button
        className="bg-white py-3 px-6 text-purple-1 font-bold border border-purple-1.5 rounded-lg"
        onClick={saveText}
      >
        Save
      </button>
    </div>
  );
};

export default EventAction;
