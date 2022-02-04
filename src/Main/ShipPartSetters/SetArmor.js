import React from 'react';
import {getArmorData, getArmorIdList} from '../References/metaTables';
import { capitalizeEachWord } from '../References/utils';
import { findComponentByFrameId } from '../References/shipFunctions';

function SetArmor(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {armorId} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let size = findComponentByFrameId(frameId, 'size')

  let { acBonus, tlPenalty, turnDistance, bpCost } = getArmorData(armorId, size)

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value.replace(' Armor', '')

    customShipParts.armorId = armorOption
    setCustomShipParts({...customShipParts})
  }

  const renderSpecial = () => {
    if(tlPenalty && turnDistance) return `${tlPenalty} TL; ${turnDistance} turn distance`
    if(tlPenalty) return `${tlPenalty} TL`

    return 'n/a'
  }

  return (
    <>
      <h3>Armor</h3>

      <p></p>
      <select defaultValue={armorId === undefined || armorId === null ? 'None' : `${armorId} Thrusters`} onChange={handleArmorChange}>
        <option key='null'>None</option>
        {getArmorIdList().map((thruster, idx) => 
          <option key={idx}>{thruster} Armor</option>
        )}
      </select><br/>
      
      {/* TODO: */}
      Special Material: 
      <p></p>

      <div>
        Bonus to AC: {acBonus};
        Special: {renderSpecial()}
      </div>
        BP cost: {bpCost}
    </>
  );
}

export default SetArmor;