import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function SetTier() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  
  // const {  } = customShipParts;
  const totalSecurityBP = null
  const totalSecurityPCU = null

  const handleComputerCounterChange = (ev) => {
    const clicked = ev.target.name

    console.log(clicked);
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
        <form onChange={handleComputerCounterChange}>
          <input type="checkbox" id="alarm" name="alarm" value="Alarm"/>
          <label htmlFor="alarm">Alarm</label>

          <input type="checkbox" id="fakeShell" name="fakeShell" value="Fake Shell"/>
          <label htmlFor="fakeShell">Fake Shell</label>

          <input type="checkbox" id="feedback" name="feedback" value="Feedback"/>
          <label htmlFor="feedback">Feedback</label>

          <input type="checkbox" id="firewall" name="firewall" value="Firewall"/>
          <label htmlFor="firewall">Firewall</label>

          <input type="checkbox" id="lockout" name="lockout" value="Lockout"/>
          <label htmlFor="lockout">Lockout</label>

          <input type="checkbox" id="wipe" name="wipe" value="Wipe"/>
          <label htmlFor="wipe">Wipe</label>
        </form>
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
