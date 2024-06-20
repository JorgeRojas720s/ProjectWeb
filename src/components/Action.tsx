//@ts-nocheck
import { callRenderTitleDescription, renderTitle } from "@/utils";
import React from "react";

interface ActionsProps {
  items: any[];
  index: number;
}

interface PlanProps {
  endActionPlan: otherProps[];
  followUpPlan: any[];
}

interface otherProps {
  endActionPlan: any[];
  proposedAction: any[];
}

interface TagsArrayProps {
  name: string;
  tag: string;
}

interface RenderPlanProps {
  plural: string;
  singular: string;
  items: any[];
  tagsArray: TagsArrayProps[];
  className: string;
}

const Action = ({ items, index }: ActionsProps) => {
  let tags = [
    {
      pluralName: "Acciones Propuestas",
      singularName: "Acción Propuesta",
      tag: "pda_action",
      arrayTag: "proposedAction",
    },
    {
      pluralName: "Acciones Seleccionadas",
      singularName: "Acción Seleccionada",
      tag: "sda_action",
      arrayTag: "selectedAction",
    },
  ];

  let followUpPlanTags = [
    { name: "Fecha", tag: "fpp_date" },
    { name: "Responsable", tag: "fpp_id_responsible" },
    { name: "Indicador", tag: "fpp_indicator" },
  ];

  let endActionPlanTags = [
    { name: "Cumplimiento", tag: "eap_compilance" },
    { name: "Justificación", tag: "eap_justification" },
  ];

  const renderPlan = ({
    plural,
    singular,
    items,
    tagsArray,
    className,
  }: RenderPlanProps) => {
    return (
      <div>
        <br />
        {renderTitle(plural, singular, items)}
        
        {tagsArray.map(({ name, tag }, _index) => (
          <div key={_index} className="ml-4">
            {callRenderTitleDescription(
              name,
              name,
              items,
              tag,
              false,
              `${name === 'Justificación'? '': className}`
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPlans = (plan: PlanProps) => {
    return (
      <div>
        { (
          renderPlan({
            plural: "Plan de Seguimiento",
            singular: "Plan de Seguimiento",
            items: plan.followUpPlan,
            tagsArray: followUpPlanTags,
            className: "flex flex-row",
          })
        )}
        {plan.endActionPlan.length > 0 ? (
          <div>
            {plan.endActionPlan.map((obj: otherProps, __index) => (
              <div key={__index}>
                {renderPlan({
                  plural: "Plan de Acción Terminado",
                  singular: "Plan de Acción Terminado",
                  items: obj.endActionPlan,
                  tagsArray: endActionPlanTags,
                  className: "flex flex-row",
                })}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      {renderTitle("Acciones", "Acción", items[index])}
      <div className="ml-4">
        {tags.map(({ pluralName, singularName, tag, arrayTag }, _index) => (
          <div key={_index}>
            
            {callRenderTitleDescription(
              pluralName,
              singularName,
              items[index][arrayTag],
              tag,
              true
            )}
          </div>
        ))}
        {renderPlans(items[index].plan)}
      </div>
    </div>
  );
};

export default Action;
