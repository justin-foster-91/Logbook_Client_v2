import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { splitCamelCase } from "../References/utils";

function SetTier() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  
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


  return (
    <>
      <h3>Security</h3>
      {/* Anti-Hacking Systems (dropdown) */}
      {/* Anti-Personnel Weapon (dropdown) */}

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

export default SetTier;
