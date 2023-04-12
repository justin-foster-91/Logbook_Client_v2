import React from 'react';
import PowerIcon from "../IconRefs/PowerIcon";
import BuildIcon from "../IconRefs/BuildIcon";

function PartTotals(props) {
  const { pcuCost, bpCost } = props;

  const renderBP = () => {
    if (bpCost !== undefined) {
      return (
        <>
          <BuildIcon />
          <div>{bpCost}</div>
        </>
      );
    }
  }

  const renderPCU = () => {
    if (pcuCost !== undefined) {
      return (
        <>
          <PowerIcon />
          <div>{pcuCost}</div>
        </>
      );
    }
  }

  console.log({ pcuCost, bpCost });

  return (
    <div className="row totals">
      {renderPCU()}
      {renderBP()}
    </div>
  );
}

export default PartTotals;