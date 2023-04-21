import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../../References/metaTables";
import PartTotals from "../../Components/PartTotals";

function AntiPersonnel(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [antiPersonnelRadio, setAntiPersonnelRadio] = useState(null);
  const [antiPersonnelBpCost, setAntiPersonnelBpCost] = useState(0);

  const { antiPersonnelWeaponId } = customShipParts;
  const { currentPart } = props;

  useEffect(() => {
    if (!antiPersonnelWeaponId) return;

    if (document.getElementById(`longarm`).checked) {
      setAntiPersonnelBpCost(5 + Number(Tables.getLongarmData(antiPersonnelWeaponId).level));
    } else {
      setAntiPersonnelBpCost(5 + Number(Tables.getHeavyData(antiPersonnelWeaponId).level));
    }
  }, [antiPersonnelWeaponId, antiPersonnelRadio])

  const antiPersonnelSelection = () => {
    const getter = (antiPersonnelRadio === "longarm") ? Tables.getLongarmIdList : Tables.getHeavyIdList

    return getter().map((weapon, idx) => <option key={idx}>{weapon}</option>)
  }

  const handleDropdownChange = (ev) => {
    const antiPersonnelOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: antiPersonnelOption})
  };

  const handleRadioChange = (ev) => {
    const radioOption = ev.target.value;
    console.log(radioOption);

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
    setAntiPersonnelBpCost(0)
    setAntiPersonnelRadio(radioOption)
  }

  return (
    <>
      <fieldset>
        <legend>Anti-Personnel Weapon</legend>

        <div className="row">
          <input 
            type="radio" 
            id="longarm" 
            name="weaponRadio" 
            value="longarm" 
            onChange={handleRadioChange}
          />
          <label htmlFor="longarm">Longarm</label>
          
          <input 
            type="radio" 
            id="heavy" 
            name="weaponRadio" 
            value="heavy" 
            onChange={handleRadioChange}
          />
          <label htmlFor="heavy">Heavy</label>
        </div>
        
        <div className="dropdownBlock">
          <label htmlFor="antiPersonnelWeapon" className="hidden">Anti-Personnel Weapon</label>
          <select 
            id="antiPersonnelWeapon" 
            value={antiPersonnelWeaponId || "None"} 
            onChange={handleDropdownChange}
            disabled={!antiPersonnelRadio}
          >
            <option key={"None"} value={null}>None</option>
            {antiPersonnelSelection()}
          </select>
          <PartTotals part={currentPart} bpCost={antiPersonnelBpCost} />
        </div>
      </fieldset>
    </>
  );
}

export default AntiPersonnel;