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



  // TODO: ablative armor dependency array, computer size dependency
  // TODO: why didn't sortObject() in TemplateConverter work?
  // TODO: put hyphensToSpaces() through treeTransform()
  // TODO: setCustomShipParts({ ...customShipParts }) everywhere
  // TODO: cleanup bonusSplitter()
  // TODO: file structure

  // TODO: cleanup capitalize function from utils
  // TODO: organize shipFunctions
  // TODO: cleanup sourceShort usage.

  // TODO: powerCore and thrusters should default to the first option of the select
  // TODO: add source restrictions
  // TODO: add option match checks to all ship setters
  // TODO: for unlimited expansion bay ships, default to x but allow to add more
  // TODO: expansion dropdown menu to change the tempExpansionCap to a higher value
  // TODO: conditionally render SetExpansionBays based off of expansion count
  // TODO: defaultShipSelections that don't have the correct expansion length need to be processed correctly
  
  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  let setterList = [ 
    SetTier, 
    SetFrame, 
    SetPowerCore, 
    SetThrusters,
    SetArmor, 
    SetComputer,
    SetCrewQuarters, 
    SetDefensiveCounter,
    SetDriftEngine,
    SetExpansionBays,
    SetFortifiedHull,
    SetReinforcedBulkheads,
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
