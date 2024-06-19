// @ts-nocheck
import React, { useState } from "react";
import GenericCard from "./GenericCard";
import GenericTextArea from "./GenericTextArea";

const EventControl = ({ principalSetTextAreas }) => {
  const [probabilidad, setProbabilidad] = useState(0);
  const [impacto, setImpacto] = useState(0);
  const [nivelRiesgo, setNivelRiesgo] = useState("Bajo");
  const [medidasControl, setMedidasControl] = useState("");
  const [actitud, setActitud] = useState("");
  const [aptitud, setAptitud] = useState("");
  const [nivelRiesgoFinal, setNivelRiesgoFinal] = useState("Bajo");
  const [parametroAceptabilidad, setParametroAceptabilidad] =
    useState("Se Acepta");

  const saveControlData = () => {
    const newControlData = {
      probabilidad,
      impacto,
      nivelRiesgo,
      medidasControl,
      actitud,
      aptitud,
      nivelRiesgoFinal,
      parametroAceptabilidad,
    };

    principalSetTextAreas((prev) => ({
      ...prev,
      controlData: [...prev.controlData, newControlData],
    }));

    console.log("Control Data: ", newControlData);
  };

  return (
    <div>
      <section>
        <div className="grid gap-4">
          <div className="flex gap-20 shrink-0">
            <div className="w-1/4">
              <label className="text-purple-2 text-2xl font-bold my-4">Probabilidad</label>
              <input
                type="number"
                min="0"
                max="10"
                value={probabilidad}
                onChange={(e) => setProbabilidad(Number(e.target.value))}
                className="form-input mt-1 block w-6/12 rounded-lg border-2 border-purple-500 pl-2"
              />
            </div>

            <div className="w-1/4">
              <label className="text-purple-2 text-2xl font-bold my-4">Impacto</label>
              <input
                type="number"
                min="0"
                max="10"
                value={impacto}
                onChange={(e) => setImpacto(Number(e.target.value))}
                className="form-input mt-1 block w-6/12 rounded-lg border-2 border-purple-500 pl-2"
              />
            </div>
          </div>

          <div>
            <label className="text-purple-2 text-2xl font-bold my-4">Nivel de Riesgo</label>
            <select
              value={nivelRiesgo}
              onChange={(e) => setNivelRiesgo(e.target.value)}
              className="form-select mt-1 block w-40 rounded-lg border-2 border-purple-500 pl-2"
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div>
            <label className="text-purple-2 text-2xl font-bold my-4">
              Medidas de Control Existentes
            </label>
            <GenericTextArea
              value={medidasControl}
              onChange={(e) => setMedidasControl(e.target.value)}
              placeholder="Escribe aquí"
              className="form-textarea mt-1 block w-full"
              rows={4}
            />
          </div>

          <div className="flex gap-20">
            <div className="w-1/4">
              <label className="text-purple-2 text-2xl font-bold my-4">Actitud</label>
              <div className="flex">
                <button
                  className={`px-4 py-2 ${
                    actitud === "+" ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setActitud("+")}
                >
                  +
                </button>
                <button
                  className={`px-4 py-2 ${
                    actitud === "-" ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setActitud("-")}
                >
                  -
                </button>
              </div>
            </div>

            <div className="w-1/4">
              <label className="text-purple-2 text-2xl font-bold my-4">Aptitud</label>
              <div className="flex">
                <button
                  className={`px-4 py-2 ${
                    aptitud === "+" ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setAptitud("+")}
                >
                  +
                </button>
                <button
                  className={`px-4 py-2 ${
                    aptitud === "-" ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setAptitud("-")}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-purple-2 text-2xl font-bold my-4">
              Nivel de Riesgo Final
            </label>
            <select
              value={nivelRiesgoFinal}
              onChange={(e) => setNivelRiesgoFinal(e.target.value)}
              className="form-select mt-1 block w-40 h-10 rounded-lg border-2 border-purple-500 pl-2"
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div>
            <label className="text-purple-2 text-2xl font-bold my-4">
              Parámetro de Aceptabilidad
            </label>
            <select
              value={parametroAceptabilidad}
              onChange={(e) => setParametroAceptabilidad(e.target.value)}
              className="form-select mt-1 block w-40 h-10 rounded-lg border-2 border-purple-500 pl-2"
            >
              <option value="Se Acepta">Se Acepta</option>
              <option value="No Se Acepta">No Se Acepta</option>
            </select>
          </div>
        </div>
      </section>

      <button
        className="bg-white py-3 px-6 text-purple-1 font-bold border border-purple-1.5 rounded-lg mt-4"
        onClick={saveControlData}
      >
        Save
      </button>
    </div>
  );
};

export default EventControl;