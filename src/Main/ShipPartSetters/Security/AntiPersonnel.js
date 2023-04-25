import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";

function AntiPersonnel(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [radioSelection, setRadioSelection] = useState(null);
  const [bpCost, setBpCost] = useState(0);

  const { antiPersonnelWeaponId: weaponId, tierId } = customShipParts;
  const { currentPart } = props;


  useEffect(() => {
    if (!weaponId || !radioSelection) return setBpCost(0);

    if (radioSelection === "longarm" && Tables.getLongarmData(weaponId).level !== 0) {
      setBpCost(Tables.getLongarmData(weaponId).level);
    } 
    if (radioSelection === "heavy" && Tables.getHeavyData(weaponId).level !== 0) {
      setBpCost(5 + Tables.getHeavyData(weaponId).level);
    } 
  }, [weaponId, radioSelection])

  const renderDropdownSelection = () => {
    const getter = (radioSelection === "longarm") ? Tables.getLongarmIdList(tierId) : Tables.getHeavyIdList(tierId)

    return getter.map((weapon, idx) => { 
      const data = (radioSelection === "longarm") ? Tables.getLongarmData(weapon) : Tables.getHeavyData(weapon)

      return <option key={idx} value={weapon}>
        {weapon} (Lvl {data.level}; {data.damage})
      </option>
    })
  }

  const handleDropdownChange = (ev) => {
    let option = ev.target.value;
    if (option === "None") {
      option = null;
      setBpCost(0)
    }

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: option})
  };

  const handleRadioChange = (ev) => {
    const radioOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
    setBpCost(0)
    setRadioSelection(radioOption)
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
            value={weaponId || "None"} 
            onChange={handleDropdownChange}
            disabled={!radioSelection}
          >
            <option key={"None"}>None</option>
            {renderDropdownSelection()}
          </select>
          <PartTotals part={currentPart} bpCost={bpCost} />
        </div>
      </fieldset>
    </>
  );
}

export default AntiPersonnel;