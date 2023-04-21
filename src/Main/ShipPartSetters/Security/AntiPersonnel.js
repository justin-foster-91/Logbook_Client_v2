import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../../References/metaTables";
import PartTotals from "../../Components/PartTotals";

function AntiPersonnel(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [radioSelection, setRadioSelection] = useState(null);
  const [bpCost, setBpCost] = useState(0);

  const { antiPersonnelWeaponId: weaponId } = customShipParts;
  const { currentPart } = props;


  useEffect(() => {
    if (!weaponId) return;

    if (radioSelection === "longarm") {
      setBpCost(5 + Number(Tables.getLongarmData(weaponId).level));
    } else {
      setBpCost(5 + Number(Tables.getHeavyData(weaponId).level));
    }
  }, [weaponId, radioSelection])

  const renderDropdownSelection = () => {
    const getter = (radioSelection === "longarm") ? Tables.getLongarmIdList : Tables.getHeavyIdList

    return getter().map((weapon, idx) => <option key={idx} value={weapon}>{weapon}</option>)
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