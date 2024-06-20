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
  const [isSaved, setIsSaved] = useState(false);
  const [date, setDate] = useState("");
  const [compliance, setCompliance] = useState("Parcial");
  const [justification, setJustification] = useState("");
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
      proposedAction: textAreas.accionpropuesta,
      selectedActions:
        textAreas.accionesseleccionadassegunladisponibilidadderecursos,
      responsible: textAreas.responsable,
      indicator: textAreas.indicador,
      date: date,
      compliance: compliance,
      justification: justification,
    };

    console.log("wtfffffffffff 🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶: ", newEventAction);

    principalSetTextAreas((prev) => ({
      ...prev,
      eventAction: [...prev.eventAction, newEventAction],
    }));
    setIsSaved(true);

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

      <div className="my-5">
        <label className="text-purple-2 text-2xl font-bold my-4">
          Cumplimiento
        </label>
        <select
          value={compliance}
          onChange={(e) => setCompliance(e.target.value)}
          className="form-select mt-1 block w-40 h-10 rounded-lg border-2 border-purple-500 pl-2"
        >
          <option value="Parcial">Parcial</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label className="text-purple-2 text-2xl font-bold my-4">
          Justificacion
        </label>
        <GenericTextArea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder="Escribe aquí"
          className="form-textarea mt-1 block w-full"
          rows={4}
        />
      </div>

      <button
        className="bg-white py-3 px-6 text-purple-1 font-bold border border-purple-1.5 rounded-lg"
        onClick={saveText}
      >
        Save
        {isSaved && <span className="ml-2 text-green-500">&#10003;</span>}
      </button>
    </div>
  );
};

export default EventAction;
