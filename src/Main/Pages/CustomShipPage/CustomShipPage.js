import React, { useEffect, useState, useContext } from "react";
import SetTier from "../../ShipPartSetters/SetTier.tsx";
import SetFrame from "../../ShipPartSetters/SetFrame.tsx";
import SetPowerCore from "../../ShipPartSetters/PowerCore/SetPowerCore";
import * as SF from "../../References/shipFunctions";
import SetThrusters from "../../ShipPartSetters/SetThrusters.tsx";
import SetArmor from "../../ShipPartSetters/Armor/SetArmor.tsx";
import SetAblativeArmor from "../../ShipPartSetters/Armor/SetAblativeArmor.tsx";
import { CustomShipContext } from "../../Context/shipContext";
import SetComputer from "../../ShipPartSetters/Computer/SetComputer";
import * as Tables from '../../ShipPartSetters/CustomRefs/metaTables'
import SetCrewQuarters from "../../ShipPartSetters/SetCrewQuarters.tsx";
import SetDefensiveCounter from "../../ShipPartSetters/SetDefensiveCounter.tsx";
import SetDriftEngine from "../../ShipPartSetters/SetDriftEngine.tsx";
import SetExpansionBays from "../../ShipPartSetters/ExpansionBays/SetExpansionBays";
import SetFortifiedHull from "../../ShipPartSetters/Armor/SetFortifiedHull.tsx";
import SetReinforcedBulkheads from "../../ShipPartSetters/Armor/SetReinforcedBulkheads.tsx";
import SetSecurity from '../../ShipPartSetters/Security/SetSecurity'
import Sidebar from "./Sidebar";
import "./CustomShipPage.css";
import PointTotals from "../../ShipPartSetters/Components/PointTotals";
import SetSensors from "../../ShipPartSetters/SetSensors.tsx";
import SetSources from "../../ShipPartSetters/SetSources.tsx";
import SetShields from "../../ShipPartSetters/SetShields.tsx";

function CustomShipPage() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [partHighlight, setPartHighlight] = useState();
  let test;

  //SetWeapon Fighter - forward arc (2 light [1 must be a tracking weapon])

  // https://www.aonsrd.com/Rules.aspx?ID=183

  // TODO: show the ship stat block in sidebar or at bottom of page
  // TODO: collapse expansion listings in stat block by type e.x. (Cargo Hold x7)


  const handleScroll = () => {
    // TODO: Find a React way to do this, probably with useRef
    let allPartBlocks = document.getElementsByClassName("partSetterBlock")
    let highestPartBlockId = null;

    Array.from(allPartBlocks).every(block => {
      let blockTitle = block.querySelector("h3")
      if (!blockTitle) throw new Error ("No h3 found in partSetterBlock")
      let blockTitleY = blockTitle.getBoundingClientRect().y;

      if (blockTitleY < 0) return true;

      highestPartBlockId = block.id
      setPartHighlight(highestPartBlockId)
      return false;
    })
  };  
  
  useEffect(() => {
    test = "blah"
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
    {component: SetSources, name: "Sources"},
    {component: SetTier, name: "Tier"}, 
    {component: SetFrame, name: "Frame"}, 
    {component: SetPowerCore, name: "Power Core"}, 
    {component: SetThrusters, name: "Thrusters"},
    {component: SetArmor, name: "Armor"}, 
    {component: SetAblativeArmor, name: "Ablative Armor"},
    {component: SetComputer, name: "Computer"},
    {component: SetCrewQuarters, name: "Crew Quarters"}, 
    {component: SetDefensiveCounter, name: "Defensive Countermeasures"},
    {component: SetDriftEngine, name: "Drift Engine"},
    {component: SetExpansionBays, name: "Expansion Bays"},
    {component: SetFortifiedHull, name: "Fortified Hull"},
    {component: SetReinforcedBulkheads, name: "Reinforced Bulkheads"},
    {component: SetSecurity, name: "Security"},
    {component: SetSensors, name: "Sensors"},
    {component: SetShields, name: "Shields"}
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
