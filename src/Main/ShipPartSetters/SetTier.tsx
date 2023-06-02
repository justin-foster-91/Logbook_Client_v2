import React, { useContext } from "react";
import * as Tables from "./CustomRefs/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "./Components/PartTitle";
import BuildIcon from "../IconRefs/BuildIcon";
import AccordionText from "./Components/AccordionText";
import { SetterProps } from "./CustomRefs/customInterface";

function SetTier(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { tierId } = customShipParts;
  const { buildPoints, hpIncrementMultiplier } = Tables.getTierData(tierId);
  const { currentPart } = props;
  
  const handleTierChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const tierOption = ev.target.value;

    ship.setTier(tierOption)
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <>
          <p>This is the designation of the starship and its power level. </p>
          <p>If you are creating a PC starship, determine the characters' APL by adding together the characters' levels and dividing by the number of characters. That number is their ship's tier.</p>
          <p>If designing enemy starships, decide the difficulty of the encounter (see Designing Starship Encounters on page 326) and choose the enemy ship's tier.</p>
        </>
      </AccordionText>

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
