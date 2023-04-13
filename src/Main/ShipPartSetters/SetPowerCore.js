import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import PowerCoreSelections from "../Components/PowerCoreSelections";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import PowerIcon from "../IconRefs/PowerIcon";
import PartTotals from "../Components/PartTotals";

function SetPowerCore(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { powerCoreIds } = customShipParts;
  const size = ship.getSize();
  const { currentPart } = props;

  const pcuProvided = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu);

  const bpCost = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp);

  return (
    <>
      <PartTitle currentPart={currentPart} />

      {size === "Supercolossal" &&
        <div className="note">
          A Supercolossal ship may have either: 
          <ul>
            <li>Up to 5 Colossal sized cores</li>
            <li>1 Supercolossal core with up to 4 Huge/Gargantuan cores.</li>
          </ul>
        </div>
      }

      <PowerCoreSelections></PowerCoreSelections>

      <div className="row">
        <PowerIcon />
        <div><strong>PCU Budget</strong>: {pcuProvided}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetPowerCore;
