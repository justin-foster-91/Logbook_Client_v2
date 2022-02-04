import React from 'react';
import {getPowerCoreData, getPowerCoreIdList } from '../References/metaTables';
import { findComponentByFrameId, doesFrameSizeAllowCore, getCoreQuantityFromSize } from '../References/shipFunctions';
import { capitalizeEachWord } from '../References/utils';

const PowerCoreSelections = (props) => {
  let {customShipParts, setCustomShipParts} = props
  let {powerCoreIds} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frameId, 'size')
  let powerCoreQuantity = getCoreQuantityFromSize(frameSize)

  const handlePowerCoreChange = (event) => {
    let coreIndex = event.target.name
    let coreOption = event.target.value

    if(coreOption === 'None') coreOption = null
    else coreOption = coreOption.split(' ').slice(0, 2).join(' ')

    customShipParts.powerCoreIds[coreIndex] = coreOption
    setCustomShipParts({...customShipParts})
  }

  return(
    Array(powerCoreQuantity).fill(1).map((dropdown, idx) => {
      return <div key={'powerCore'+idx}>
        Power Core {idx+1} <br/>
        {/* defaultValue must match the option's string */}
        <select 
          defaultValue={
            (powerCoreIds[idx] === undefined || powerCoreIds[idx] === null)
              ? 'None' 
              : `${capitalizeEachWord(powerCoreIds[idx])} (PCU ${getPowerCoreData(powerCoreIds[idx]).pcuProvided} | Size: ${getPowerCoreData(powerCoreIds[idx]).sizes.join(', ')})`
          } 
          name={idx} onChange={handlePowerCoreChange}
        >
          
          <option key='null'>None</option>
          {getPowerCoreIdList().map((core, idx) => 
            doesFrameSizeAllowCore(core, frameSize) &&
            <option key={'option'+idx}>
              {`${core} (PCU ${getPowerCoreData(core).pcuProvided} | Size: ${getPowerCoreData(core).sizes.join(', ')})`}
            </option>
          )}

        </select><br/>
        {/* TODO: */}
        Special Material: 
        <p></p>
      </div>
    })
  )
}

export default PowerCoreSelections;