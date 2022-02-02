import React, {useEffect, useState} from 'react';
import SetTier from './ShipPartSetters/SetTier';
import SetFrame from './ShipPartSetters/SetFrame';
import SetPowerCore from './ShipPartSetters/SetPowerCore';
import defaultSelections from '../defaultShipSelection';
import {validateShip} from '../metaTables';
import SetThrusters from './ShipPartSetters/SetThrusters';

function CustomShipPage(props) {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)

  useEffect(() => {
    //FIXME: evaluates true if frame changes size after power core is chosen
    console.log(validateShip(customShipParts))
  })

  // TODO: frame size constraints passed into other components
  // TODO: change 'none' usage to null

  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetterBlock' >
        <SetTier customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetTier>
        <SetFrame customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetFrame>
        <SetPowerCore customShipParts={customShipParts} setCustomShipParts={setCustomShipParts} ></SetPowerCore>
        <SetThrusters customShipParts={customShipParts} setCustomShipParts={setCustomShipParts}></SetThrusters>
      </div>
    </div>
  );
}

export default CustomShipPage;