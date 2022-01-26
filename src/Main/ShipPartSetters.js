import React, {useState} from 'react';
import defaultSelections from '../defaultShipSelection';
import {getTierData, getTierIds} from '../metaTables'

function SetTier(props) {
  let [selected, setSelected] = useState('')

  let {tierId} = defaultSelections;
  let {buildPoints, hpIncrease} = getTierData(tierId);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setSelected(event)
  }

  return (
    <>
      Tier {<br/>}

      <p></p>

      <select defaultValue={tierId} onChange={handleChange}>
        {getTierIds().map((tier, idx) => <option key={idx}>{tier}</option>)}
      </select>

      <p></p>

      Build Point Budget: {buildPoints}{<br/>}
      HP Increase: {hpIncrease ? hpIncrease : 0}
    </>
  );
}

export {SetTier}