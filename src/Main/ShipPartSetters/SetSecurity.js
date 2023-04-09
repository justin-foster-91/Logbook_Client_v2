import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { splitCamelCase } from "../References/utils";
import PartTitle from "../Components/PartTitle";

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None

function SetSecurity(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const { antiHackingSystemsId, antiPersonnelWeaponId } = customShipParts;
  // TODO: need to know when the ID is from a longarm vs a heavy weapon
  // category, level, price, damage, range, critical, capacity, usage, bulk, special, sfsLegal
  const {  } = Tables.getAntiPersonnelData(antiPersonnelWeaponId);
  const { currentPart } = props;
  
  // const {  } = customShipParts;
  const totalSecurityBP = null
  const totalSecurityPCU = null

  const computerCounterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe"]

  const handleComputerCounterChange = (ev) => {
    const counterOption = ev.target.name
    const counterActive = document.getElementById(`${counterOption}`).checked
    
    let parent = null;
    if (computerCounterTypes.indexOf(counterOption) >= 0) parent = "computerCountermeasures"

    // ship.setSecurity(counterOption, parent)

    ship.setSecurity({ reference: counterOption, value: counterActive, parent})
  }

  const checkboxRenders = () => {
    return computerCounterTypes.map((box, idx) => {
      return (
      <div key={idx}>
        <input type="checkbox" id={box} name={box} 
          value={splitCamelCase(box)} 
          onChange={handleComputerCounterChange}
        />
        <label htmlFor={box}>{splitCamelCase(box)}</label>
      </div>
    )})
  }

  const handleAntiPersonnelChange = (ev) => {
    const antiPersonnelOption = ev.target.value;
    console.log(antiPersonnelOption);

    // ship.setSecurity({ reference: 'tierId', value: tierOption})
  };

  const handleAntiHackingChange = (ev) => {
    const antiHackingOption = ev.target.value;
    console.log(antiHackingOption);

    // ship.setSecurity({ reference: 'tierId', value: tierOption})
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <div>Anti-Hacking Systems (dropdown)</div>
        {/*  increase the DC to hack into it by 1 * mark */}
        <select value={antiHackingSystemsId} onChange={handleAntiHackingChange}>
          {Tables.getAntiHackingIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
      </div>

      <div className="dropdownBlock">
        <div>Anti-Personnel Weapon</div>
        {/* Needs access to entire longarm and heavy weapons list */}
        <select value={antiPersonnelWeaponId} onChange={handleAntiPersonnelChange}>
          {Tables.getAntiPersonnelIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
      </div>

      {/* Biometric Locks - check */}

      Computer Countermeasures
      <div>
        {checkboxRenders()}
      </div>

      {/* Shock Grid - dropdown */}


      {/* Self-Destruct System - check */}
      {/* Emergency Accelerator - check */}
      {/* Holographic Mantle - check */}
      {/* Reconfiguration System - check */}


      <div className="row totals">
        <div>Total BP Cost: {totalSecurityBP}</div>
        <div>Total PCU Cost: {totalSecurityPCU}</div>
      </div>
    </>
  );
}

export default SetSecurity;
