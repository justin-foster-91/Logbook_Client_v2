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
  const [partHighlight, setPartHighlight] = useState();

  const size = ship.getSize()

  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()


  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setSrollPosition(position);
  };
  
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);


  // TODO: if no entry is 100% visible, select the one with greatest visibility %
  useEffect(() => {
    let options = {
      // root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };
  
    let callback = (entries, observer) => {
      let highestPart = null;
      // console.log({entries});
  
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 1) {
          console.log("entry: ", entry.target.id);
          if (!highestPart) {
            highestPart = entry.target
          }
        }
      });
  
      console.log("Highest: ", highestPart);
      if (!highestPart) return;
      setPartHighlight(highestPart.id)
    };
  
    let observer = new IntersectionObserver(callback, options);

    setterList.map(setter => observer.observe(document.getElementById(setter.name)))
  }, [])



  //SetWeapon Fighter - forward arc (2 light [1 must be a tracking weapon])

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
    {component: SetDefensiveCounter, name: "Defensive Counter"},
    {component: SetDriftEngine, name: "Drift Engine"},
    {component: SetExpansionBays, name: "Expansion Bays"},
    {component: SetFortifiedHull, name: "Fortified Hull"},
    {component: SetReinforcedBulkheads, name: "Reinforced Bulkheads"},
    {component: SetSecurity, name: "Security"},
  ]

  return (
    <>
      <Sidebar setterList={setterList} partHighlight={partHighlight}></Sidebar>
      <div className="customShipDisplay" id="customShipDisplay">
        <h2>Custom Ship Page</h2>

        <div className="partSetterList">
          {setterList.map((part, idx) => {
            const Setter = part.component;
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
