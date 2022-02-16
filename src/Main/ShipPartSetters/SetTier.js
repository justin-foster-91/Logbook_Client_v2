import React, { useContext } from "react";
import { getTierData, getTierIdList } from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { shipSetter } from '../References/shipFunctions'

function SetTier() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const { tierId } = customShipParts;

  const { buildPoints, hpIncrementMultiplier } = getTierData(tierId);

  const handleTierChange = (ev) => {
    const tierOption = ev.target.value;


    ship.setTier(tierOption)
    // shipSetter(customShipParts, "tierId", tierOption)
    // // customShipParts.tierId = tierOption;
    setCustomShipParts({ ...customShipParts });
  };

  // const shipSetter = (part, value) => {
  //   customShipParts[part] = value;
  //   setCustomShipParts({ ...customShipParts });
  // }

  return (
    <>
      <h3>Tier</h3>

      <p></p>

      <select defaultValue={tierId} onChange={handleTierChange}>
        {getTierIdList().map((tier, idx) => (
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
