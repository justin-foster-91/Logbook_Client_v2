import React from 'react';
import {getTierData, getTierIdList} from '../../metaTables'

function SetTier(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {tierId} = customShipParts

  let {buildPoints, hpIncrementMultiplier} = getTierData(tierId)

  const handleTierChange = (ev) => {
    customShipParts.tierId = ev.target.value
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Tier</h3>

      <p></p>

      <select defaultValue={tierId} onChange={handleTierChange}>
        {getTierIdList().map((tier, idx) => <option key={idx}>{tier}</option>)}
      </select>

      <p></p>

      <div>
        BP Budget: {buildPoints}; 
        HP Increments: {hpIncrementMultiplier}
      </div>
    </>
  );
}

export default SetTier;