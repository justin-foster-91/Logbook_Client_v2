import React from 'react';
import PowerIcon from "../IconRefs/PowerIcon";
import BuildIcon from "../IconRefs/BuildIcon";

function PartTotals(props) {
  const { part, pcuCost, bpCost, modifiedBPCost } = props;
  // how much of this can I snag from ship context?

  const renderBP = () => {
    if (bpCost !== undefined) {
      return (
        <>
          <BuildIcon />
          {/* conditional cost if Oma frame && make a text note when it happens */}
          <div>{bpCost}</div>
          <div>
            BP Cost: {modifiedBPCost ? (<>{modifiedBPCost} <em>(Oma 50% increase)</em></>) : bpCost}
          </div>
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


  return (
    <div className="row totals">
      {renderPCU()}
      {renderBP()}
    </div>
  );
}

export default PartTotals;