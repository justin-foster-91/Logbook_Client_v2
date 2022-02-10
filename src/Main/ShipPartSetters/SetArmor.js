import React, { useContext } from 'react';
import {getArmorData, getArmorIdList} from '../References/metaTables';
import AblativeArmor from './AblativeArmor';
import { CustomShipContext } from "../Context/shipContext";

function SetArmor() {
  const { customShipParts, setCustomShipParts, framePackage } = useContext(CustomShipContext);

  let {armorId} = customShipParts
  let { size, hp } = framePackage
  let { acBonus, tempHP, tlPenalty, turnDistance, bpCost } = getArmorData(armorId, size)


  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value

    if(armorOption === 'None') armorOption = null

    
    customShipParts.armorId = armorOption
    setCustomShipParts({...customShipParts})
  }

  const renderArmorBonus = () => {
    if(!acBonus && !tempHP) return 'AC/Temp HP: 0; '
    if(acBonus) return `Bonus AC: ${acBonus}; `
    else return `Temp HP: ${tempHP}; `
  }

  const renderSpecial = () => {
    if(tlPenalty && turnDistance) return `${tlPenalty} TL; +${turnDistance} turn distance`
    if(tlPenalty) return `${tlPenalty} TL`

    return 'n/a'
  }

  return (
    <>
      <h3>Armor</h3>

      <p></p>
      {/* TODO: default value needs to accommodate all possible armor options */}
      <select defaultValue={armorId === undefined || armorId === null ? 'None' : armorId} onChange={handleArmorChange}>
        <option key='null'>None</option>
        {getArmorIdList().map((armor, idx) => {
          if(armor.includes('Mk')) return <option key={idx} value={armor}>{armor} Armor (+{getArmorData(armor, size).acBonus} AC)</option>
          if(armor.includes('Energy')) return <option key={idx} value={armor}>{armor}</option>
          if(armor.includes('ablative')) {
            if(getArmorData(armor, size).tempHP <= hp*2) return <option key={idx} value={armor}>{armor} (+{getArmorData(armor, size).tempHP} THP)</option>
          }
          else return <option key={idx} value={armor}>{armor} (+{getArmorData(armor, size).tempHP} THP)</option>
        })}
      </select>
      <br/>
      
      {/* TODO: */}
      Special Material: 
      <p></p>

      {armorId && armorId.includes('ablative') &&
        <AblativeArmor size={size}></AblativeArmor> 
      }
      <p></p>

      {armorId && armorId.includes('Energy') && 
        'A ship equipped with energy-absorbent plating can store some of the energy that strikes the hull, redirecting that energy to power the ship’s systems. ' +
        'Once per turn, when a ship with energy-absorbent plating is hit by an attack that penetrates its shields, the ship’s engineer may immediately take a free divert action. ' + 
        'The boost granted by this free divert action does not stack with the benefit of any other divert action already benefiting the ship.'
      }
      <p></p>

      <div>
        {renderArmorBonus()}
        Special: {renderSpecial()}
      </div>
        BP cost: {bpCost}
    </>
  );
}

export default SetArmor;