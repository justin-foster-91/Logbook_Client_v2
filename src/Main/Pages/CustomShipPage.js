import React, { useEffect, useState, useContext } from "react";
import SetTier from "../ShipPartSetters/SetTier";
import SetFrame from "../ShipPartSetters/SetFrame";
import SetPowerCore from "../ShipPartSetters/SetPowerCore";
import * as SF from "../References/shipFunctions";
import SetThrusters from "../ShipPartSetters/SetThrusters";
import SetArmor from "../ShipPartSetters/SetArmor";
import { CustomShipContext } from "../Context/shipContext";
import SetComputer from "../ShipPartSetters/SetComputer";
import * as Tables from '../References/metaTables'
import SetCrewQuarters from "../ShipPartSetters/SetCrewQuarters";

function CustomShipPage() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { tierId, powerCoreIds } = customShipParts

  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = powerCoreIds.map(core => Tables.getPowerCoreData(core).pcuProvided).reduce((total, num) => total + num)

  // useEffect(() => {
  //   console.log(validateShip(customShipParts));
  // });

  // TODO: noneToNull() not working

  // TODO: move the bonus splitter to ship functions
  // TODO: cleanup capitalize function from utils
  // TODO: cleanup split on '-' in capitalizeEachWord
  // TODO: change all defaultValues
  // TODO: make handleChanges consistent

  // TODO: make all changes to customShipParts a setter function

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
        <SetPowerCore></SetPowerCore>
        <SetThrusters></SetThrusters>
        <SetArmor></SetArmor>
        <SetComputer></SetComputer>
        <SetCrewQuarters></SetCrewQuarters>
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
      {showJSON && 
      <pre style={{
        textAlign: 'left', 
        width: '300px', 
        height: '300px',
        margin: '0 auto'
      }}>{JSON.stringify(customShipParts, null, 2)}
      </pre>}
    </div>
  );
}

export default CustomShipPage;
