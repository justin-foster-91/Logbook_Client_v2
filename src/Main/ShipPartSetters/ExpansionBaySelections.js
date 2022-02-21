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

function ExpansionBaySelections(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const { expansionBayIds } = customShipParts
  const size = ship.getSize()
  let { expansions: expansionCount } = ship.getFramePackage()
  if(typeof expansionCount === 'string') expansionCount = 30
  const tempExpansionCap = 10;


  const handleExpansionBayChange = (ev) => {
    const expansionIndex = Number(ev.target.name);
    let expansionOption = ev.target.value;
    if(expansionOption === "None") expansionOption = null

    ship.setExpansionBay(expansionOption, expansionIndex)
    setCustomShipParts({ ...customShipParts });
  }

  // SuperC expansions set to 30
  return Array(Math.min(tempExpansionCap, expansionCount))
    .fill(1)
    .map((dropdown, idx) => {
      return (
        <div key={"expansionBay" + idx}>
          Expansion Bay {idx + 1}
          <br />
          <select
            value={
              expansionBayIds[idx] ? expansionBayIds[idx] : "None"
            }
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
          PCU Cost: {Tables.getExpansionBayData(expansionBayIds[idx], size).pcuCost}; 
          BP Cost: {Tables.getExpansionBayData(expansionBayIds[idx], size).bpCost}
          <p></p>
        </div>
      );
    });
}

export default ExpansionBaySelections;