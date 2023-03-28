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
import Sidebar from "../Components/Sidebar";
import "./CustomShipPage.css";

function CustomShipPage() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { tierId, powerCoreIds } = customShipParts

  const size = ship.getSize()

  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  // useEffect(() => {
  //   console.log(validateShip(customShipParts));
  // });



  //SetWeapon Fighter - forward arc (2 light [1 must be a tracking weapon])

  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  let setterList = [ 
    {comp: SetTier, name: "Tier"}, 
    {comp: SetFrame, name: "Frame"}, 
    {comp: SetPowerCore, name: "Power Core"}, 
    {comp: SetThrusters, name: "Thrusters"},
    {comp: SetArmor, name: "Armor"}, 
    {comp: SetComputer, name: "Computer"},
    {comp: SetCrewQuarters, name: "Crew Quarters"}, 
    {comp: SetDefensiveCounter, name: "Defensive Counter"},
    {comp: SetDriftEngine, name: "Drift Engine"},
    {comp: SetExpansionBays, name: "Expansion Bays"},
    {comp: SetFortifiedHull, name: "Fortified Hull"},
    {comp: SetReinforcedBulkheads, name: "Reinforced Bulkheads"},
    {comp: SetSecurity, name: "Security"},
  ]

  return (
    <>
      <Sidebar setterList={setterList}></Sidebar>
      <div className="customShipDisplay">
        <h2>Custom Ship Page</h2>

        <div className="partSetterList">
          {setterList.map((part, idx) => {
            const Setter = part.comp;
            return (
              <div id={part.name} className="partSetterBlock" key={idx}>
                <Setter currentPart={part}></Setter>
              </div>
            );
          })}
        </div>

        <br />
        <br />
        <p>
          BP used: {totalBPCosts}; BP Budget: {totalBPBudget}
        </p>
        <p>
          PCU used: {totalPCUCosts}; PCU Essentials: {essentialPCUCosts}; PCU
          Budget: {totalPCUBudget}
        </p>
        <button onClick={() => printJSON()}>JSON ME</button>
        <br />

        {showJSON && (
          <pre
            style={{
              textAlign: "left",
              width: "300px",
              height: "300px",
              margin: "0 auto",
            }}
          >
            {JSON.stringify(customShipParts, null, 2)}
          </pre>
        )}
      </div>
    </>
  );
}

export default CustomShipPage;
