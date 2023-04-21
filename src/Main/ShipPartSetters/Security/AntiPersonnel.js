import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../../References/metaTables";
import PartTotals from "../../Components/PartTotals";

function AntiPersonnel(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [antiPersonnelCheckbox, setAntiPersonnelCheckbox] = useState(null);
  const [antiPersonnelBpCost, setAntiPersonnelBpCost] = useState(0);

  const { antiPersonnelWeaponId } = customShipParts;
  const { currentPart } = props;

  useEffect(() => {
    if (!antiPersonnelWeaponId) return;

    const longarmActive = document.getElementById(`longarm`).checked
    const heavyActive = document.getElementById(`heavy`).checked

    if (!longarmActive && !heavyActive) {
      const longarmWeapons = Tables.getLongarmIdList()
      const heavyWeapons = Tables.getHeavyIdList()

      if (longarmWeapons.indexOf(antiPersonnelWeaponId) >= 0) {
        document.getElementById(`longarm`).checked = true
        setAntiPersonnelCheckbox("longarm")
      } else {
        document.getElementById(`heavy`).checked = true
        setAntiPersonnelCheckbox("heavy")
      } 
    }

    // TODO: are the active variables still correct at this point?

    if (document.getElementById(`longarm`).checked) {
      setAntiPersonnelBpCost(5 + Number(Tables.getLongarmData(antiPersonnelWeaponId).level));
    } else {
      setAntiPersonnelBpCost(5 + Number(Tables.getHeavyData(antiPersonnelWeaponId).level));
    }
    
  }, [antiPersonnelWeaponId])

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

  const antiPersonnelSelection = () => {
    const getter = (antiPersonnelCheckbox === "longarm") ? Tables.getLongarmIdList : Tables.getHeavyIdList

    return getter().map((weapon, idx) => <option key={idx}>{weapon}</option>)
  }

  return (
    <>
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
          <PartTotals part={currentPart} bpCost={antiPersonnelBpCost} />
        </div>        
      </fieldset>
    </>
  );
}

export default AntiPersonnel;