import React from 'react';
import {SetTier} from './ShipPartSetters'

function CustomShipPage(props) {
  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetters'>
        <SetTier></SetTier>
      </div>
    </div>
  );
}

export default CustomShipPage;