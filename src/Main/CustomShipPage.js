import React, {useState} from 'react';
import {SetTier, SetFrame} from './ShipPartSetters'
import defaultSelections from '../defaultShipSelection';

function CustomShipPage(props) {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  const [constraints, setConstraints] = useState({})

  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetterBlock' >
        <SetTier {...customShipParts} setCustomShipParts={setCustomShipParts} constraints={constraints} setConstraints={setConstraints}></SetTier>
        <SetFrame {...customShipParts} setCustomShipParts={setCustomShipParts} constraints={constraints} setConstraints={setConstraints}></SetFrame>
      </div>
    </div>
  );
}

export default CustomShipPage;