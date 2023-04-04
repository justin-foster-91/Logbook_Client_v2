import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { splitCamelCase } from "../References/utils";

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
      <h3>{currentPart.name}</h3>
      Anti-Hacking Systems (dropdown) <br/>
      {/*  increase the DC to hack into it by 1 * mark */}
      <select value={antiHackingSystemsId} onChange={handleAntiHackingChange}>
        {Tables.getAntiHackingIdList().map((weapon, idx) => (
          <option key={idx}>{weapon}</option>
        ))}
      </select>

      <p></p>

      Anti-Personnel Weapon <br/>
      {/* Needs access to entire longarm and heavy weapons list */}
      <select value={antiPersonnelWeaponId} onChange={handleAntiPersonnelChange}>
        {Tables.getAntiPersonnelIdList().map((weapon, idx) => (
          <option key={idx}>{weapon}</option>
        ))}
      </select>

      <p></p>
      {/* Biometric Locks - check */}
      <p></p>

      Computer Countermeasures
      <div>
        {checkboxRenders()}
      </div>

      {/* Shock Grid - dropdown */}


      {/* Self-Destruct System - check */}
      {/* Emergency Accelerator - check */}
      {/* Holographic Mantle - check */}
      {/* Reconfiguration System - check */}


      <p></p>

      <div>
        Total BP Cost: {totalSecurityBP}; Total PCU Cost: {totalSecurityPCU}
      </div>
    </>
  );
}

export default SetSecurity;
