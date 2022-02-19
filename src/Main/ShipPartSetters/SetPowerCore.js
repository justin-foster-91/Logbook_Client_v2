import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import PowerCoreSelections from "./PowerCoreSelections";
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";

function SetPowerCore() {
  const { customShipParts } = useContext(CustomShipContext);
  const { powerCoreIds } = customShipParts;
  const { size } = SF.getFramePackageFromShip(customShipParts);

  const pcuProvided = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu);

  const bpCost = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp);

  return (
    <>
      <h3>Power Core</h3>

      <p></p>
      {size === "Supercolossal" &&
        "**A Supercolossal ship may have up to 5 Colossal sized cores OR 1 Supercolossal core with up to 4 Huge/Gargantuan cores.**"}
      <p></p>

      <PowerCoreSelections></PowerCoreSelections>

      <p></p>

      <div>PCU Budget: {pcuProvided}</div>
      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetPowerCore;
