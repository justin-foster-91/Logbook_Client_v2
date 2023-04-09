import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import PowerCoreSelections from "./PowerCoreSelections";
import { CustomShipContext } from "../Context/shipContext";

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
      <h3>{currentPart.name.toUpperCase()}</h3>

      {size === "Supercolossal" &&
        <div className="note">
          **A Supercolossal ship may have up to 5 Colossal sized cores OR 1 Supercolossal core with up to 4 Huge/Gargantuan cores.**
        </div>
      }

      <PowerCoreSelections></PowerCoreSelections>

      <div className="row totals">
        <div>PCU Budget: {pcuProvided}</div>
        <div>BP Cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetPowerCore;
