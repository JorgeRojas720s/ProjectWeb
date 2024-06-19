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
  const renderCausesConsequences = () => {
    return (
      <>
        {callRenderTitleDescription(pluralTitle, singularTitle, items, postFix, true)}
      </>
    );
  };
  return (
    <div>
      {renderCausesConsequences()}
    </div>
  );
};

export default CausesConsequeces;
