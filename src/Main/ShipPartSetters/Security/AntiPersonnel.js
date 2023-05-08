import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";
import AccordionText from '../Components/AccordionText';
import { isValidSecurity } from '../CustomRefs/optionValidation';

function AntiPersonnel(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [radioWeaponSelection, setRadioWeaponSelection] = useState(null);
  const [radioSourceSelection, setRadioSourceSelection] = useState("allSources");
  const [bpCost, setBpCost] = useState(0);

  const { antiPersonnelWeaponId: weaponId, tierId } = customShipParts;
  const { currentPart } = props;
  const size = ship.getSize()
  const frameTooLarge = Tables.sizeCategory[size] > 3

  useEffect(() => {
    if (!weaponId || !radioWeaponSelection) return setBpCost(0);

    const longarmCost = Tables.getLongarmData(weaponId).cost;
    const heavyCost = Tables.getHeavyData(weaponId).cost;

    if (radioWeaponSelection === "longarm" && longarmCost) {
      setBpCost(longarmCost);
    } 
    if (radioWeaponSelection === "heavy" && heavyCost) {
      setBpCost(heavyCost);
    } 
  }, [weaponId, radioWeaponSelection])

  const renderDropdownSelection = () => {
    const getter = (radioWeaponSelection === "longarm") ? Tables.getLongarmIdList(tierId) : Tables.getHeavyIdList(tierId)

    return getter.map((weapon, idx) => { 
      const data = (radioWeaponSelection === "longarm") ? Tables.getLongarmData(weapon) : Tables.getHeavyData(weapon)

      return isValidSecurity(ship, weapon, radioWeaponSelection, radioSourceSelection) 
      && <option key={idx} value={weapon}>
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

  const handleWeaponRadioChange = (ev) => {
    const radioOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Personnel Weapon", value: null})
    setBpCost(0)
    setRadioWeaponSelection(radioOption)
  }

  const handleSourceRadioChange = (ev) => {
    const radioOption = ev.target.value;


    setRadioSourceSelection(radioOption)
  }

  return (
    <>
      <fieldset className='full'>
        <legend>Anti-Personnel Weapon</legend>

        <AccordionText>
          <p>An antipersonnel weapon must be mounted near the boarding ramp of a Medium or smaller starship. This weapon can be any longarm whose item level is equal to or less than the starship's tier. By spending 5 additional Build Points, the installed weapon can be a heavy weapon (of creature scale, not starship scale). When an antipersonnel weapon is activated, if a hostile creature approaches within the weapon's range increment, it begins firing with an attack roll modifier equal to the ship's tier (minimum 1). It fires once per round during combat until its ammunition is depleted or the hostile creature is disabled or flees. The weapon can't detect invisible (or similarly hidden) creatures. This weapon can't be removed and used by characters. Anyone with access to the starship's computer system can activate or deactivate the weapon, as well designate what kind of targets are considered hostile. Once installed, this weapon can't be removed from the starship without destroying it.</p>
        </AccordionText>

        <div className="row">
          <input 
            type="radio" 
            id="longarm" 
            name="weaponRadio" 
            value="longarm" 
            onChange={handleWeaponRadioChange}
          />
          <label htmlFor="longarm">Longarm</label>
          
          <input 
            type="radio" 
            id="heavy" 
            name="weaponRadio" 
            value="heavy" 
            onChange={handleWeaponRadioChange}
          />
          <label htmlFor="heavy">Heavy</label>
        </div>

        <div className="row">
          <div>Sources:</div>

          <input 
            type="radio" 
            id="allSources" 
            name="sourceToggle" 
            value="allSources"
            checked={radioSourceSelection === "allSources"}
            onChange={handleSourceRadioChange}
          />
          <label htmlFor="allSources">All</label>
          
          <input 
            type="radio" 
            id="sfsLegal" 
            name="sourceToggle" 
            value="sfsLegal" 
            checked={radioSourceSelection === "sfsLegal"}
            onChange={handleSourceRadioChange}
          />
          <label htmlFor="sfsLegal">SFS Legal</label>
        </div>
        
        <div className="dropdownBlock">
          <label htmlFor="antiPersonnelWeapon" className="hidden">Anti-Personnel Weapon</label>
          <select 
            id="antiPersonnelWeapon" 
            value={weaponId || "None"} 
            onChange={handleDropdownChange}
            disabled={!radioWeaponSelection}
          >
            <option key={"None"}>None</option>
            {renderDropdownSelection()}
          </select>
          <PartTotals part={currentPart} bpCost={bpCost} />
        </div>
        {/* {frameTooLarge && <p className="note">An antipersonnel weapon must be mounted near the boarding ramp of a <strong>Medium or smaller</strong> starship.</p>} */}
      </fieldset>
    </>
  );
}

export default AntiPersonnel;