import React from 'react';
import {getTierData, getTierIdList} from '../../metaTables'

function SetTier(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {tierId} = props.customShipParts

  let buildPoints = getTierData(tierId).buildPoints
  let hpIncrementMultiplier = getTierData(tierId).hpIncrementMultiplier

  const handleChange = (ev) => {
    customShipParts.tierId = ev.target.value
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Tier</h3>

      <p></p>

      <select defaultValue={tierId} onChange={handleChange}>
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