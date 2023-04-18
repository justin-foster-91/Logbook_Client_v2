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
import PointTotals from "../Components/PointTotals";

function CustomShipPage() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [partHighlight, setPartHighlight] = useState();

  //SetWeapon Fighter - forward arc (2 light [1 must be a tracking weapon])

  // https://www.aonsrd.com/Rules.aspx?ID=183


  const handleScroll = () => {
    let allPartBlocks = document.getElementsByClassName("partSetterBlock")
    let highestPartBlockId = null;

    Array.from(allPartBlocks).every(block => {
      let blockTitle = block.querySelector("h3")
      let blockTitleY = blockTitle.getBoundingClientRect().y;

      if (blockTitleY < 0) return true;

      highestPartBlockId = block.id
      setPartHighlight(highestPartBlockId)
      return false;
    })
  };
  
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  let setterList = [ 
    {component: SetTier, name: "Tier"}, 
    {component: SetFrame, name: "Frame"}, 
    {component: SetPowerCore, name: "Power Core"}, 
    {component: SetThrusters, name: "Thrusters"},
    {component: SetArmor, name: "Armor"}, 
    {component: SetComputer, name: "Computer"},
    {component: SetCrewQuarters, name: "Crew Quarters"}, 
    {component: SetDefensiveCounter, name: "Defensive Countermeasures"},
    {component: SetDriftEngine, name: "Drift Engine"},
    {component: SetExpansionBays, name: "Expansion Bays"},
    {component: SetFortifiedHull, name: "Fortified Hull"},
    {component: SetReinforcedBulkheads, name: "Reinforced Bulkheads"},
    {component: SetSecurity, name: "Security"},
  ]

  return (
    <>
      <Sidebar setterList={setterList} partHighlight={partHighlight}></Sidebar>
      <main className="customShipDisplay" id="customShipDisplay">
        <h1 className="top">Custom Ship</h1>

        <div className="partSetterList">
          {setterList.map((part, idx) => {
            const Setter = part.component;
            return (
              <section id={part.name} className="partSetterBlock" key={idx}>
                <Setter currentPart={part}></Setter>
              </section>
            );
          })}
        </div>

        <PointTotals layout={"full"}/>

        <button onClick={() => printJSON()}>JSON ME</button>

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
      </main>
    </>
  );
}

export default CustomShipPage;
