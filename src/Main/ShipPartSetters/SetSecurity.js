import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { splitCamelCase } from "../References/utils";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None

// TODO: tooltip on computer countermeasures to specify no BP cost


// Normal Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or thrusters or beginning starship combat immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally.

// Gray Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or firing a starship weapon immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally. However, a starship hidden with a gray cloaking device can move, though at a maximum speed of 10 hexes for Tiny and Small starships, 8 hexes for Medium and Large starships, and 6 hexes for Huge and larger starships.

function SetSecurity(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const { antiHackingSystemsId, antiPersonnelWeaponId, computerCountermeasures, cloakingId } = customShipParts;
  // TODO: need to know when the ID is from a longarm vs a heavy weapon
  // category, level, price, damage, range, critical, capacity, usage, bulk, special, sfsLegal
  const {  } = Tables.getAntiPersonnelData(antiPersonnelWeaponId);
  const { currentPart } = props;
  
  // const {  } = customShipParts;
  const totalSecurityBP = null
  const totalSecurityPCU = null

  const computerCounterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe", "shockGrid"]
  const checkboxList = ["Biometric Locks", "Self-Destruct System", "Emergency Accelerator", "Holographic Mantle", "Reconfiguration System"]

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

  const handleCloakingIdChange = (ev) => {
    const cloakingOption = ev.target.value;
    console.log(cloakingOption);

    // ship.setSecurity({ reference: 'tierId', value: tierOption})
  }

  const handleCheckboxChange = (ev) => {
    const checkboxOption = ev.target.name
    const checkboxActive = document.getElementById(`${checkboxOption}`).checked
    console.log({checkboxOption, checkboxActive});

    // ship.setSecurity(counterOption, parent)

    // ship.setSecurity({ reference: biometricOption, value: biometricActive, parent})  
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <div>Anti-Hacking Systems</div>
        {/*  increase the DC to hack into it by 1 * mark */}
        <select value={antiHackingSystemsId || "None"} onChange={handleAntiHackingChange}>
          <option key={"None"}>None</option>
          {Tables.getAntiHackingIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
      </div>

      <div className="dropdownBlock">
        <div>Anti-Personnel Weapon</div>
        <select value={antiPersonnelWeaponId || "None"} onChange={handleAntiPersonnelChange}>
          <option key={"None"}>None</option>
          {Tables.getAntiPersonnelIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
      </div>

      <div className="dropdownBlock">
        <div>Cloaking</div>
        <select value={cloakingId || "None"} onChange={handleCloakingIdChange}>
          <option key={"None"}>None</option>
          {Tables.getCloakingIdList().map((cloak, idx) => (
            <option key={idx}>{cloak}</option>
          ))}
        </select>
      </div>

      <p></p>

      {/* Cloaking - dropdown */}
      {/* Normal and Gray included */}

      <div>
      {/* TODO: border with legend */}
        <div>Computer Countermeasures</div>
        <div className="row">
          {checkboxRenders()}
        </div>
        <div className="row">
          <div>Shock Grid</div>
          <select value={computerCountermeasures?.shockGrid || "None"} onChange={handleComputerCounterChange}>
            <option key={"None"}>None</option>
            {Tables.getComputerShockGridIdList().map((tier, idx) => (
              
              <option key={idx} value={tier}>Rank {tier} (DC {Tables.getComputerShockGridData(tier).DC}, Damage {Tables.getComputerShockGridData(tier).damage})
              </option>
            ))}
          </select>
        </div>
      </div>

      <p></p>

      <div>
        {checkboxList.map((box, idx) => (
          <div className="row">
            <input type="checkbox" id={box} name={box} 
              // value={splitCamelCase(box)} 
              onChange={handleCheckboxChange}
            />
            <label htmlFor={box}>{box}</label>
          </div>
        ))}
      </div>

      <PartTotals totalBP={totalSecurityBP} totalPCU={totalSecurityPCU} />
    </>
  );
}

export default SetSecurity;
