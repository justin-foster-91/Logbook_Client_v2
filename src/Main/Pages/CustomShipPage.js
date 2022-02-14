import React, { useEffect, useState, useContext } from "react";
import SetTier from "../ShipPartSetters/SetTier";
import SetFrame from "../ShipPartSetters/SetFrame";
import SetPowerCore from "../ShipPartSetters/SetPowerCore";
import { validateShip, getTotalBPCosts, getTotalPCUCosts, getEssentialPCUCosts } from "../References/shipFunctions";
import SetThrusters from "../ShipPartSetters/SetThrusters";
import SetArmor from "../ShipPartSetters/SetArmor";
import { CustomShipContext } from "../Context/shipContext";
import SetComputer from "../ShipPartSetters/SetComputer";
import { getTierData, getPowerCoreData } from '../References/metaTables'

function CustomShipPage() {
  const { customShipParts } = useContext(CustomShipContext);
  const { tierId, powerCoreIds } = customShipParts

  const totalBPCosts = getTotalBPCosts(customShipParts)
  const totalBPBudget = getTierData(tierId).buildPoints

  const totalPCUCosts = getTotalPCUCosts(customShipParts)
  const essentialPCUCosts = getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = powerCoreIds.map(core => getPowerCoreData(core).pcuProvided).reduce((total, num) => total + num)

  useEffect(() => {
    console.log(validateShip(customShipParts));
  });


  // defaultShip -- 'has' section using 0's and 1's
  // TODO: make all changes to customShipParts a setter function
  // TODO: SetComputer supercolossal exception


  // TODO: create more Ship class methods
  // TODO: customShip => customizeShip


  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  return (
    <div className="customShipDisplay">
      <h2>Custom Ship Page</h2>

      <div className="partSetterBlock">
        <SetTier></SetTier>
        <SetFrame></SetFrame>
        {/* <SetPowerCore></SetPowerCore>
        <SetThrusters></SetThrusters>
        <SetArmor></SetArmor> */}
        <SetComputer></SetComputer>
      </div>

      <br/>
      <br/>
      <p>
        BP used: {totalBPCosts}; BP Budget: {totalBPBudget}
      </p>
      <p>
        PCU used: {totalPCUCosts}; PCU Essentials: {essentialPCUCosts}; PCU Budget: {totalPCUBudget}
      </p>
      <button onClick={() => printJSON()}>JSON ME</button>
      <br />
      {showJSON && JSON.stringify(customShipParts, null, 1)}
    </div>
  );
}

export default CustomShipPage;
