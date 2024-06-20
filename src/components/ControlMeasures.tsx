import { callRenderTitleDescription, renderItems, renderTitle } from "@/utils";
import React from "react";

interface ControlMeasuresProps {
  items: [];
  pluralTitle: string;
  singularTitle: string;
  index: number;
}

interface TagsProps {
  name: string;
  tag: string;
}

const ControlMeasures = ({
  items,
  pluralTitle,
  singularTitle,
  index,
}: ControlMeasuresProps) => {
  let withOutControlMeasuresTags = [
    { name: "Impacto", tag: "ctm_fcm_impact" },
    { name: "Probabilidad", tag: "ctm_fcm_probability" },
    { name: "Nivel de Riesgo", tag: "ctm_fcm_risk_level" },
  ];
  let withInControlMeasuresTags = [
    { name: "Aceptablilidad", tag: "ctm_wcm_acceptability" },
    { name: "Aptitud", tag: "ctm_wcm_aptitude" },
    { name: "Actitud", tag: "ctm_wcm_attitude" },
    { name: "Medidas Existentes", tag: "ctm_wcm_existing" },
    { name: "Nivel de Riesgo", tag: "ctm_wcm_risk_level" },
  ];

  const renderTags = (tagsArray: TagsProps[]) => {
    return (
      <div>
        {tagsArray.map(({ name, tag }, _index) => {
          return (
            <div key={_index}>
              {name === "Medidas Existentes"
                ? callRenderTitleDescription(
                    name,
                    name,
                    items[index]["control"],
                    tag,
                    false
                  )
                : callRenderTitleDescription(
                    name,
                    name,
                    items[index]["control"],
                    tag,
                    false,
                    "flex flex-row"
                  )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderTitle(pluralTitle, singularTitle, items[index])}
      <div className="ml-4">
        {renderTitle(
          "Sin control de Medidas",
          "Sin control de medida",
          items[index]
        )}
        <div className="ml-4">{renderTags(withOutControlMeasuresTags)}</div>
        {renderTitle(
          "Con control de Medidas",
          "Con control de medida",
          items[index]
        )}
        <div className="ml-4">{renderTags(withInControlMeasuresTags)}</div>
      </div>
    </div>
  );
};

export default ControlMeasures;
