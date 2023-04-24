import React, { useContext, useEffect } from "react";
import * as Tables from "./CustomRefs/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "./Components/PartTitle";
import BuildIcon from "../IconRefs/BuildIcon";

function SetTier(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { tierId } = customShipParts;
  const { buildPoints, hpIncrementMultiplier } = Tables.getTierData(tierId);
  const { currentPart } = props;
  

  useEffect(() => {
    // Running setTier on render to initialize later components that depend on the tier 
    // This may not be needed later
    ship.setTier(tierId.toString())
  }, [])
  
  const handleTierChange = (ev) => {
    const tierOption = ev.target.value;
    console.log(typeof tierOption);

    ship.setTier(tierOption)
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="tierId" className="hidden">Tier Number</label>
        <select id="tierId" value={tierId} onChange={handleTierChange}>
          {Tables.getTierIdList().map((tier, idx) => (
            <option key={idx}>{tier}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <BuildIcon/>
        <div><strong>BP Budget</strong>: {buildPoints}</div>         
        <div><strong>HP Increases</strong>: {hpIncrementMultiplier}</div>
      </div>
    </>
  );
}

export default SetTier;
