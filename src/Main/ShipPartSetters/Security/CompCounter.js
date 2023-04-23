import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import { splitCamelCase } from "../../References/utils";

import PartTotals from "../Components/PartTotals";

function CompCounter(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [computerCounterTotalBpCost, setComputerCounterTotalBpCost] = useState(0);


  const { antiHackingSystemsId, antiPersonnelWeaponId, computerCountermeasures, cloakingId } = customShipParts;
  const { currentPart } = props;

  const computerCounterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe"]
  
  useEffect(() => {
    // console.log(computerCountermeasures);
    const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;
    const compCounterList = Object.keys(computerCountermeasures)

    // console.log(compCounterList);

  }, [computerCountermeasures])

  useEffect(() => {
    // console.log(computerCountermeasures);
    const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;
    const compCounterList = Object.keys(computerCountermeasures)

    // console.log(compCounterList);

  }, [computerCountermeasures])

  const checkboxRenders = () => {
    return computerCounterTypes.map((box, idx) => {
      return (
        <div key={idx}>
          <input type="checkbox" id={box} name={box} 
            // Tables.getComputerCountermeasureData(box)
            value={{box} && splitCamelCase(box)} 
            onChange={handleComputerCheckboxChange}
          />
          <label htmlFor={box}>{splitCamelCase(box)}</label>
        </div>
    )})
  }

  const handleComputerCheckboxChange = (ev) => {
    const counterOption = ev.target.name
    const counterActive = document.getElementById(`${counterOption}`).checked
    
    let parent = null;
    if (computerCounterTypes.indexOf(counterOption) >= 0) parent = "computerCountermeasures"

    // ship.setSecurity(counterOption, parent)

    ship.setSecurity({ reference: counterOption, value: counterActive, parent})
  }

  const handleComputerShockChange = (ev) => {
    const shockOption = ev.target.value;

    ship.setSecurity({ reference: "shockGrid", value: shockOption, parent: "computerCountermeasures"})
  }

  return (
    <>
      <fieldset>
        <legend>Computer Countermeasures</legend>
        <div className="row">
          {checkboxRenders()}
        </div>
        <div className="dropdownBlock">
          <label htmlFor="shockGrid">Shock Grid</label>
          <select 
            id="shockGrid" 
            value={computerCountermeasures?.shockGridId || "None"} 
            onChange={handleComputerShockChange}
          >
            <option key={"None"}>None</option>
            {Tables.getComputerShockGridIdList().map((tier, idx) => (
              
              <option key={idx} value={tier}>Rank {tier} (DC {Tables.getComputerShockGridData(tier).DC}, Damage {Tables.getComputerShockGridData(tier).damage})
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </>
  );
}

export default CompCounter;