import React, {useState} from 'react';
import SetTier from './ShipPartSetters/SetTier';
import SetFrame from './ShipPartSetters/SetFrame';
import SetPowerCore from './ShipPartSetters/SetPowerCore';
import defaultSelections from '../defaultShipSelection';
import {validateShip} from '../metaTables';

function CustomShipPage(props) {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  validateShip(customShipParts)

  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetterBlock' >
        <SetTier customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetTier>
        <SetFrame customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetFrame>
        <SetPowerCore customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetPowerCore>
      </div>
    </div>
  );
}

export default CustomShipPage;