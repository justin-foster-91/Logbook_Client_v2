import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import PowerIcon from "../../IconRefs/PowerIcon";
import BuildIcon from "../../IconRefs/BuildIcon";

function PartTotals(props) {
  const { ship, customShipParts } = useContext(CustomShipContext);

  const { part, pcuCost, bpCost, note } = props;

  const renderBP = () => {
    if (bpCost === undefined) return;

    return (
      <div className='iconPair'>
        <BuildIcon />
        <div>{bpCost}</div>
      </div>
    );
  }

  const renderPCU = () => {
    if (pcuCost === undefined) return;

    return (
      <div className='iconPair'>
        <PowerIcon />
        <div>{pcuCost}</div>
      </div>
    );
  }

  return (
    <div className="row totals">
      {note}
      {renderPCU()}
      {renderBP()}
    </div>
  );
}

export default PartTotals;