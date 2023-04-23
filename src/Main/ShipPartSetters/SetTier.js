import React, { useContext } from "react";
import * as Tables from "./CustomRefs/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "./Components/PartTitle";
import BuildIcon from "../IconRefs/BuildIcon";

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
