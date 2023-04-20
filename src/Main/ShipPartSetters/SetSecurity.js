import React, { useContext, useState } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { splitCamelCase } from "../References/utils";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None


// Normal Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or thrusters or beginning starship combat immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally.

// Gray Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or firing a starship weapon immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally. However, a starship hidden with a gray cloaking device can move, though at a maximum speed of 10 hexes for Tiny and Small starships, 8 hexes for Medium and Large starships, and 6 hexes for Huge and larger starships.

function SetSecurity(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [antiPersonnelCheckbox, setAntiPersonnelCheckbox] = useState(null);

  const { antiHackingSystemsId, antiPersonnelWeaponId, computerCountermeasures, cloakingId } = customShipParts;
  // TODO: need to know when the ID is from a longarm vs a heavy weapon
  // category, level, price, damage, range, critical, capacity, usage, bulk, special, sfsLegal
  // const {  } = Tables.getAntiPersonnelData(antiPersonnelWeaponId);
  const { currentPart } = props;
  // const { fortification, bpCost } = Tables.getReinforcedBulkheadData(reinforcedBulkheadId, size)
  const { bpCost: antiHackingBpCost } = Tables.getAntiHackingData(antiHackingSystemsId);
  
  // const {  } = customShipParts;
  const totalSecurityBP = null
  const totalSecurityPCU = null

  const computerCounterTypes = ["alarm", "fakeShell", "feedback", "firewall", "lockout", "wipe"]
  const checkboxList = ["Biometric Locks", "Self-Destruct System", "Emergency Accelerator", "Holographic Mantle", "Reconfiguration System"]

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

  const handleAntiPersonnelChange = (ev) => {
    const antiPersonnelOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: antiPersonnelOption})
  };

  const handleAntiPersonnelCheckboxChange = (ev) => {
    const checkboxOption = ev.target.value;
    const longarmActive = document.getElementById(`longarm`).checked
    const heavyActive = document.getElementById(`heavy`).checked
    const targetActive = document.getElementById(`${checkboxOption}`).checked

    if (longarmActive && heavyActive) {
      if (checkboxOption === "longarm") {
        document.getElementById(`heavy`).checked = false
        ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
      } else {
        document.getElementById(`longarm`).checked = false
        ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
      }
    }

    if (!longarmActive && !heavyActive) {
      ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
    }

    if (targetActive) {
      setAntiPersonnelCheckbox(checkboxOption)
    } else {
      setAntiPersonnelCheckbox(null)
    }
  }

  const handleAntiHackingChange = (ev) => {
    const antiHackingOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Hacking Systems", value: antiHackingOption})
  }

  const handleCloakingIdChange = (ev) => {
    const cloakingOption = ev.target.value;

    ship.setSecurity({ reference: "Cloaking Device", value: cloakingOption})
  }

  const handleCheckboxChange = (ev) => {
    const checkboxOption = ev.target.name
    const checkboxActive = document.getElementById(`${checkboxOption}`).checked

    ship.setSecurity({ reference: checkboxOption, value: checkboxActive})

    // ship.setSecurity({ reference: biometricOption, value: biometricActive, parent})  
  }

  const checkboxRenders = () => {
    return computerCounterTypes.map((box, idx) => {
      return (
        <div key={idx}>
          <input type="checkbox" id={box} name={box} 
            value={splitCamelCase(box)} 
            onChange={handleComputerCheckboxChange}
          />
          <label htmlFor={box}>{splitCamelCase(box)}</label>
        </div>
    )})
  }

  const antiPersonnelSelection = () => {
    const getter = (antiPersonnelCheckbox === "longarm") ? Tables.getLongarmIdList : Tables.getHeavyIdList

    return getter().map((weapon, idx) => <option key={idx}>{weapon}</option>)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="antiHackingSystems">Anti-Hacking Systems</label>
        {/*  increase the DC to hack into it by 1 * mark */}
        <select 
          id="antiHackingSystems" 
          value={antiHackingSystemsId || "None"} 
          onChange={handleAntiHackingChange}
        >
          <option key={"None"}>None</option>
          {Tables.getAntiHackingIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
        <PartTotals part={currentPart} bpCost={antiHackingBpCost} />
      </div>

      {/* TODO: radio buttons for longarm and heavy weapon that changes dropdown data */}
      <fieldset>
        <legend>Anti-Personnel Weapon</legend>

        <div className="row">
          <input 
            type="checkbox" 
            id="longarm" 
            name="antiPersonnelWeapon" 
            value="longarm" 
            onChange={handleAntiPersonnelCheckboxChange}
          />
          <label htmlFor="longarm">Longarm</label>
          <div></div>
          <input 
            type="checkbox" 
            id="heavy" 
            name="antiPersonnelWeapon" 
            value="heavy" 
            onChange={handleAntiPersonnelCheckboxChange}
          />
          <label htmlFor="heavy">Heavy</label>
        </div>
        
        <div className="dropdownBlock">
          <label htmlFor="antiPersonnelWeapon" className="hidden">Anti-Personnel Weapon</label>
          <select 
            id="antiPersonnelWeapon" 
            value={antiPersonnelWeaponId || "None"} 
            onChange={handleAntiPersonnelChange}
            disabled={!antiPersonnelCheckbox}
          >
            <option key={"None"}>None</option>
            {antiPersonnelSelection()}
          </select>
        </div>
      </fieldset>

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

      {/* TODO: radio buttons for normal and gray cloaking that change dropdown data? */}
      <div className="dropdownBlock">
        <label htmlFor="cloaking">Cloaking</label>
        <select id="cloaking" value={cloakingId || "None"} onChange={handleCloakingIdChange}>
          <option key={"None"}>None</option>
          {Tables.getCloakingIdList().map((cloak, idx) => (
            <option key={idx}>{cloak}</option>
          ))}
        </select>
      </div>

      <div>
        {checkboxList.map((box, idx) => (
          <div className="row" key={box}>
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
