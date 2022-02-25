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
import SetDefensiveCounter from "../ShipPartSetters/SetDefensiveCounter";
import SetDriftEngine from "../ShipPartSetters/SetDriftEngine";
import SetExpansionBays from "../ShipPartSetters/SetExpansionBays";
import SetFortifiedHull from "../ShipPartSetters/SetFortifiedHull";
import SetReinforcedBulkheads from "../ShipPartSetters/SetReinforcedBulkheads";
import SetSecurity from '../ShipPartSetters/SetSecurity'

function CustomShipPage() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { tierId, powerCoreIds } = customShipParts

  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  // useEffect(() => {
  //   console.log(validateShip(customShipParts));
  // });

  // DESTRUCTURING

  // TODO: updateExpansionBaysToMatchFrame return error


  // TODO: cleanup capitalize function from utils
  // TODO: organize shipFunctions

  // TODO: render only 3 expansion dropdowns unless there are more in the expansionIds array
  // TODO: Show allowed expansion counter. Give button to add a new expansion dropdown
  // TODO: conditionally render SetExpansionBays based off of expansion count
  // TODO: remove the priming expansion array with set length
  // TODO: empty expansions function as cargo holds

  // TODO: flexible accordion component for long descriptions
  // TODO: mystery -- how did temp hp on the 4 arcs get in the url?

  //SetWeapon Fighter - forward arc (2 light [1 must be a tracking weapon])

  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  let setterList = [ 
    SetTier, 
    SetFrame, 
    // SetPowerCore, 
    // SetThrusters,
    // SetArmor, 
    // SetComputer,
    // SetCrewQuarters, 
    // SetDefensiveCounter,
    // SetDriftEngine,
    SetExpansionBays,
    // SetFortifiedHull,
    // SetReinforcedBulkheads,
    // SetSecurity,
  ]

  return (
    <div className="customShipDisplay">
      <h2>Custom Ship Page</h2>

      <div className="partSetterList">
        {setterList.map((Setter, idx) => {
          return (
            <div className="partSetterBlock" key={idx}>
              <Setter></Setter>
            </div>
          )
        })}
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
