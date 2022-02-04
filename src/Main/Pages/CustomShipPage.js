import React, {useEffect, useState} from 'react';
import SetTier from '../ShipPartSetters/SetTier';
import SetFrame from '../ShipPartSetters/SetFrame';
import SetPowerCore from '../ShipPartSetters/SetPowerCore';
import defaultSelections from '../References/defaultShipSelection';
import {validateShip} from '../References/shipFunctions';
import SetThrusters from '../ShipPartSetters/SetThrusters';
import SetArmor from '../ShipPartSetters/SetArmor';

function CustomShipPage(props) {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)

  useEffect(() => {
    console.log(validateShip(customShipParts))
  })

  // TODO: is armor and ablative armor stackable or mutually exclusive

  // Required systems: Tier (APL based), Frame, Power Core, Thrusters
  // Other systems needed for combat, but not required for a starship 

  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetterBlock' >
        <SetTier customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetTier>
        <SetFrame customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetFrame>
        <SetPowerCore customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetPowerCore>
        <SetThrusters customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetThrusters>
        <SetArmor customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetArmor>
      </div>
    </div>
  );
}

export default CustomShipPage;