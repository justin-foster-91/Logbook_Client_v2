import React, {useContext, useState, useEffect} from 'react';
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

  // Standard expansion bay flavor text / description on an accordion

function ExpansionBaySelections() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  

  const { expansionBayIds } = customShipParts
  // const [expansionCount, setExpansionCount] = useState(expansionBayIds.length)

  const size = ship.getSize()
  let { expansions: expansionCap } = ship.getFramePackage()
  if(typeof expansionCap === 'string') expansionCap = 'Unlimited'
  let expansionCount = expansionBayIds.length
  const allExpansionsShown = (expansionCount === expansionCap)

  // useEffect(() => {
  //   expansionCount = expansionBayIds.length
  // }, [stateToggle])


  const handleExpansionBayChange = (ev) => {
    const expansionIndex = Number(ev.target.name);
    let expansionOption = ev.target.value;
    if(expansionOption === "None") expansionOption = null

    ship.setExpansionBay(expansionOption, expansionIndex)
  }

  const handleNewExpansion = () => {
    if(expansionCap === 'Unlimited') expansionCap = Infinity
    if(expansionCount >= expansionCap) return;

    ship.setExpansionBay('Cargo Hold', expansionCount)
  }

  //TODO: copies should be displayed on the render
  const handleCopy = (ev) => {
    const expansionOption = ev.target.value
    const expansionIndex = Number(ev.target.name)
    // console.log(ev.target.name);
    // console.log(ev.target.value);

    if(expansionCount < expansionCap) ship.setExpansionBay(expansionOption, expansionIndex, true)
    // setStateToggle(!stateToggle)
  }

  const handleDelete = (ev) => {

  }

  return (
    <>
      <p>Expansions: {expansionCount}/{expansionCap}</p>
      {expansionCap === "Unlimited" 
      && <p><i>Supercolossal ships with increased width or length can support more expansion bays.</i></p>}
      {Array(expansionCount)
        .fill(1)
        .map((dropdown, idx) => {
          const { pcuCost, bpCost } = Tables.getExpansionBayData(expansionBayIds[idx], size)
          const indexValue = expansionBayIds[idx] ? expansionBayIds[idx] : "None"
          return (
            <div key={"expansionBay" + idx}>
              Expansion Bay {idx + 1} 
              <button name={idx} value={indexValue} onClick={handleCopy}>Copy</button>
              <button name={idx} value={indexValue} onClick={handleDelete}>Delete</button>

              <br />

              <select
                value={indexValue}
                name={idx}
                onChange={handleExpansionBayChange}
              >
                {/* <option key="None">None</option> */}
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
      <br/>
    </>
  )}

export default ExpansionBaySelections;