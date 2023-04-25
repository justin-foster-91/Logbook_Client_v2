import React, { useContext, useState } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import { splitCamelCase } from "../../References/utils";
import PartTotals from "../Components/PartTotals";
import * as Utils from "../../References/utils";

// a computer can have a number of countermeasures equal to its tier.

function CompCounter(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  // const [totalBpCost, setTotalBpCost] = useState(0)
  // const [slotsUsed, setSlotsUsed] = useState(0)

  const { computerCountermeasures, tierId } = customShipParts;
  const { alarm, fakeShell, feedback, firewall, lockout, wipe, shockGridId } = computerCountermeasures;
  const { currentPart } = props;

  const computerTier = Math.max(Math.floor(parseInt(tierId) / 2), 1);
  const slotsAllowed = computerTier;

  const shockTable = Tables.getComputerShockGridData(shockGridId, computerTier);

  const counters = {
    alarm: {
      active: alarm,
      data: Tables.getComputerCountermeasureData("Alarm", computerTier),
    },
    fakeShell: {
      active: fakeShell,
      data: Tables.getComputerCountermeasureData("Fake Shell", computerTier),
    },
    feedback: {
      active: feedback,
      data: Tables.getComputerCountermeasureData("Feedback", computerTier),
    },
    firewall: {
      active: firewall,
      data: Tables.getComputerCountermeasureData("Firewall", computerTier),
    },
    lockout: {
      active: lockout,
      data: Tables.getComputerCountermeasureData("Lockout", computerTier),
    },
    wipe: {
      active: wipe,
      data: Tables.getComputerCountermeasureData("Wipe", computerTier),
    },
    shockGrid: {
      active: shockGridId,
      data: Tables.getComputerCountermeasureData("Shock Grid", computerTier),
    }
  }

  const calculateTotalBpCost = () => {
    let total = 0;
    Object.keys(counters).forEach((key) => {
      if (!counters[key].active) return;
      
      if (key === "shockGrid") {
        total += shockTable.cost
      } else {
        total += counters[key].data.cost
      }
      
    })

    return total
  }

  const totalBpCost = calculateTotalBpCost();

  const slotsUsed = () => {
    let total = 0;

    Object.keys(counters).forEach((key) => {
      if (!counters[key].active) return;

      if (key === "shockGrid") {
        total += Number(shockGridId)
      } else {
        total += 1;
      }
    })

    return total;
  }

  const checkboxRenders = () => {
    return Object.keys(counters).map((box, idx) => {
      // console.log(Utils.readableIds(box));
      const disabled = (slotsUsed() >= slotsAllowed) && !counters[box].active;
      return (
        box !== "shockGrid" 
        && <div key={idx}>
          <div>
            <input type="checkbox" id={box} name={box} 
              // Tables.getComputerCountermeasureData(box)
              value={splitCamelCase(box)} 
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
            <label htmlFor={box} className={disabled ? "warning" : ""}>{splitCamelCase(box)}</label>
            {/* <PartTotals bpCost={} /> */}
          </div>
          <div>
            {Tables.getComputerCountermeasureData(Utils.readableIds(box), computerTier).description}
          </div>
          <br/>
        </div>
        
    )})
  }

  const renderShockGridRanks = (tier, idx) => {
    const shockData = Tables.getComputerShockGridData(tier, computerTier)

    const tierWithinMaxSlots = (tier <= slotsAllowed);
    const slotsRemaining = (slotsAllowed - slotsUsed());
    const slotsUsedByShocks = Number(shockGridId) || 0;
    const remainingSlotsNotUsedByShocks = slotsRemaining + slotsUsedByShocks
    const tierWithinValidRemainder = tier <= remainingSlotsNotUsedByShocks

    const shockAllowed = tierWithinValidRemainder

    if (!tierWithinMaxSlots) return;
    return (
      <option 
        key={idx} 
        value={tier} 
        disabled={!shockAllowed}
      >
        Rank {tier} (DC {shockData.DC}, Damage {shockData.damage})
      </option>
    )
  }

  const handleCheckboxChange = (ev) => {
    const counterOption = ev.target.name
    const counterActive = ev.target.checked
    
    let parent = null;
    if (counterOption !== "shockGrid") parent = "computerCountermeasures"

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
        <div><strong>Slots</strong>: {slotsUsed()}/{slotsAllowed}</div>
        <div className='note'>A computer can have a number of countermeasures equal to the computer's tier. Each rank of added Shock Grid counts as one countermeasure when determining the total number of countermeasures a system can have.</div>

        <div>
          {checkboxRenders()}
        </div>

        <div className="dropdownBlock">
          <label htmlFor="shockGrid">Shock Grid</label>
          <select 
            id="shockGrid" 
            value={shockGridId || "None"} 
            onChange={handleShockChange}
            disabled={(slotsUsed() >= computerTier) && !counters.shockGrid.active}
          >
            <option key={"None"}>None</option>
            {Tables.getComputerShockGridIdList().map((tier, idx) => (
              renderShockGridRanks(tier, idx)
            ))}
          </select>
          <div>{counters.shockGrid.data.description}</div>
        </div>
        <PartTotals part={currentPart} bpCost={totalBpCost} />
      </fieldset>
    </>
  );
}

export default CompCounter;