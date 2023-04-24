import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import { splitCamelCase } from "../../References/utils";
import {readableIds} from "../../References/utils";
import PartTotals from "../Components/PartTotals";



function CompCounter(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  // const [totalBpCost, setTotalBpCost] = useState(0);


  const { computerCountermeasures, tierId } = customShipParts;
  const { alarm, fakeShell, feedback, firewall, lockout, wipe } = computerCountermeasures;
  const { currentPart } = props;

  const computerTier = Math.max(Math.floor(parseInt(tierId) / 2), 1);

  // TODO: total bp cost should increase when use goes back up to tier and increases it
  // json is source of truth, so base costs off of json, not user actions
  const alarmCost = alarm && Tables.getComputerCountermeasureData("Alarm", computerTier).cost
  const fakeShellCost = fakeShell && Tables.getComputerCountermeasureData("Fake Shell", computerTier).cost
  const feedbackCost = feedback && Tables.getComputerCountermeasureData("Feedback", computerTier).cost
  const firewallCost = firewall && Tables.getComputerCountermeasureData("Firewall", computerTier).cost
  const lockoutCost = lockout && Tables.getComputerCountermeasureData("Lockout", computerTier).cost
  const wipeCost = wipe && Tables.getComputerCountermeasureData("Wipe", computerTier).cost

  const totalBpCost = alarmCost + fakeShellCost + feedbackCost + firewallCost + lockoutCost + wipeCost


  const counterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe"]


  
  // useEffect(() => {
  //   // console.log(computerCountermeasures);
  //   const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;
  //   const compCounterList = Object.keys(computerCountermeasures)

  //   // console.log(compCounterList);

  // }, [computerCountermeasures])

  // useEffect(() => {
  //   const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;

  
  //   const alarmCost = alarm && Tables.getComputerCountermeasureData("Alarm", computerTier).cost
  //   console.log(alarmCost);
  // }, [computerCountermeasures, computerTier])


  const checkboxRenders = () => {
    return counterTypes.map((box, idx) => {
      return (
        <div key={idx}>
          <input type="checkbox" id={box} name={box} 
            // Tables.getComputerCountermeasureData(box)
            value={splitCamelCase(box)} 
            onChange={handleCheckboxChange}
          />
          <label htmlFor={box}>{splitCamelCase(box)}</label>
        </div>
    )})
  }

  const handleCheckboxChange = (ev) => {
    const counterOption = ev.target.name
    const counterActive = ev.target.checked

    const selectionCost = Tables.getComputerCountermeasureData(readableIds(counterOption), computerTier).cost
    
    let parent = null;
    if (counterTypes.indexOf(counterOption) >= 0) parent = "computerCountermeasures"

    // if (counterActive) {
    //   setTotalBpCost(totalBpCost + selectionCost)
    // } else {
    //   setTotalBpCost(totalBpCost - selectionCost)
    // }
    // console.log(Tables.getComputerCountermeasureData(readableIds(counterOption), computerTier).cost);
    // console.log({totalBpCost});

    ship.setSecurity({ reference: counterOption, value: counterActive, parent})
  }

  const handleShockChange = (ev) => {
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