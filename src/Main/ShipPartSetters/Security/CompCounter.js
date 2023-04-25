import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import { splitCamelCase } from "../../References/utils";
import PartTotals from "../Components/PartTotals";
import * as Utils from "../../References/utils";

function CompCounter(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { computerCountermeasures, tierId } = customShipParts;
  const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;
  const { currentPart } = props;

  const computerTier = Math.max(Math.floor(parseInt(tierId) / 2), 1);

  const alarmCost = alarm && Tables.getComputerCountermeasureData("Alarm", computerTier).cost
  const fakeShellCost = fakeShell && Tables.getComputerCountermeasureData("Fake Shell", computerTier).cost
  const feedbackCost = feedback && Tables.getComputerCountermeasureData("Feedback", computerTier).cost
  const firewallCost = firewall && Tables.getComputerCountermeasureData("Firewall", computerTier).cost
  const lockoutCost = lockout && Tables.getComputerCountermeasureData("Lockout", computerTier).cost
  const wipeCost = wipe && Tables.getComputerCountermeasureData("Wipe", computerTier).cost

  const shockGridCost = shockGridId && Tables.getComputerShockGridData(shockGridId, computerTier).cost

  const totalBpCost = alarmCost + fakeShellCost + feedbackCost + firewallCost + lockoutCost + wipeCost + shockGridCost

  const counterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe"]

  const checkboxRenders = () => {
    return counterTypes.map((box, idx) => {
      // console.log(Utils.readableIds(box));
      return (
        <div key={idx}>
          <input type="checkbox" id={box} name={box} 
            // Tables.getComputerCountermeasureData(box)
            value={splitCamelCase(box)} 
            onChange={handleCheckboxChange}
          />
          <label htmlFor={box}>{splitCamelCase(box)}</label>
          {/* <div>{Tables.getComputerCountermeasureData(Utils.readableIds(box), computerTier).description}</div>
          <br/> */}
        </div>
    )})
  }

  const handleCheckboxChange = (ev) => {
    const counterOption = ev.target.name
    const counterActive = ev.target.checked
    
    let parent = null;
    if (counterTypes.indexOf(counterOption) >= 0) parent = "computerCountermeasures"

    ship.setSecurity({ reference: counterOption, value: counterActive, parent})
  }

  const handleShockChange = (ev) => {
    let shockOption = ev.target.value;
    if (shockOption === "None") shockOption = null;

    ship.setSecurity({ reference: "shockGrid", value: shockOption, parent: "computerCountermeasures"})
  }

  return (
    <>
      <fieldset>
        <legend>Computer Countermeasures</legend>
        <div>
          {checkboxRenders()}
        </div>
        <div className="dropdownBlock">
          <label htmlFor="shockGrid">Shock Grid</label>
          <select 
            id="shockGrid" 
            value={computerCountermeasures?.shockGridId || "None"} 
            onChange={handleShockChange}
          >
            <option key={"None"}>None</option>
            {Tables.getComputerShockGridIdList().map((tier, idx) => (
              
              <option key={idx} value={tier}>Rank {tier} (DC {Tables.getComputerShockGridData(tier).DC}, Damage {Tables.getComputerShockGridData(tier).damage})
              </option>
            ))}
          </select>
        </div>
        <PartTotals part={currentPart} bpCost={totalBpCost} />
      </fieldset>
    </>
  );
}

export default CompCounter;