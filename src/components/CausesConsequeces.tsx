import { callRenderTitleDescription } from "@/utils";
import React from "react";

interface CCProps {
  items: string[];
  pluralTitle: string;
  singularTitle: string;
  postFix: string;
}
const CausesConsequeces = ({
  items,
  pluralTitle,
  singularTitle,
  postFix,
}: CCProps) => {
  const renderCausesConsequences = ({
    items,
    pluralTitle,
    singularTitle,
    postFix,
  }: CCProps) => {
    return (
      <>
        {callRenderTitleDescription(pluralTitle, singularTitle, items, postFix)}
      </>
    );
  };
  return (
    <div>
      {renderCausesConsequences({ items, pluralTitle, singularTitle, postFix })}
    </div>
  );
};

export default CausesConsequeces;
