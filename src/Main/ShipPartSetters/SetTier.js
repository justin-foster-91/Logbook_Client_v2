import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function SetTier(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { tierId } = customShipParts;
  const { buildPoints, hpIncrementMultiplier } = Tables.getTierData(tierId);
  const { currentPart } = props;
  

  const handleTierChange = (ev) => {
    const tierOption = ev.target.value;

    ship.setTier({ reference: 'tierId', value: tierOption})
  };

  return (
    <>
      <h3>{currentPart.name.toUpperCase()}</h3>

      <select value={tierId} onChange={handleTierChange}>
        {Tables.getTierIdList().map((tier, idx) => (
          <option key={idx}>{tier}</option>
        ))}
      </select>

      <div className="row totals">
        <div>BP Budget: {buildPoints}</div> 
        <div>HP Increments: {hpIncrementMultiplier}</div>
      </div>
    </>
  );
}

export default SetTier;
