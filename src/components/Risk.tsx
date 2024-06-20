import { callRenderTitleDescription, renderItems, renderTitle } from "@/utils";
import React from "react";

interface CategoryDescription {
  category: string;
  description: string;
}

interface RiskItem {
  classification: string;
  categoryXDescription: CategoryDescription[];
}

interface Item {
  risk: RiskItem[];
}

interface RiskProps {
  items: Item[];
  pluralTitle: string;
  singularTitle: string;
  index: number;
}

const Risk = ({ items, pluralTitle, singularTitle, index }: RiskProps) => {
  const renderCateogryDescription = (items: CategoryDescription[]) => {
    return (
      <div>
        {items.length > 0
          ? items.map((cxd, index: number) => {
              return (
                <div key={index} className="ml-4">
                  {callRenderTitleDescription(
                    "Categorías",
                    "Categoría",
                    cxd.category,
                    "rcg_category", 
                    true
                  )}

                  {callRenderTitleDescription(
                    "Descripciones",
                    "Descripción",
                    cxd.description,
                    "rdc_description", 
                    true
                  )}
                  <br />
                </div>
              );
            })
          : ""}
      </div>
    );
  };

  const risks = items[index]?.risk || [];
  return (
    <>
      {renderTitle(pluralTitle, singularTitle, risks)}
      <div>
        {risks.length > 0 ? (
          risks.map((obj: RiskItem, index: number) => {
            return (
              <div key={index} className="ml-4">
                {renderTitle("Clasificaciones", "Clasificación", obj)}
                <div>
                  {renderItems(obj.classification, "rcf_classification", true)}
                  {renderCateogryDescription(obj.categoryXDescription)}
                </div>
              </div>
            );
          })
        ) : (
          <p>{` No tiene`}</p>
        )}
      </div>
    </>
  );
};

export default Risk;
