import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

  //Booster Thruster Housing: adds an additional thruster slot
  //Dedicated Computer Housing: adds an additional mononode computer slot
  //Docking Canopy: takes up 2 expansion bays
  //Drift Booster: is compatible only with a Supercolossal ship.
  //Drift Stasis Unit: drift stasis sickness stat block
  //External Expansion Bay: can double the number of expansion bay slots at cost of turn distance
  //// doesn't count against interior expansion limit
  //Habitat Simulator: takes up 3 expansion bays
  //Hangar Bay: takes up 4 expansion bays
  //Healing pods: can be installed only in a biomechanical starship.
  //Power Core Housing: adds an additional power core slot
  //Recycling System: is compatible only with a Supercolossal ship.
  //Tactical Sensor Tank is compatible only with a Supercolossal ship.

function ExpansionBaySelections() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  

  const { expansionBayIds } = customShipParts
  const size = ship.getSize()
  let { expansions: expansionCap } = ship.getFramePackage()
  if(typeof expansionCap === 'string') expansionCap = 30
  const tempExpansionCap = 10;
  const expansionCount = expansionBayIds.length
  const allExpansionsShown = (expansionCount === expansionCap)


  const handleExpansionBayChange = (ev) => {
    const expansionIndex = Number(ev.target.name);
    let expansionOption = ev.target.value;
    if(expansionOption === "None") expansionOption = null

    ship.setExpansionBay(expansionOption, expansionIndex)
  }

  const handleNewExpansion = () => {
    if(expansionCount >= expansionCap) return;

    ship.setExpansionBay(null, expansionCount)
  }

  return (
    <>
      <p>Expansions: {expansionCount}/{expansionCap}</p>
      {Array(expansionCount)
        .fill(1)
        .map((dropdown, idx) => {
          const { pcuCost, bpCost } = Tables.getExpansionBayData(expansionBayIds[idx], size)
          return (
            <div key={"expansionBay" + idx}>
              Expansion Bay {idx + 1} <button>Copy</button><button>Delete</button>

              <br />

              <select
                value={expansionBayIds[idx] ? expansionBayIds[idx] : "None"}
                name={idx}
                onChange={handleExpansionBayChange}
              >
                <option key="None">None</option>
                {Tables.getExpansionBayIdList().map((expansion, idx) => (
                  <option key={"option" + idx} value={expansion}>
                    {expansion}
                  </option>)
                )}
              </select>

              <br />

              <div>
                PCU Cost: {pcuCost}; 
                BP Cost: {bpCost}
              </div>

              <br/>
            </div>
          );
      })}
      {!allExpansionsShown && <button onClick={handleNewExpansion}>New Expansion {expansionCount+1}/{expansionCap}</button>}
    </>
  )}

export default ExpansionBaySelections;