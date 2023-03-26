import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function SetTier() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { tierId } = customShipParts;
  const { buildPoints, hpIncrementMultiplier } = Tables.getTierData(tierId);

  const handleTierChange = (ev) => {
    const tierOption = ev.target.value;

    ship.setTier(tierOption)
  };

  return (
    <>
      <h3>Tier</h3>

      <p></p>

      <select value={tierId} onChange={handleTierChange}>
        {Tables.getTierIdList().map((tier, idx) => (
          <option key={idx}>{tier}</option>
        ))}
      </select>

      <p></p>

      <div>
        BP Budget: {buildPoints}; HP Increments: {hpIncrementMultiplier}
      </div>
    </>
  );
}

export default SetTier;
