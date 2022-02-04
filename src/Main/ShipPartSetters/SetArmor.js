import React from 'react';
import {getArmorData, getArmorIdList} from '../../metaTables'

function SetArmor(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {armorId} = customShipParts

  let acBonus = getArmorData(armorId).acBonus

  return (
    <>
      <h3>Armor</h3>

      <p></p>

      
      {/* TODO: */}
      Special Material: 
      <p></p>

      <div>
        Bonus to AC: 
        Special: 
      </div>
        BP cost: 
    </>
  );
}

export default SetArmor;